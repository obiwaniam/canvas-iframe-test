# Project Handoff

This repository contains two separate but related static web experiences used for Canvas iframe embedding and presentation/demo work.

## Live URLs

- Main repo page: `https://obiwaniam.github.io/canvas-iframe-test/`
- Maintenance demo: `https://obiwaniam.github.io/canvas-iframe-test/maintenance-demo/`
- GitHub repo: `https://github.com/obiwaniam/canvas-iframe-test`

## What Is In This Repo

- `index.html`
  - Original A&P study-break page.
  - Expanded into multiple game batches and alternate views.
  - Supports iframe embedding in Canvas.
- `maintenance-demo/index.html`
  - Self-contained "Home Maintenance Challenge" demo.
  - Uses a floorplan room selector and photo-style room inspections.
  - This is the file that has been actively refined most recently.
- `.github/workflows/deploy-pages.yml`
  - Publishes the repo to GitHub Pages whenever `main` is pushed.
- `README.md`
  - Basic publishing notes from the original repo setup.

## Current Maintenance Demo Behavior

The maintenance demo is a single-file HTML app. Nearly all future changes will happen in `maintenance-demo/index.html`.

### Main User Flow

1. User lands on a floorplan.
2. User clicks `Bathroom`, `Kitchen`, or `Laundry`.
3. A room photo opens.
4. User clicks visible maintenance issue hotspots.
5. A popup asks what action should be taken.
6. Wrong answers turn red and stay wrong.
7. Correct answers show:
   - success feedback
   - a `Responsibility` block
   - room progress updates
8. Finished rooms show a completion banner and a checkmark on the floorplan.

### Responsibility Categories In Use

- `Resident`
- `Property owner`
- `Joint`

Each issue object in `const rooms = { ... }` includes a `responsibility` field that is displayed after a correct answer.

## Important Implementation Details

### Floorplan Mapping

The floorplan room selection no longer uses plain CSS-positioned HTML buttons. It now uses an inline SVG overlay on top of the floorplan PNG.

Why this matters:

- It scales more reliably with the image.
- Hover zones are easier to align to the printed room labels.
- Future room-zone tuning should happen in the SVG `<rect>` coordinates near the floorplan markup, not by reintroducing container-based HTML overlays.

Look for:

- `floorplan-stage`
- `map-overlay`
- `map-room`
- `map-bathroom`
- `map-kitchen`
- `map-laundry`

### Room Issue Hotspots

Hotspots inside the room photos are driven by the `rooms` data object in `maintenance-demo/index.html`.

Each issue has values like:

- `left`
- `top`
- `cardLeft`
- `cardTop`
- `title`
- `question`
- `correct`
- `responsibility`
- `feedback`
- `choices`

If a room hotspot needs to move:

1. Find the issue in `const rooms`.
2. Adjust `left` and `top`.
3. If the popup opens in a bad place, adjust `cardLeft` and `cardTop`.
4. Push to `main`.
5. Wait for Pages to redeploy.

### Popup / Issue Card Behavior

The issue popup is the `.issue-card`.

Important current behavior:

- It has a `max-height` so long success content does not spill off-screen.
- It can scroll if needed.
- It repositions itself after feedback is added.
- On success it shows both explanation text and the `Responsibility` section.

Relevant functions:

- `placeIssueCard()`
- `refreshIssueCardPlacement()`
- `openIssue()`
- `chooseAnswer()`
- `renderResponsibility()`

### Progress and Completion

Current progress behavior:

- Top strip shows overall solved count.
- Header pill shows:
  - room progress when inside a room
  - overall solved count plus completed rooms on the floorplan
- Finished rooms get a banner and floorplan checkmark.

Relevant functions:

- `updateProgress()`
- `completedRoomCount()`
- `showRoomCompleteBanner()`
- `isRoomComplete()`

## Recently Requested Content/UX Decisions

These are intentional and should not be "cleaned up" unless the user asks:

