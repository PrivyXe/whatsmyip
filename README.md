# 🌐 What is my IP Address — Cloudflare Workers Script

> **Cloudflare Workers IP Lookup**: A lightweight script that displays the user's IP address and geolocation information without using any external API.

[![Cloudflare](https://img.shields.io/badge/Platform-Cloudflare-orange)](https://workers.cloudflare.com/)  [![License](https://img.shields.io/badge/License-MIT-green)](./LICENSE)

---

## 📌 Project Overview

This script runs on Cloudflare Workers, dynamically generating an HTML page to display the user's IP address, geolocation details, and network information. The tool extracts data directly from the incoming HTTP request, making it fast, reliable, and API-free.

---

## ✨ Key Features

### 1️⃣ Information Extraction

* **IP Address** — Retrieved via `CF-Connecting-IP` header.
* **Country** — Determined via `CF-IPCountry` header; defaults to `Unknown` if missing.
* **Region, City, Timezone, ISP** — Extracted from `request.cf` object; defaults applied if unavailable.
* **ASN** — Retrieved from Cloudflare's `asn` property.
* **User Agent** — Captured from the `User-Agent` header.
* **Proxy Detection** — Identifies proxy usage by checking `CF-Connecting-IP`.

### 2️⃣ Visual Content

* **Country Flag** — Displays the user’s country flag using the retrieved country code.

### 3️⃣ HTML Page Structure

* **Dynamic HTML** — Populates IP and geolocation data using template literals.
* **Meta Tags & SEO** — Includes title, description, keywords, Open Graph, and Twitter meta tags.
* **Analytics** — Google Analytics and Yandex verification scripts included.
* **CSS Styling** — Supports responsive design, light/dark themes, and modern layout.
* **Educational Sections** — Explains IP addresses, IPv4 vs IPv6, and related lookup concepts.

### 4️⃣ User Interactions

* **Copy IP Address** — Button copies the user’s IP to clipboard with toast notification feedback.
* **Dark Mode Toggle** — Switch between light and dark themes via a JavaScript toggle.

### 5️⃣ Final Response

* Returns dynamic HTML as HTTP response with `Content-Type: text/html`.
* Users see an interactive, informative webpage displaying IP and geolocation information.

---

## 🛠️ Usage

* Deploy the script to Cloudflare Workers.
* Access the worker URL in any browser.
* View dynamic IP and geolocation details.

---

## 🔒 Privacy

* No personal data is collected or transmitted.
* All data is retrieved from request headers.
* IP and geolocation info displayed only to the user.

---

## 📄 License

MIT License — Open source and free for educational use.

---

**⚠️ Disclaimer:** For educational and informational purposes only. Users are responsible for complying with applicable laws.
