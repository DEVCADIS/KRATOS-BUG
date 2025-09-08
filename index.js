// ===================== KRATOS BOT =====================
import {
  makeWASocket,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  makeCacheableSignalKeyStore,
  DisconnectReason,
} from "@whiskeysockets/baileys";

import fs from "fs";
import path from "path";
import pino from "pino";
import qrcode from "qrcode-terminal";
import chalk from "chalk";
import dotenv from "dotenv";

import bugCommands from "./bug.js";   // ✅ Import direct des bugs fusionnés

dotenv.config();

// === Configuration depuis .env ===
const config = {
  PREFIXE: process.env.PREFIXE || "!",
  SESSION: process.env.SESSION || "./session",
  NUMBER: process.env.NUMBER,
  USE_QR: process.env.USE_QR === "true",
  LOG_LEVEL: process.env.LOG_LEVEL || "silent",
  RECONNECT_DELAY: parseInt(process.env.RECONNECT_DELAY) || 5000,
};

// === Logger ===
const logger = pino({
  level: config.LOG_LEVEL,
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      ignore: "pid,hostname",
      translateTime: "HH:MM:ss",
    },
  },
  base: null,
});

// === Helpers ===
function getBareNumber(jid) {
  if (!jid) return "";
  return jid.split("@")[0].replace(/[^0-9]/g, "");
}

// === Pairing code ===
async function requestPairingCode(sock) {
  try {
    logger.info("🔑 Demande de pairing code pour " + config.NUMBER);
    const code = await sock.requestPairingCode(config.NUMBER);

    logger.info("✅ Votre code de connexion est : " + code);
    logger.info("⚠️ Il expire dans 1 minute, utilisez-le vite !");
  } catch (err) {
    logger.error("❌ Erreur génération pairing code :", err);
  }
}

// === Fonction principale ===
async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState(config.SESSION);
  const { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    version,
    logger: pino({ level: "silent" }),
    printQRInTerminal: config.USE_QR,
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(state.keys, logger),
    },
  });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("connection.update", async ({ connection, lastDisconnect, qr }) => {
    if (qr && config.USE_QR) {
      qrcode.generate(qr, { small: true });
    }

    if (connection === "open") {
      console.log(chalk.green("✅ KRATOS BOT connecté avec succès !"));
      console.log(chalk.yellow("🤖 Utilisez votre préfixe : " + config.PREFIXE));
    }

    if (connection === "close") {
      const reason =
        lastDisconnect?.error?.output?.statusCode ||
        lastDisconnect?.error?.message;
      console.log(chalk.red("❌ Déconnecté :", reason));

      if (reason === DisconnectReason.loggedOut) {
        console.log(
          chalk.red(
            "⚠️ Session expirée. Supprimez le dossier " +
              config.SESSION +
              " et refaites le pairing code."
          )
        );
      } else {
        console.log(chalk.yellow("🔄 Tentative de reconnexion..."));
        setTimeout(startBot, config.RECONNECT_DELAY);
      }
    }
  });

  // === Charger uniquement les bugCommands ===
  const commands = {};
  for (const cmd of bugCommands) {
    commands[cmd.name] = cmd;
  }

  // === Gestion des messages ===
  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message) return;

    const from = msg.key.remoteJid;
    const text =
      msg.message?.conversation ||
      msg.message?.extendedTextMessage?.text ||
      "";

    if (!text.startsWith(config.PREFIXE)) return;

    const args = text.slice(config.PREFIXE.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (commands[command]) {
      try {
        await commands[command].execute(sock, msg, args, from);
      } catch (err) {
        console.error(chalk.red("Erreur commande :"), err);
      }
    }
  });

  // === Pairing si non enregistré ===
  setTimeout(async () => {
    if (!state.creds.registered && !config.USE_QR) {
      await requestPairingCode(sock);
    }
  }, 2000);
}

// === Démarrage ===
startBot();