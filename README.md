# AR QR Model Viewer (GitHub Pages ready)

Turn any hosted GLB/GLTF (and optional USDZ) into an AR experience with a QR code. This repo is a static page that you can deploy to GitHub Pages; scan the QR to open the model with WebXR, Android Scene Viewer, or iOS Quick Look.

## Quick start
1. Convert your 3D file to `glb`/`gltf`. For STEP/IGES/STL, export to glTF with FreeCAD → Blender → glTF exporter. For iOS, convert the glTF to USDZ using Apple's free Reality Converter.
2. Drop the files into this repo, e.g. `assets/model.glb` and `assets/model.usdz`.
3. Open `main.js` and update `DEFAULT_MODEL` and `DEFAULT_USDZ` to the paths you just added. Alternatively, keep the defaults and pass query params at runtime: `?model=https://.../your.glb&usdz=https://.../your.usdz`.
4. Push to GitHub and enable GitHub Pages (Settings → Pages → Branch: `main` → folder: `/`).
5. Use the live URL GitHub provides; the page shows a QR image you can print or share.

## Usage
- The QR in the page always reflects the current URL, including `model`/`usdz` parameters. Generate different QR codes by changing those params.
- The viewer uses [`<model-viewer>`](https://modelviewer.dev/) with `ar` enabled. AR button appears automatically when the platform supports it.
- If you only have a GLB, iOS will still show the 3D viewer but not Quick Look; supply USDZ for true AR on iOS.

## Local testing
Open `index.html` in a browser or serve the folder: `npx serve .` then visit `http://localhost:3000`. Add `?model=<url>&usdz=<url>` to test remote files without editing.

## Assets you might add
- `assets/model.glb` and `assets/model.usdz` (or any path you prefer).
- A poster thumbnail for faster loading: set `poster="path/to/poster.webp"` on the `<model-viewer>` tag.
