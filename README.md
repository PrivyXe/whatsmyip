# 🌐 Free IP Lookup Tool & Ad-Free IP Checker

> **What is my IP address?** – Instant, privacy-first, ad-free public IP lookup with geolocation, network info, speed test, developer tools and embeddable widget.

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/PrivyXe/whatsmyip?style=social)](https://github.com/PrivyXe/whatsmyip)
[![Forks](https://img.shields.io/github/forks/PrivyXe/whatsmyip?style=social)](https://github.com/PrivyXe/whatsmyip)
[![Live Site](https://img.shields.io/badge/Live-myipaddress.app-blue)](https://myipaddress.app)

---

## Why This Project Exists

Most "what is my IP" websites are full of intrusive ads, pop-ups, trackers and slow loading times.  
This project started as a simple Cloudflare Workers script to fix exactly that — and evolved into a full-featured, **completely ad-free IP lookup tool** with developer-friendly extras.

**This repository** contains the **original lightweight single-file version** (great for learning, quick deploys or minimal setups).  
The **full modern version** is live and actively developed here:  
👉 **[https://myipaddress.app](https://myipaddress.app)**

---

## ✨ Features – Minimal Version (This Repo)

- Instant public **IP address** detection (IPv4 & IPv6 aware)
- Country flag + geolocation (city, region, timezone, ISP, ASN)
- Proxy/VPN detection hints
- Light/dark mode toggle
- One-click **copy to clipboard** with toast feedback
- Responsive, clean & educational design
- Zero tracking, zero logs, zero external API calls

---

## 🚀 Full Version Highlights (myipaddress.app)

- Built-in **internet speed test** (download, upload, ping, jitter)
- 30+ free developer tools:
  - Subnet calculator
  - JWT decoder
  - Regex tester
  - UUID generator
  - HTTP headers checker
  - Password & hash generator
  - Base64 / URL encoder-decoder
  - And more…
- **Customizable embeddable IP widget** – perfect for blogs, dashboards, status pages, privacy tools
- **Free public IP API** – no signup, no API key, 1000 requests/day per IP (JSON & plain text)
- Dark/light themes, mobile-friendly, super fast (Cloudflare edge optimized)

Live site: **[https://myipaddress.app](https://myipaddress.app)**

Customization options:
theme=light|dark
size=small|medium|large
style=minimal|full

Generate your perfect widget: Widget Builder

Sites already embedding the widget (add yours via PR or issue!):

(Coming soon – be the first!)
🔒 Strong Privacy Focus
No logs or analytics
No personal data collection
No third-party requests
All processing happens in real-time per request
📄 License
MIT License – free to use, modify, fork, embed and learn from.

How to Support This Project
⭐ Star this repo if you like the minimal version
🌐 Embed the widget on your blog/site/dashboard
🔗 Share the full tool: https://myipaddress.app
💬 Open an issue or PR if you have feedback, feature ideas or want your site listed as a user

Thank you for using and supporting ad-free, privacy-respecting tools! 🛡️

### Embed the Free IP Widget on Your Website (No Ads, No Tracking)

Just copy-paste one of these ready-to-use iframes:

```html
<!-- Dark theme, medium size, full details -->
<iframe 
  src="https://myipaddress.app/widget?theme=dark&size=medium&style=full" 
  width="280" 
  height="90" 
  frameborder="0" 
  loading="lazy" 
  title="My IP Address Widget">
</iframe>

<!-- Light theme, compact size -->
<iframe 
  src="https://myipaddress.app/widget?theme=light&size=small&style=minimal" 
  width="220" 
  height="60" 
  frameborder="0" 
  loading="lazy" 
  title="Simple IP Display">
</iframe>

<!-- Large version with more info -->
<iframe 
  src="https://myipaddress.app/widget?theme=dark&size=large&style=full" 
  width="350" 
  height="120" 
  frameborder="0" 
  loading="lazy" 
  title="Detailed IP Widget">
</iframe>

