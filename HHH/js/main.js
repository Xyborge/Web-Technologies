// js/main.js
// Rotating banner messages
const bannerMessages = [
    " HATCH - RAISE YOUR CHICKEN. FACE THE CONSEQUENCES. ",
    " HACK - 5+ COMMANDS. EASTER EGGS. ",
    " HASH - BREAK THE CIPHER. SECRETS INSIDE. ",
    " THE ZONES ARE CONNECTED. EXPLORE EVERYTHING. "];
function rotateBanner() {
    const bannerEl = document.getElementById('rotatingBanner');
    let index = 0;
    setInterval(() => {
        index = (index + 1) % bannerMessages.length;
        bannerEl.textContent = bannerMessages[index];
    }, 4000);}
// About credits and reset functions
function showAbout() {
    alert('HATCH HACK HASH v1.0\n A 3-in-1 retro fun zone.\n\n🐣 HATCH - Chicken simulator\n⌨️ HACK - Retro terminal\n🔐 HASH - Cipher puzzles\n\nClick any zone to play!');}
function showCredits() {
    alert('Created for Web Technologies coursework\nFonts: Press Start 2P, VT323\n\nAll zones connected - Choices matter');}
function resetGame() {
    if (confirm('Reset ALL game data? This will clear progress in all zones.')) {
        localStorage.clear();
        alert('Game data reset. Click OK to reload.');
        location.reload();}}
// Initialize banner when DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
    rotateBanner();});
// HATCH zone functions
function hatchShowAbout() {
    alert('HATCH fun zone.\n\n🐣 HATCH - Chicken simulator\nClick on START to begin\nFeed your chicken to fill up the meter!\nDo not feed it and it dies :(\nFace a choice at the end');}
// HATCH credits
function hatchShowCredits() {
    alert('Created for Web Technologies coursework\nFonts: Press Start 2P, VT323\n\nAll zones connected · Choices matter');}
// MENU – returns to the main coop screen
function returnToMainMenu() {
// gently scroll to the top where the main title lives
    window.scrollTo({ top: 0, behavior: 'smooth' });
// highlight effect on the main title
    const title = document.querySelector('.main-title');
    if (title) {
        title.style.transition = 'text-shadow 0.2s';
        title.style.textShadow = '0 0 18px #b3ffb3';
        setTimeout(() => {
            title.style.textShadow = '0 0 5px #33ff33';
        }, 300);}}
// Function to go back to main website
function goToMainPage() {window.location.href = '../index.html';}
// Start game function placeholder for when START is clicked
function startGame() {alert('🐣 UNDER CONSTRUCTION\n\nThe chicken simulator is being built!\nCheck back soon.');}