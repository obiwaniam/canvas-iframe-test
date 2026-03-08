# Canvas Iframe Test Page

This folder contains a single self-contained page:

- `index.html` - A&P study break sampler with 3 mini-games.

## Publish on GitHub Pages (quickest path)

1. Create a new public GitHub repository (example: `canvas-iframe-test`).
2. Upload the contents of this folder (`index.html` and this `README.md`).
3. In the repo, go to **Settings -> Pages**.
4. Under **Build and deployment**, set:
   - **Source**: `Deploy from a branch`
   - **Branch**: `main` (or `master`) and `/ (root)`
5. Save and wait about 1-2 minutes.

Your page URL will be:

`https://<your-github-username>.github.io/<repo-name>/`

## Canvas iframe embed example

```html
<iframe
  src="https://<your-github-username>.github.io/<repo-name>/?student=Dayee&section=AP101"
  width="100%"
  height="900"
  style="border:0;"
  allowfullscreen
  loading="lazy">
</iframe>
```

## Optional URL params supported by this sample

- `student` - shown in the greeting bar
- `section` - used in the completion code format
