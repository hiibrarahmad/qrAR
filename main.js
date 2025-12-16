// Quick configuration: replace these URLs with your hosted files (glb/gltf and optional usdz for iOS).
const DEFAULT_MODEL = 'https://modelviewer.dev/shared-assets/models/Astronaut.glb';
const DEFAULT_USDZ = 'https://modelviewer.dev/shared-assets/models/Astronaut.usdz';

const params = new URLSearchParams(window.location.search);
const modelInput = document.getElementById('glbInput');
const usdzInput = document.getElementById('usdzInput');
const viewer = document.getElementById('viewer');
const qrImage = document.getElementById('qrImage');
const pageUrlLabel = document.getElementById('pageUrl');

const currentModel = params.get('model') || DEFAULT_MODEL;
const currentUsdz = params.get('usdz') || DEFAULT_USDZ;

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

function updateViewer(modelUrl, usdzUrl) {
  viewer.src = modelUrl;
  viewer.setAttribute('ios-src', usdzUrl);
  document.getElementById('srcLabel').textContent = modelUrl;
  document.getElementById('usdzLabel').textContent = usdzUrl;
}

function updateShare(modelUrl, usdzUrl) {
  const base = window.location.origin + window.location.pathname;
  const url = `${base}?model=${encodeURIComponent(modelUrl)}&usdz=${encodeURIComponent(usdzUrl)}`;
  pageUrlLabel.textContent = url;
  qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(url)}`;
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
