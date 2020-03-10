export function checkHttps() {
  if (window.location.hostname !== 'localhost' && window.location.protocol !== 'https:') {
    window.location.href = window.location.href.replace(/^http(?!s)/, 'https');
  }
}
