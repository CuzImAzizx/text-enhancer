# Text Enhancer 💎✨

A tool that uses Ollama's LLMs to enhance your text. _And generate emails too, I guess_

## 📖 About

This project is an experement I built to enhance and correct my writing locally using Ollama's models.

I usually rely on [Quillbot](https://quillbot.com/grammar-check) or [Grammarly](https://www.grammarly.com/grammar-check) to check my writing. However, I needed a way to check my writing **quickly and locally**. So I built this tool; It's a simple **Express.js** application that makes **API requests** to **Ollama**. I can manage whether I want to just **correct grammar** or **enhance phrasing**. 

- **🏠 Everything is Local**: No internet connection required, and your text never leaves you machine _(privacy go brrr)_.

- **🌱 Lightweight & eco-friendlier**: No need to run ~500B cloud models for simple grammar correction.

- **✍️ Functional and fun**: started as a **text enhancer**, but I also added an **email writer** page for testing… and it actually works!


## ✨ Features 

### 1. Text Enhancement

Enhance your text by **correcting the grammar** and **enhance its phrasing**.

It has:
- Grammar correction
- Phrasing improvements
- Academic/formal tone rewrite
- Pirate mode 🏴‍☠️ (because… why not?)

### 2. Email Writer

Write professional **context-aware** emails using **natural input**. Set custom tone, urgency, and length.

## 🛠️ Tech Stack

> *"An idiot admires complexity; a genius admires simplicity."* - Terry A. Davis

- **Frontend**: HTML, CSS, JS, and [Bootstrap](https://getbootstrap.com/).

- **Backend**: [Express.js](https://expressjs.com/), [EJS](https://ejs.co/), and [Ollama](https://ollama.com/).

This stack is enough for my use case. It's dynamic, fast, and gets the job done in a secure and efficient manner.

## ⚠️ Disclaimer

**It's NOT meant for production**, because  there's no input validation on the API, no strict security, just experiments, exploration, and learning.

So please, don’t expose it publicly.

- [ ] *TODO: Secure the app (Authentication, Validation, Rate limiting, etc.)*


