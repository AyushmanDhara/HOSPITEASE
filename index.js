updateScroll();
resetProgress();
function zoomIn() {
    document.body.style.zoom = (parseFloat(document.body.style.zoom || 1) + 0.1).toString();
}

function zoomOut() {
    document.body.style.zoom = (parseFloat(document.body.style.zoom || 1) - 0.1).toString();
}

function resetZoom() {
    document.body.style.zoom = "1";
}

function goToSettings() {
    window.location.href = 'setting.html';  // Redirect to login page
  }