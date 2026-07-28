# STERBAN0.github.io

Personal engineering portfolio, live at https://sterban0.github.io

Static site: vanilla HTML/CSS/JS, no build step, no runtime dependencies. `index.html` is the whole page.

`site-data.js` holds every project, skill, and mode description. It is the single source of truth: the page reads it in the browser, and `scripts/generate-resumes.js` reads the same file to build the PDFs in `resumes/`. Edit a project once, in `site-data.js`, and the site and every resume variant stay in agreement.

```
npm install          # pdfkit, for the resume generator only
node scripts/generate-resumes.js
```