- Use `resident or property owner` language instead of `renter or new homeowner`.
- Keep one silly answer in each issue choice list.
- Wrong answers should turn red without immediately revealing the right answer.
- The final correct answer in a room should still show a success result.
- The floorplan should show completion progress, not just room-local counts.
- The room-complete state should be obvious.

## Assets Used By The Maintenance Demo

Expected assets under `maintenance-demo/assets/`:

- `floorplan-reference.png`
- `bathroom-photo.png`
- `kitchen-photo.png`
- `laundry-photo.png`

If one of these is replaced, expect to retune hotspots because the coordinates are based on the current image composition.

## Main A&P Page Notes

The root `index.html` is separate from the maintenance demo.

It contains:

- A&P mini-games
- multiple game batches
- alternate view modes
- iframe-friendly hosting for Canvas

Known URL patterns already used in this project:

- `?student=Dayee&section=AP101`
- `?view=batch2`
- `?view=batch3`

If returning to the A&P/game work, start by reading the root `index.html`.

## Canvas Usage Notes

Most Canvas content in this project has been assembled manually as HTML blocks pasted into Canvas pages rather than stored as separate files in this repo.

That means:

- the hosted iframe pages live here
- the surrounding Canvas text often does not

If a future person needs to recreate the Canvas-side content, they may need the page HTML from Canvas itself in addition to this repo.

### Example Maintenance Demo Iframe

```html
<iframe
  src="https://obiwaniam.github.io/canvas-iframe-test/maintenance-demo/"
  width="100%"
  height="980"
  style="border:0; border-radius:12px;"
  loading="lazy"
  allowfullscreen>
</iframe>
```

### Example Expandable Canvas Block

```html
<details style="border: 1px solid #dfe6e9; border-radius: 12px; background: #f8fbff; overflow: hidden;">
  <summary style="cursor: pointer; list-style: none; padding: 16px 20px; font-size: 1.08em; font-weight: 700; color: #1f2937; background: #eef6ff;">
    Do an Inspection
  </summary>
  <div style="padding: 18px 20px 20px 20px;">
    <iframe
      style="width: 100%; height: 980px; border: none; border-radius: 12px; background: #ffffff;"
      src="https://obiwaniam.github.io/canvas-iframe-test/maintenance-demo/"
      loading="lazy"
      allowfullscreen="allowfullscreen">
    </iframe>
  </div>
</details>
```

## Publishing Workflow

Publishing is simple once Pages is already working:

1. Edit files locally.
2. Commit to `main`.
3. Push `main`.
4. GitHub Actions deploys Pages automatically.

Useful commands:

```powershell
git status --short --branch
git add -- "maintenance-demo/index.html"
@'
Commit message here.

'@ | git commit -F -
git push origin main
```

## Known GitHub Pages Caveat

Earlier in the project, GitHub Pages sometimes needed to be manually enabled in repo settings even though the workflow uses `actions/configure-pages@v5` with `enablement: true`.

If Pages stops updating:

1. Check the Actions tab.
2. Check repo `Settings -> Pages`.
3. Confirm the site is enabled for this repo.

## Fastest Way To Resume Work Later

If someone returns to this project later, read in this order:

1. `PROJECT_HANDOFF.md`
2. `maintenance-demo/index.html`
3. `index.html`
4. `README.md`

Then decide which branch of work they are touching:

- maintenance/floorplan demo
- A&P / quiz / game iframe page
- Canvas embed markup outside the repo

## Practical Editing Tips

- For room hotspot tuning, screenshots with marked target points are the fastest workflow.
- For floorplan room labels, edit the SVG overlay coordinates instead of the room issue coordinates.
- For popup placement issues, adjust `cardLeft`/`cardTop` and re-check the success state after feedback expands.
- After publishing, GitHub Pages may take a minute or two to update.
- If the browser looks stale, use a hard refresh.

## Last Known Good Direction

The repo is currently centered on a polished presentation/demo flow for home maintenance:

- floorplan selection
- room-photo inspections
- practical response choices
- silly distractor choices
- responsibility tagging
- clearer room and overall progress

That is the safest baseline to continue from.
