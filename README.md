<p align="center">
  <img src="assets/banner.jpeg" alt="KRATOS-BUG Banner" width="90%"/>
</p>

# ⚡ KRATOS-BUG ⚡

[![Stars](https://img.shields.io/github/stars/DEVCADIS/KRATOS-BUG?style=social)](https://github.com/DEVCADIS/KRATOS-BUG/stargazers)
[![Forks](https://img.shields.io/github/forks/DEVCADIS/KRATOS-BUG?style=social)](https://github.com/DEVCADIS/KRATOS-BUG/network)
[![License](https://img.shields.io/github/license/DEVCADIS/KRATOS-BUG)](#license)
[![Language](https://img.shields.io/github/languages/top/DEVCADIS/KRATOS-BUG)](#—technos)
[![Deploy on Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)

---

## 🔥 Présentation

**KRATOS-BUG** est un **bot WhatsApp de test et protection**, basé sur **Node.js** et **Baileys**.  
Il a été conçu pour **analyser les failles WhatsApp** liées aux bugs de messages, et permettre à la fois :  

- 💣 **Tester la stabilité** d’un compte ou d’un groupe WhatsApp (via l’envoi de bugs de test)  
- ⚡ **Simuler des attaques bug** afin de comprendre leurs effets (freeze, lag, crash temporaire)  
- 🛡️ **Activer un système anti-bug** pour bloquer et filtrer les attaques entrantes  
- 🔧 **Fournir un outil éducatif** aux développeurs souhaitant comprendre ce type de vulnérabilité  

👉 Objectif : **comprendre et contrer les attaques bug** tout en gardant un contrôle total de l’expérience.  

---

## 🖼️ Aperçu du menu
![Menu Preview](assets/menu.png)

---

## ⚙️ Configuration `.env`

Le bot se configure facilement via un fichier `.env` :  

```env
PREFIXE=.
SESSION=./session
NUMBER=237xxxx
USE_QR=false
LOG_LEVEL=info
RECONNECT_DELAY=5000
