// Quick configuration: replace these URLs with your hosted files (glb/gltf and optional usdz for iOS).
const DEFAULT_MODEL = 'https://modelviewer.dev/shared-assets/models/Astronaut.glb';
const DEFAULT_USDZ = 'https://modelviewer.dev/shared-assets/models/Astronaut.usdz';

const params = new URLSearchParams(window.location.search);
const modelUrl = params.get('model') || DEFAULT_MODEL;
const usdzUrl = params.get('usdz') || DEFAULT_USDZ;

const viewer = document.getElementById('viewer');
viewer.src = modelUrl;
viewer.setAttribute('ios-src', usdzUrl);

document.getElementById('srcLabel').textContent = modelUrl;
document.getElementById('usdzLabel').textContent = usdzUrl;

const pageUrl = window.location.href;
const qrImage = document.getElementById('qrImage');
qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(pageUrl)}`;
document.getElementById('pageUrl').textContent = pageUrl;

document.getElementById('copyLink').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(pageUrl);
    toast('Link copied');
  } catch (_) {
    toast('Copy failed; long-press to copy');
  }
});

document.getElementById('openLink').href = pageUrl;

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
