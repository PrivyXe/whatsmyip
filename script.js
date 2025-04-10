export default {
  async fetch(request) {
    // 1. Basic Cloudflare Geolocation / Request Info
    const clientIP = request.headers.get("CF-Connecting-IP");
    const country = request.headers.get("CF-IPCountry") || "Unknown";
    const region = request.cf?.region || "Unknown";
    const city = request.cf?.city || "Unknown";
    const timezone = request.cf?.timezone || "Unknown";
    const isp = request.cf?.asOrganization || "Unknown";
    const latitude = request.cf?.latitude || 0;
    const longitude = request.cf?.longitude || 0;
    const userAgent = request.headers.get("User-Agent") || "Unknown";
    const isProxy = request.headers.has("CF-Connecting-IP") ? "No" : "Yes";

    // 2. Retrieve ASN from Cloudflare (if available)
    const asn = request.cf?.asn || "Unknown";

    // 4. Country Flag
    const flagURL = `https://flagcdn.com/w80/${country.toLowerCase()}.png`;

    // 5. Construct the HTML Page
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
      <html>
        <meta charset="UTF-8">
        <title>What Is My IP Address & Geolocation?</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="canonical" href="https://myipaddress.app/">
        <meta name="description" content="Find out your IP address, location, and more with our free IP lookup tool. Discover advanced IP scanning and tracking features.">
        <meta name="keywords" content="what is my ip, my ip, ip address, ip address lookup, ip tracker, ip address lookup, advanced ip scanner">
        <meta name="robots" content="index, follow">
        <meta property="og:title" content="Check Your IP Address & Geolocation">
        <meta property="og:description" content="Find out your IP address, location, and more with our free IP lookup tool.">
        <meta property="og:image" content="https://i.ibb.co/CsYzDjBF/im.png">
        <meta property="og:url" content="https://myipaddress.app/">
        <meta property="og:type" content="website">
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="Check Your IP Address & Geolocation">
        <meta name="twitter:description" content="Find out your IP address, location, and more with our free IP lookup tool.">
        <meta name="twitter:image" content="https://i.ibb.co/CsYzDjBF/im.png">
        <script type="application/ld+json">
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "IP Lookup Tool",
            "url": "https://myipaddress.app/",
            "description": "Find out your IP address, location, and more with our free IP lookup tool.",
            "publisher": {
              "@type": "Organization",
              "name": "What Is My IP",
              "logo": {
                "@type": "ImageObject",
                "url": "https://i.ibb.co/CsYzDjBF/im.png"
              }
            }
          }
        </script>
        <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" crossorigin="anonymous">
        <style>
          :root {
            --bg-light: #f4f4f4;
            --bg-dark: #121212;
            --card-light: rgba(255, 255, 255, 0.8);
            --card-dark: rgba(30, 30, 30, 0.8);
            --accent-color: #ff6600;
            --text-light: #333;
            --text-dark: #eee;
            --transition-speed: 0.3s;
          }
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: 'Roboto', sans-serif;
            background: linear-gradient(135deg, #f4f4f4, #e0e0e0);
            color: var(--text-light);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            transition: background var(--transition-speed), color var(--transition-speed);
          }
          body.dark {
            background: linear-gradient(135deg, #181818, #121212);
            color: var(--text-dark);
          }
          .container {
            background: var(--card-light);
            backdrop-filter: blur(10px);
            padding: 2rem;
            border-radius: 15px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.1);
            max-width: 650px;
            width: 90%;
            text-align: center;
            opacity: 0;
            animation: fadeIn 1s forwards;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          body.dark .container {
            background: var(--card-dark);
          }
          h1 {
            text-align: center;
            margin-bottom: 1rem;
            font-size: 2rem;
          }
          p {
            margin: 0.5rem 0;
            font-size: 1.1rem;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          p i { margin-right: 0.5rem; color: var(--accent-color); }
          .highlight { font-weight: 700; color: var(--accent-color); margin-left: 5px; }
          img.flag {
            width: 26px;
            height: auto;
            vertical-align: middle;
            margin-left: 8px;
          }
          button {
            padding: 0.75rem 1.2rem;
            margin: 0.5rem;
            border: none;
            background: var(--accent-color);
            color: #fff;
            font-size: 1rem;
            border-radius: 8px;
            cursor: pointer;
            transition: background var(--transition-speed);
          }
          button:hover { background: #cc5200; }
          #map {
            width: 100%;
            height: 300px;
            margin-top: 1rem;
            border-radius: 10px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          }
          .toast {
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--accent-color);
            color: #fff;
            padding: 0.75rem 1.5rem;
            border-radius: 8px;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.5s;
          }
          section {
            max-width: 800px;
            margin: 2rem auto;
            padding: 1rem 1.5rem;
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          }
          section h2, section h3 {
            margin-bottom: 1rem;
            font-family: 'Roboto', sans-serif;
            color: #333;
          }
          section p {
            line-height: 1.6;
            margin-bottom: 1rem;
            font-size: 1.1rem;
            color: #444;
          }
          section ul {
            margin-left: 1.5rem;
            margin-bottom: 1rem;
            font-size: 1.1rem;
            color: #444;
          }
          @media (max-width: 480px) {
            section {
              padding: 0.8rem 1rem;
            }
            section p, section ul {
              font-size: 0.95rem;
            }
          }
          body.dark section {
            background-color: #222;
            color: #ddd;
            box-shadow: 0 4px 12px rgba(0,0,0,0.5);
          }
          body.dark section h2,
          body.dark section h3 {
            color: #fff;
          }
          body.dark section p,
          body.dark section ul {
            color: #ccc;
          }
          .icon-button {
            background: none;
            border: none;
            cursor: pointer;
            font-size: 1.5rem;
            color: var(--accent-color);
            margin: 0.5rem;
            transition: color var(--transition-speed);
          }
          .dark-mode-toggle {
            position: fixed;
            top: 1rem;
            right: 1rem;
            z-index: 1000;
          }
          .asn-link {
            color: var(--accent-color);
            text-decoration: none;
            transition: color var(--transition-speed);
          }
          .asn-link:hover {
            color: #cc5200;
          }
          .icon-button:hover {
            color: #cc5200;
          }
          .toast.show {
            opacity: 1;
            pointer-events: auto;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          table {
            width: 100%;
            margin-top: 1rem;
            border-collapse: collapse;
            font-size: 0.95rem;
          }
          td, th {
            padding: 8px;
            border-bottom: 1px solid #ccc;
            text-align: left;
          }
          body.dark td, body.dark th {
            border-color: #444;
          }
          @media (max-width: 480px) {
            .container {
              padding: 1rem;
              width: 95%;
            }
            h1 {
              font-size: 1.5rem;
              margin-bottom: 0.8rem;
            }
            p {
              font-size: 0.9rem;
            }
            button {
              font-size: 0.9rem;
              padding: 0.6rem 1rem;
            }
          }
          @media (min-width: 769px) and (max-width: 1024px) {
            .container {
              padding: 2rem;
              max-width: 800px;
            }
            h1 {
              font-size: 2.2rem;
            }
            p {
              font-size: 1.2rem;
            }
          }
          @media (max-width: 768px) {
            .container {
              padding: 1.5rem;
            }
            h1 {
              font-size: 1.7rem;
            }
            p {
              font-size: 1rem;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Your IP Details</h1>
          <p><i class="fa-solid fa-network-wired"></i><strong>IP Address:</strong> <span class="highlight">${clientIP}</span></p>
          <p><i class="fa-solid fa-flag"></i><strong>Country:</strong> <span class="highlight">${country}</span> <img class="flag" src="${flagURL}" alt="${country} Flag"></p>
          <p><i class="fa-solid fa-map-location-dot"></i><strong>Region:</strong><span class="highlight">${region}</span></p>
          <p><i class="fa-solid fa-city"></i><strong>City:</strong><span class="highlight">${city}</span></p>
          <p><i class="fa-solid fa-clock"></i><strong>Time Zone:</strong><span class="highlight">${timezone}</span></p>
          <p><i class="fa-solid fa-signal"></i><strong>ISP:</strong><span class="highlight">${isp}</span></p>
          <p><i class="fa-solid fa-server"></i><strong>ASN:</strong> <a href="https://bgp.he.net/AS${asn}" target="_blank" class="asn-link"><span class="highlight">${asn}</span></a></p>
          <p><i class="fa-solid fa-user-secret"></i><strong>Proxy Usage (CF header check):</strong><span class="highlight">${isProxy}</span></p>
          <div style="text-align: center;">
            <button onclick="copyIP()">Copy IP Address</button>
          </div>
          <div class="toast" id="toast">IP Address Copied!</div>
          <div class="dark-mode-toggle">
            <button class="icon-button" onclick="toggleDarkMode()">
              <i class="fa-solid fa-moon"></i>
            </button>
          </div>
        </div>
        <section>
        <h2><strong>What Is an IP Address?</strong></h2>
        <ul>
          <li>An <strong>IP address (Internet Protocol address)</strong> is a unique identifier assigned to devices connected to a network, facilitating their communication.</li>
          <li>Think of it as your device's digital address, crucial for navigating the internet.</li>
          <li>Without it, data transmission would be impossible.</li>
          <li>Every device, from smartphones and laptops to smart appliances and gaming consoles, possesses an <em>IP address</em> when connected online.</li>
          <li>This address ensures that requested information, such as loading a webpage or receiving an email, reaches your device accurately and efficiently.</li>
          <li>In essence, it's the <em>digital identity of internet-connected devices</em>.</li>
        </ul>
     </section>
  <section>
        <h3><strong>How Does an IP Address Work?</strong></h3>
        <ul>
          <li><strong>IP addresses</strong> enable devices to communicate over the internet through a standardized protocol.</li>
          <li>When you initiate an online action, like visiting a website, your device sends a request.</li>
          <li>This request is packaged with your <em>IP address</em>, serving as a return address.</li>
          <li>Routers and servers across the internet utilize this <strong>IP address</strong> to direct data packets to the correct destination and send the requested information back to you.</li>
          <li>This process mirrors how postal services use addresses for mail delivery, ensuring seamless and accurate data transfer.</li>
          <li>Essentially, the <em>working principle of IP addresses</em> forms the foundation of internet communication, allowing devices to locate and interact with each other.</li>
        </ul>
     </section>
  <section>
        <h3><strong>Types of IP Addresses</strong></h3>
        <ul>
          <li><strong>IPv4</strong>: The most commonly used <strong>IP format</strong>, consisting of four sets of numbers (0-255) separated by periods. While widely adopted, it's nearing exhaustion due to the exponential growth of internet-connected devices. This limitation is a primary driver for the adoption of <strong>IPv6</strong>. <em>Why is IPv4 becoming insufficient?</em> The answer lies here.</li>
          <li><strong>IPv6</strong>: The latest version, featuring a significantly larger address space using alphanumeric characters and colons. It was developed to address the limitations of <strong>IPv4</strong>, providing an almost inexhaustible number of unique addresses. <strong>IPv6</strong> not only offers more addresses but also enhances network efficiency and security. <em>What are the advantages of IPv6?</em> The answers are detailed here.</li>
        </ul>
      </section>
        <section>
        <h2><strong>My ip address</strong></h2>
        <ul>
          <li><strong>My IP Address</strong> reveals your device’s unique digital identifier essential for network connectivity.</li>
          <li>It assists in troubleshooting issues and monitoring online activity efficiently.</li>
          <li>This tool enables users to verify their connection and enhance privacy settings.</li>
          <li>Understanding your IP aids in content localization and targeted digital marketing strategies.</li>
          <li>Reliable online services deliver accurate IP details, ensuring secure and optimized internet performance.</li>
        </ul>
      </section>
      
      <section>
        <h2><strong>Ip address lookup</strong></h2>
        <ul>
          <li><strong>IP Address Lookup</strong> allows users to determine the origin and details of any IP address.</li>
          <li>This service provides geographic location, ISP data, and network information.</li>
          <li>It is valuable for cybersecurity, website optimization, and regional content targeting.</li>
          <li>Businesses and individuals utilize lookup tools to enhance digital security and analytics.</li>
          <li>Accurate IP address lookup improves trust and boosts effective online strategies.</li>
        </ul>
      </section>
      
      <section>
        <h2><strong>Whois ip</strong></h2>
        <ul>
          <li><strong>Whois IP</strong> tools deliver detailed information about domain registration and ownership.</li>
          <li>They reveal registrar data, creation dates, and contact information effectively.</li>
          <li>This service is crucial for verifying domain authenticity and enhancing cybersecurity.</li>
          <li>It supports brand protection and builds online credibility for businesses.</li>
          <li>Using Whois IP data, users can monitor competitors and optimize digital marketing efforts.</li>
        </ul>
      </section>
      
      <section>
        <h2><strong>Ip address location</strong></h2>
        <ul>
          <li><strong>IP Address Location</strong> services pinpoint the geographic area of a given IP address.</li>
          <li>This tool is essential for delivering localized content and personalized experiences.</li>
          <li>It aids in monitoring online fraud and enhancing network security.</li>
          <li>Marketers use location data for targeted advertising and regional audience analysis.</li>
          <li>Accurate IP address location improves website performance and user engagement.</li>
        </ul>
      </section>
      
      <section>
        <h2><strong>Check ip</strong></h2>
        <ul>
          <li><strong>Check IP</strong> tools verify your current network identifier and connection status.</li>
          <li>This service quickly identifies your device’s IP address for troubleshooting purposes.</li>
          <li>It enhances online security by alerting users to potential connectivity issues.</li>
          <li>Administrators rely on check IP functions to monitor network health effectively.</li>
          <li>Regular use of this tool ensures optimal performance and improved digital privacy.</li>
        </ul>
      </section>
      
      <section>
        <h2><strong>Whatsmyip</strong></h2>
        <ul>
          <li><strong>WhatsMyIP</strong> is a straightforward online tool that instantly displays your IP address.</li>
          <li>It helps users confirm their connection status and diagnose network issues.</li>
          <li>This tool is favored for its simplicity and fast, accurate results.</li>
          <li>Enhancing online security and privacy is effortless with WhatsMyIP.</li>
          <li>Utilize this service for quick access to your IP information and better network management.</li>
        </ul>
      </section>
      
      <section>
        <h2><strong>Whoismyip</strong></h2>
        <ul>
          <li><strong>WhoIsMyIP</strong> offers a reliable way to display your device’s current IP address.</li>
          <li>This service ensures users can easily verify their network identity and security.</li>
          <li>It plays a vital role in troubleshooting connectivity issues and privacy management.</li>
          <li>Website administrators and IT experts depend on accurate IP verification.</li>
          <li>WhoIsMyIP supports effective online management and bolsters digital safety measures.</li>
        </ul>
      </section>
      
      <section>
        <h2><strong>Ip 2 location</strong></h2>
        <ul>
          <li><strong>IP 2 Location</strong> accurately maps an IP address to its real-world geographic origin.</li>
          <li>This service provides detailed location data including city, region, and country.</li>
          <li>It is essential for businesses targeting localized audiences and improving analytics.</li>
          <li>Cybersecurity professionals use this tool to detect and prevent fraudulent activities.</li>
          <li>Accurate location data enhances content personalization and targeted online advertising.</li>
        </ul>
      </section>
      
      <section>
        <h2><strong>Whoerip</strong></h2>
        <ul>
          <li><strong>WhoerIP</strong> is a powerful tool for obtaining in-depth details about your IP address.</li>
          <li>It offers insights into network configuration and digital footprints.</li>
          <li>This service aids in identifying potential vulnerabilities and ensuring secure connections.</li>
          <li>Users benefit from detailed tracking and diagnostic features for online security.</li>
          <li>WhoerIP is an essential resource for maintaining robust network performance.</li>
        </ul>
      </section>
      
      <section>
        <h2><strong>Ip search</strong></h2>
        <ul>
          <li><strong>IP Search</strong> tools enable detailed exploration of network addresses and their origins.</li>
          <li>They provide essential information on geographic location and service providers.</li>
          <li>This service is invaluable for cybersecurity, troubleshooting, and marketing analytics.</li>
          <li>Businesses and IT professionals use IP search for enhanced data insights.</li>
          <li>Reliable IP search optimizes online strategies and improves digital network management.</li>
        </ul>
      </section>
      
      <section>
        <h2><strong>Ipv4 address</strong></h2>
        <ul>
          <li><strong>IPv4 Address</strong> is the foundational numbering system used for internet devices.</li>
          <li>This 32-bit address format assigns unique identifiers to every connected device.</li>
          <li>It plays a crucial role in data routing and network communication.</li>
          <li>Understanding IPv4 is essential for troubleshooting and managing connectivity.</li>
          <li>Despite its limitations, IPv4 remains central to global digital communication.</li>
        </ul>
      </section>
      
      <section>
        <h2><strong>Find my ip</strong></h2>
        <ul>
          <li><strong>Find My IP</strong> is a user-friendly service that quickly identifies your current IP address.</li>
          <li>It simplifies network troubleshooting and verifies connection integrity.</li>
          <li>This tool is widely used by both casual users and IT professionals.</li>
          <li>Accurate IP identification enhances online security and privacy management.</li>
          <li>Utilize Find My IP for efficient network monitoring and improved digital performance.</li>
        </ul>
      </section>
      
      <section>
        <h2><strong>Ipinfo</strong></h2>
        <ul>
          <li><strong>IPinfo</strong> provides comprehensive details about any given IP address.</li>
          <li>This service delivers geographic, ISP, and network information reliably.</li>
          <li>It supports businesses in enhancing digital marketing and cybersecurity efforts.</li>
          <li>Accurate IPinfo data boosts website performance and content localization strategies.</li>
          <li>Trust this tool for fast, precise, and actionable IP analytics.</li>
        </ul>
      </section>
      
      <section>
        <h2><strong>Show my ip</strong></h2>
        <ul>
          <li><strong>Show My IP</strong> is an intuitive tool that instantly displays your device’s IP address.</li>
          <li>It assists users in verifying network connections and managing online security.</li>
          <li>This service is vital for troubleshooting and monitoring connectivity.</li>
          <li>Website administrators rely on accurate IP data for effective network management.</li>
          <li>Show My IP ensures quick access to essential connection details for better performance.</li>
        </ul>
      </section>
      
      <section>
        <h2><strong>Public ip address</strong></h2>
        <ul>
          <li><strong>Public IP Address</strong> is the globally unique identifier assigned by your ISP.</li>
          <li>It facilitates internet communication and data routing between networks.</li>
          <li>This address is crucial for website hosting, online transactions, and connectivity.</li>
          <li>Understanding your public IP enhances troubleshooting and cybersecurity measures.</li>
          <li>Monitor and manage your public IP for optimized performance and reliable access.</li>
        </ul>
      </section>
      
      <section>
        <h2><strong>Google ip</strong></h2>
        <ul>
          <li><strong>Google IP</strong> refers to the specific addresses used by Google’s servers and data centers.</li>
          <li>These IP addresses ensure fast, reliable access to Google’s services and applications.</li>
          <li>Understanding Google IP configurations aids in troubleshooting and network optimization.</li>
          <li>IT professionals use these details to manage web traffic and enhance online security.</li>
          <li>Google IP insights support superior performance and efficient digital communication.</li>
        </ul>
      </section>
      
        <script>
          // Copy IP Address to Clipboard
          function copyIP() {
            navigator.clipboard.writeText("${clientIP}")
              .then(() => showToast("IP Address Copied!"))
              .catch(() => showToast("Failed to Copy IP Address"));
          }
          // Show Toast Notification
          function showToast(message) {
            const toast = document.getElementById("toast");
            toast.textContent = message;
            toast.classList.add("show");
            setTimeout(() => toast.classList.remove("show"), 2000);
          }
          // Toggle Dark Mode
          function toggleDarkMode() {
            document.body.classList.toggle("dark");
          }
        </script>
      </body>
      </html>
    `;

    // Return the constructed HTML
    return new Response(htmlContent, {
      headers: { "Content-Type": "text/html" }
    });
  }
};
