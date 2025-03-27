# whatsmyip
This script is an IP lookup tool that runs on Cloudflare Workers. It dynamically creates an HTML page by extracting the user's IP address and geolocation information from the incoming HTTP request. The main functionalities and structure of the script are explained in detail below:

1. Extracting Information from the Request
Cloudflare Header Data:
The script retrieves Cloudflare-specific headers from the incoming HTTP request to obtain various details:

IP Address: Obtained using the CF-Connecting-IP header.

Country: Determined using the CF-IPCountry header. If the header is missing, it defaults to "Unknown".

Region, City, Timezone, ISP: These values are extracted from the request.cf object. If any of these properties are unavailable, default values ("Unknown" or 0) are used.

Autonomous System Number (ASN): The ASN is retrieved from Cloudflare’s asn property.

User Agent: The script uses the User-Agent header to capture the browser or device information.

Proxy Check: By checking the existence of the CF-Connecting-IP header, the script determines whether a proxy is being used.

2. Creating Visual Content
Country Flag:
Using the retrieved country code (converted to lowercase), the script constructs a URL to display the corresponding country flag. This visual element serves to enhance the user's understanding of their geolocation.

3. HTML Page Structure and Content
HTML Template:
The script dynamically generates an HTML page that presents the user’s details such as IP address, country, region, city, timezone, ISP, and ASN. It uses template literals to insert the dynamic data into the HTML content.

Meta Tags and SEO:
The page includes important meta tags for SEO:

Title, description, and keywords.

Open Graph and Twitter meta tags for social media sharing.

Google Analytics and Yandex verification scripts are embedded for tracking and verification purposes.

CSS Styling:
Built-in CSS defines the visual appearance of the page:

It supports both light and dark themes.

The design is responsive, ensuring optimal display on various devices.

Additional sections provide detailed information about IP addresses, including definitions, how they work, IPv4 vs. IPv6, and related lookup services.

Additional Informational Sections:
The HTML contains several sections that explain:

What an IP address is and how it functions.

Differences between IPv4 and IPv6.

Various aspects of IP lookup, whois, IP search, and similar concepts.

These sections enhance both the technical and educational value of the page.

4. User Interactions and JavaScript Functions
IP Copying Feature:
A “Copy IP Address” button allows users to copy their IP address to the clipboard. Upon clicking, a JavaScript function writes the IP address to the clipboard and displays a toast notification indicating success or failure.

Dark Mode Toggle:
A dark mode button enables users to switch between light and dark themes. This toggle is implemented via a JavaScript function that adds or removes a CSS class from the body element.

5. Final Response
At the end of the script, the dynamically generated HTML content is returned as an HTTP response with the header Content-Type: text/html. This ensures that when the Cloudflare Worker executes the script, the user receives an interactive, informative webpage displaying their IP and geolocation details.
