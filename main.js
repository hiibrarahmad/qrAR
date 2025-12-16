// Quick configuration: replace these URLs with your hosted files (glb/gltf and optional usdz for iOS).
const DEFAULT_MODEL = 'https://modelviewer.dev/shared-assets/models/Astronaut.glb';
const DEFAULT_USDZ = 'https://modelviewer.dev/shared-assets/models/Astronaut.usdz';

const params = new URLSearchParams(window.location.search);
const modelInput = document.getElementById('glbInput');
const usdzInput = document.getElementById('usdzInput');
const viewer = document.getElementById('viewer');
const qrImage = document.getElementById('qrImage');
const pageUrlLabel = document.getElementById('pageUrl');
const launchBtn = document.getElementById('launchAR');

const currentModel = params.get('model') || DEFAULT_MODEL;
const currentUsdz = params.get('usdz') || DEFAULT_USDZ;
const autoLaunch = params.get('auto') === '1';

modelInput.value = currentModel;
usdzInput.value = currentUsdz;

updateViewer(currentModel, currentUsdz);
updateShare(currentModel, currentUsdz);

document.getElementById('apply').addEventListener('click', () => {
  const m = modelInput.value.trim() || DEFAULT_MODEL;
  const u = usdzInput.value.trim() || DEFAULT_USDZ;
  updateViewer(m, u);
  updateShare(m, u);
});

document.getElementById('copyLink').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(pageUrlLabel.textContent);
    toast('Link copied');
  } catch (_) {
    toast('Copy failed; long-press to copy');
  }
});

document.getElementById('openLink').addEventListener('click', () => {
  window.open(pageUrlLabel.textContent, '_blank', 'noopener');
});

launchBtn.addEventListener('click', () => launchAR(pageUrlLabel.textContent));

if (autoLaunch) {
  // Defer a bit to let model-viewer set up; then open AR immediately after scanning.
  setTimeout(() => launchAR(pageUrlLabel.textContent), 600);
}

function updateViewer(modelUrl, usdzUrl) {
  viewer.src = modelUrl;
  viewer.setAttribute('ios-src', usdzUrl);
  document.getElementById('srcLabel').textContent = modelUrl;
  document.getElementById('usdzLabel').textContent = usdzUrl;
}

function updateShare(modelUrl, usdzUrl) {
  const base = window.location.origin + window.location.pathname;
  const url = `${base}?model=${encodeURIComponent(modelUrl)}&usdz=${encodeURIComponent(usdzUrl)}&auto=1`;
  pageUrlLabel.textContent = url;
  qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(url)}`;
}

function launchAR(urlWithParams) {
  const u = new URL(urlWithParams);
  const modelUrl = u.searchParams.get('model') || DEFAULT_MODEL;
  const usdzUrl = u.searchParams.get('usdz') || DEFAULT_USDZ;

  if (isIOS()) {
    const a = document.createElement('a');
    a.setAttribute('rel', 'ar');
    a.setAttribute('href', usdzUrl);
    document.body.appendChild(a);
    a.click();
    a.remove();
  } else if (isAndroid()) {
    const scene = `https://arvr.google.com/scene-viewer/1.0?mode=ar_preferred&file=${encodeURIComponent(modelUrl)}&title=AR%20Model`;
    window.location.href = scene;
  } else {
    toast('AR launch works best on mobile');
  }
}

function isIOS() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}

function isAndroid() {
  return /Android/.test(navigator.userAgent);
}

function toast(text) {
  const el = document.createElement('div');
  el.className = 'toast';
  el.textContent = text;
  document.body.appendChild(el);
  requestAnimationFrame(() => el.classList.add('visible'));
  setTimeout(() => {
    el.classList.remove('visible');
    el.addEventListener('transitionend', () => el.remove(), { once: true });
  }, 1800);
}
