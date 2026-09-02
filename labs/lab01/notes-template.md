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
[I changed welcome wildcats to What do you call a well-balanced horse? Stable.![screen shot of my live text edit](<Screenshot 2026-09-01 203408.png>)]

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

- URL:
- HTTP method:
- Status code:
- Content-Type:
- Total page requests (approx):
- Total page weight:

---

## Site 2: [https://www.youtube.com/]

### Elements found (5)

| Tag | Semantic? | Purpose |
|-----|-----------|---------|
| <svg> | non-schematic | acts as a container that defines a new coordinate system and viewport for creating scalable vector graphics |
| <iron-iconset-svg> | non-schematic | defines a custom group of scalable vector graphic (SVG) icons for use with Polymer web components |
| <iframe> | non-schematic | embeds an external webpage, video, map, or interactive tool directly inside the current webpage |
| '<ytd-app>' | non-schematic | s a custom HTML custom element that wraps and represents the entire YouTube web application interface |
| <style> | schematic | holds CSS code to design and format the web page |

### Console results

| Expression | Result | What it tells you |
|-----------|--------|------------------|
| `document.title` | 'YouTube' | returns the text inside the webpage's <title> element |
| `document.querySelectorAll('a').length` | 122 | this website has 122 links on the webpage |
| `document.querySelectorAll('img[alt=""]').length` | 63 | Youtube has 63 images with no descriptions |

### Network: first request

- URL:
- HTTP method:
- Status code:
- Content-Type:

---

## My page (lab00/index.html)

- `document.querySelector('h1').textContent` returned:
- TypeError produced by: `document.querySelector('p').foo.bar`
- Error message text:
- What the error message tells you:

---

## Reflection

What surprised you? What does DevTools tell you that you couldn't learn by just looking at the page?

[Your answer here — 3–5 sentences]
