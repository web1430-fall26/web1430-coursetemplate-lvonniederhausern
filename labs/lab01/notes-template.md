# Lab 01 – Inspection Notes

## Site 1: [https://www.weber.edu/]

### Elements found (5)

| Tag | Semantic? | Purpose |
|-----|-----------|---------|
| <html> | semantic | a top container that encloses all visible and invisible elements on a page |
| <head> | semantic | stores metadata on webpage that is not directly displayed to users |
| <meta> | semantic | to provide metadata on an HTML document |
| <script> | non-semantic | allows a developer to add executable Java script code |
| <link> | semantic | allows a developer to link a CS style sheet to improve the website display |

### Live text edit
[I changed welcome wildcats to What do you call a well-balanced horse? Stable.![screen shot of my live text edit](labs\lab01\screenshots\Screenshot 2026-09-01 203408.png)]

### Page structure
- `<main>` present? yes
- `<h1>` present? yes
- `<nav>` present? yes
- Images with `alt` attributes? yes 

### Console results

| Expression | Result | What it tells you |
|-----------|--------|------------------|
| `document.title` | 'Weber State University' | returns the text inside the webpage's <title> element |
| `document.querySelectorAll('a').length` | 175 | this website has 175 <a> elements on the webpage |
| `document.querySelectorAll('img[alt=""]').length` | 25 | the weber state website has 25 images with no alt text. this is a disability issue|

### Network: first request
- URL: https://www.weber.edu/
- HTTP method: GET
- Status code: 200 OK
- Content-Type: text/html; charset=utf-8
- Total page requests (approx): 110
- Total page weight: 71.3 kB transferred

---

## Site 2: [https://www.youtube.com/]

### Elements found (5)

| Tag | Semantic? | Purpose |
|-----|-----------|---------|
| <svg> | non-schematic | acts as a container that defines a new coordinate system and viewport for creating scalable vector graphics |
| <iron-iconset-svg> | non-schematic | defines a custom group of scalable vector graphic (SVG) icons for use with Polymer web components |
| <iframe> | non-schematic | embeds an external webpage, video, map, or interactive tool directly inside the current webpage |
| <ytd-app> | non-schematic | is a custom HTML element that wraps and represents the entire YouTube web application interface |
| <style> | schematic | holds CSS code to design and format the web page |

### Console results

| Expression | Result | What it tells you |
|-----------|--------|------------------|
| `document.title` | 'YouTube' | returns the text inside the webpage's <title> element |
| `document.querySelectorAll('a').length` | 122 | this website has 122 links on the webpage |
| `document.querySelectorAll('img[alt=""]').length` | 63 | Youtube has 63 images with no descriptions |

### Network: first request

- URL: https://www.youtube.com/
- HTTP method: GET
- Status code: 200 OK
- Content-Type: text/html; charset=utf-8



---

## My page (lab00/index.html)

- `document.querySelector('h1').textContent` returned: 'WEB 1430 – Lab 00'
- TypeError produced by: `document.querySelector('p').foo.bar` VM77:1 Uncaught TypeError: Cannot read properties of undefined (reading 'bar') at <anonymous>:1:33
- Error message text: Uncaught TypeError: Cannot read properties of undefined (reading 'bar') at <anonymous>:1:32
- What the error message tells you: That the page was looking for an object but the object type was wrong and the object itself was undefined.

![screenshot of the error in the Console ](labs\lab01\screenshots\Screenshot 2026-09-03 191921.png)

---

## Reflection

What surprised you? What does DevTools tell you that you couldn't learn by just looking at the page?

Using the Devtools was a lot more complex than i initally thought. It took me a second to recognize what i was looking for. But i was able to see a lot more of what actualy goes on behing the sceens. How a page is formated with tags that help organize the data in user friendly ways. Finding out that Youtube has ytd-app tag as a custom HTML element to show its page properly was intresting. i wasnt aware you could make custom tags for website design. 