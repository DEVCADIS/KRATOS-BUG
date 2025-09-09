<p align="center">
  <img src="https://files.catbox.moe/c11niu.jpeg" alt="KRATOS-BUG Banner" width="90%"/>
</p>
# ⚡ KRATOS-BUG ⚡

[![Stars](https://img.shields.io/github/stars/DEVCADIS/KRATOS-BUG?style=social)](https://github.com/DEVCADIS/KRATOS-BUG/stargazers)
[![Forks](https://img.shields.io/github/forks/DEVCADIS/KRATOS-BUG?style=social)](https://github.com/DEVCADIS/KRATOS-BUG/network)
[![License](https://img.shields.io/github/license/DEVCADIS/KRATOS-BUG)](#license)
[![Language](https://img.shields.io/github/languages/top/DEVCADIS/KRATOS-BUG)](#—technos)
[![Deploy on Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)

---

## 🔥 Présentation

**KRATOS-BUG** est un **bug bot WhatsApp developpé by RAIZEL**, basé sur **Node.js** et **Baileys**.  


## 📱 Installation sur Termux (Android)

Si tu veux utiliser KRATOS-BUG directement sur Android via Termux :
```bash
pkg update && pkg upgrade
pkg install git nodejs -y
git clone https://github.com/DEVCADIS/KRATOS-BUG.git
cd KRATOS-BUG
npm install
node index.js

Installation locale (PC)

git clone https://github.com/DEVCADIS/KRATOS-BUG.git
cd KRATOS-BUG
npm install
node index.js

## ☁️ Déploiement sur Render (Cloud gratuit)

Déploie ton bot directement sur Render :
⚙️ Paramètres Render :
	•	Build Command: npm install
	•	Start Command: node index.js
	•	Env Vars: copier les variables de ton .env

```.env
PREFIXE=.
SESSION=./session
NUMBER=237xxxx
USE_QR=false
LOG_LEVEL=info
RECONNECT_DELAY=5000

