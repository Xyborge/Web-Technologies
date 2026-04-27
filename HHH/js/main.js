// js/main.js
// Rotating banner messages
const bannerMessages = [
    " HATCH - RAISE YOUR CHICKEN. FACE THE CONSEQUENCES. ",
    " HACK - 5+ COMMANDS. EASTER EGGS. ",
    " HASH - BREAK THE CIPHER. SECRETS INSIDE. ",
    " THE ZONES ARE CONNECTED. EXPLORE EVERYTHING. "];
function rotateBanner() {
    const bannerEl = document.getElementById('rotatingBanner');
    if (!bannerEl) return;
    let index = 0;
    setInterval(() => {
        index = (index + 1) % bannerMessages.length;
        bannerEl.textContent = bannerMessages[index];
    }, 4000);}
// About credits and reset functions
function showAbout() {
    alert('HATCH HACK HASH v1.0\nA 3-in-1 retro fun zone.\n\n🐣 HATCH - Chicken simulator\n⌨️ HACK - Retro terminal\n🔐 HASH - Cipher puzzles\n\nClick any zone to play!');}
function showCredits() {
    alert('Created for Web Technologies coursework\nFonts: Press Start 2P, VT323\n\nAll zones connected - Choices matter');}
function resetGame() {
    if (confirm('Reset ALL game data? This will clear progress in all zones.')) {
        localStorage.clear();
        alert('Game data reset. Click OK to reload.');
        location.reload();}}
// Hatch zone functions
function hatchShowAbout() {
    alert('HATCH fun zone.\n\n🐣 HATCH - Chicken simulator\nClick on START to begin\nFeed your chicken to fill up the meter!\nPlay to increase happiness!\nBoth meters need to reach 100% to become an adult!\nFace a choice at the end');}
function hatchShowCredits() {
    alert('Created for Web Technologies coursework\nFonts: Press Start 2P, VT323\n\nAll zones connected · Choices matter');}
function returnToMainMenu() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const title = document.querySelector('.main-title');
    if (title) {
        title.style.transition = 'text-shadow 0.2s';
        title.style.textShadow = '0 0 18px #b3ffb3';
        setTimeout(() => {
            title.style.textShadow = '0 0 5px #33ff33';
        }, 300);}}
// variables for the chicken states
let chickenState = {
    stage: 'egg',
    name: 'Clucky',
    hunger: 50,
    happiness: 50,
    lastFed: Date.now(),
    deathCount: 0,
    saved: false};
function loadChicken() {
    const saved = localStorage.getItem('chickenState');
    if (saved) {
        chickenState = JSON.parse(saved);}
    updateDisplay();
    return chickenState;}
function saveChicken() {
    localStorage.setItem('chickenState', JSON.stringify(chickenState));}
function startGame() {
// Clear any existing timer
    if (window.globalTimerInterval) clearInterval(window.globalTimerInterval);
// Get current theme color
    const themeName = loadGlobalTheme();
    const themeColor = themeName === 'green' ? '#33ff33' : '#ff6600';
    chickenState = {
        stage: 'egg',
        name: 'Clucky',
        hunger: 50,
        happiness: 50,
        lastFed: Date.now(),
        deathCount: chickenState.deathCount || 0,
        saved: false};
    saveChicken();
    updateDisplay();
    const messagesEl = document.getElementById('gameMessages');
    if (messagesEl) {
        messagesEl.innerHTML = `<span style="color:${themeColor}">✨ Your egg has arrived! You have 45 seconds to feed it!</span>`;}
    const hintArea = document.getElementById('hintArea');
    if (hintArea) {
        hintArea.style.display = 'none';
        hintArea.innerHTML = '';}
    const actionButtons = document.getElementById('actionButtons');
    if (actionButtons) {
        actionButtons.style.display = 'flex';}
    const choiceButtons = document.getElementById('choiceButtons');
    if (choiceButtons) {
        choiceButtons.style.display = 'none';}
// Restart the global timer
    if (typeof startGlobalTimer === 'function') {
        startGlobalTimer();}}
function feedChicken() {
    if (chickenState.stage === 'dead' || chickenState.saved === true) return;
    chickenState.lastFed = Date.now();
    chickenState.hunger = Math.min(100, chickenState.hunger + 20);
    checkGrowth();
    saveChicken();
    updateDisplay();
// Get current theme color
    const themeName = loadGlobalTheme();
    const themeColor = themeName === 'green' ? '#33ff33' : '#ff6600';
    const messagesEl = document.getElementById('gameMessages');
    if (messagesEl) {
        messagesEl.innerHTML = `<span style="color:${themeColor}">🍗 Yum! Hunger increased. You have 45 seconds to feed again!</span>`;}}
function playWithChicken() {
    if (chickenState.stage === 'dead' || chickenState.saved === true) return;
    chickenState.happiness = Math.min(100, chickenState.happiness + 20);
    checkGrowth();
    saveChicken();
    updateDisplay();
// Get current theme color
    const themeName = loadGlobalTheme();
    const themeColor = themeName === 'green' ? '#33ff33' : '#ff6600';
    const messagesEl = document.getElementById('gameMessages');
    if (messagesEl) {
        messagesEl.innerHTML = `<span style="color:${themeColor}">🐔 You played with your chicken! Happiness increased.</span>`;}}
function checkGrowth() {
    if (chickenState.stage !== 'dead' && chickenState.saved !== true) {
// Get current theme color
        const themeName = loadGlobalTheme();
        const themeColor = themeName === 'green' ? '#33ff33' : '#ff6600';
        if (chickenState.stage === 'egg' && chickenState.happiness >= 70) {
            chickenState.stage = 'chick';
            const messagesEl = document.getElementById('gameMessages');
            if (messagesEl) {
                messagesEl.innerHTML = `<span style="color:${themeColor}">🐥 Your egg hatched! A baby chick appears! Keep feeding and playing!</span>`;}} 
        else if (chickenState.stage === 'chick' && chickenState.hunger >= 100 && chickenState.happiness >= 100) {
            chickenState.stage = 'adult';
            const messagesEl = document.getElementById('gameMessages');
            if (messagesEl) {
                messagesEl.innerHTML = `<span style="color:${themeColor}">🐔 Your chick grew into a full adult chicken! Both meters at 100%! Make your choice...</span>`;}}}
    updateDisplay();}
function makeChoice(choice) {
    if (chickenState.stage !== 'adult') {
        const messagesEl = document.getElementById('gameMessages');
        if (messagesEl) {
            messagesEl.innerHTML = '<span style="color:#ffaa33">Your chicken isn\'t ready for this choice yet.</span>';}
        return;}
    if (choice === 'slaughter') {
        let deathCount = localStorage.getItem('chickenDeathCount') || 0;
        deathCount = parseInt(deathCount) + 1;
        localStorage.setItem('chickenDeathCount', deathCount);
        chickenState.deathCount = deathCount;
        chickenState.stage = 'dead';
        chickenState.saved = false;
        const messagesEl = document.getElementById('gameMessages');
        if (messagesEl) {
            messagesEl.innerHTML = `<span style="color:#ff3366">💀 You sent Clucky to the slaughter... Chickens Eaten: ${deathCount}</span>`;}
    } else if (choice === 'old') {
        let savedCount = localStorage.getItem('chickenSavedCount') || 0;
        savedCount = parseInt(savedCount) + 1;
        localStorage.setItem('chickenSavedCount', savedCount);
        chickenState.stage = 'dead';
        chickenState.saved = true;
        const messagesEl = document.getElementById('gameMessages');
        if (messagesEl) {
            messagesEl.innerHTML = `<span style="color:#ffaa33">🐓 You let Clucky live a full, happy life as a proud rooster! Chickens Saved: ${savedCount}\n\n💀 You died of old age waiting!</span>`;}}
    saveChicken();
    updateDisplay();
// Stop timer when game ends
    if (window.globalTimerInterval) clearInterval(window.globalTimerInterval);}
function updateDisplay() {
    const stageIcon = {
        egg: '🥚',
        chick: '🐥',
        adult: '🐔',
        dead: '💀',
        saved: '🐓'};
    const stageEl = document.getElementById('chickenStage');
    const stageTextEl = document.getElementById('chickenStageText');
    const nameEl = document.getElementById('chickenName');
    const hungerFillEl = document.getElementById('hungerFill');
    const happinessFillEl = document.getElementById('happinessFill');
    const hungerPercentEl = document.getElementById('hungerPercent');
    const happinessPercentEl = document.getElementById('happinessPercent');
    const deathCountEl = document.getElementById('deathCount');
    const savedCountEl = document.getElementById('savedCount');
    const actionButtons = document.getElementById('actionButtons');
    const choiceButtons = document.getElementById('choiceButtons');
    if (chickenState.saved === true) {
        if (stageEl) stageEl.textContent = '🐓';
        if (stageTextEl) stageTextEl.textContent = 'SAVED';
    } else {
        if (stageEl) stageEl.textContent = stageIcon[chickenState.stage] || '🥚';
        if (stageTextEl) stageTextEl.textContent = chickenState.stage.toUpperCase();}
    if (nameEl) nameEl.textContent = chickenState.name || 'Unnamed';
    if (hungerFillEl) hungerFillEl.style.width = `${chickenState.hunger}%`;
    if (happinessFillEl) happinessFillEl.style.width = `${chickenState.happiness}%`;
    if (hungerPercentEl) hungerPercentEl.textContent = chickenState.hunger;
    if (happinessPercentEl) happinessPercentEl.textContent = chickenState.happiness;
    const deathCount = localStorage.getItem('chickenDeathCount') || 0;
    const savedCount = localStorage.getItem('chickenSavedCount') || 0;
    if (deathCountEl) deathCountEl.textContent = deathCount;
    if (savedCountEl) savedCountEl.textContent = savedCount;
    if (actionButtons && choiceButtons) {
        if (chickenState.stage === 'adult') {
            actionButtons.style.display = 'none';
            choiceButtons.style.display = 'flex';
        } else if (chickenState.stage === 'dead') {
            actionButtons.style.display = 'none';
            choiceButtons.style.display = 'none';
        } else if (chickenState.saved === true) {
            actionButtons.style.display = 'none';
            choiceButtons.style.display = 'none';}}}
// Functions for cipher zone
function caesarCipher(text, shift, decode = false) {
    const actualShift = decode ? -shift : shift;
    return text.split('').map(char => {
        if (char.match(/[a-z]/i)) {
            const code = char.charCodeAt(0);
            const base = code >= 97 ? 97 : 65;
            return String.fromCharCode(((code - base + actualShift) % 26 + 26) % 26 + base);}
        return char;
    }).join('');}
function updateCipher() {
    const input = document.getElementById('cipherInput');
    const cipherType = document.getElementById('cipherType');
    const output = document.getElementById('cipherOutput');
    if (!input || !cipherType || !output) return;
    const text = input.value;
    const type = cipherType.value;
    let result = '';
    if (type === 'caesar') {
        const shift = parseInt(document.getElementById('shiftAmount').value);
        result = caesarCipher(text, shift);
    } else if (type === 'caesar-decode') {
        const shift = parseInt(document.getElementById('shiftAmount').value);
        result = caesarCipher(text, shift, true);}
    output.value = result;}
function copyToClipboard() {
    const output = document.getElementById('cipherOutput');
    if (output) {
        output.select();
        document.execCommand('copy');
        alert('Copied to clipboard!');}}
// crack the code
let gameModeActive = false;
let currentPuzzle = {};
let gameScore = 0;
let gameTimer = null;
let timeLeft = 60;
// Caesar cipher with shifts 1-5
const puzzles = [
    { encoded: "LIEF LV IXQ", answer: "LIFE IS FUN", shift: 3, type: "caesar" },
    { encoded: "Ymj fywnj htsyjz yt ymj qjky tk ymj gjxy", answer: "THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG", shift: 5, type: "caesar" },
    { encoded: "IFMMP XPSME", answer: "HELLO WORLD", shift: 1, type: "caesar" },
    { encoded: "ZPV BSF B XJTTFSE", answer: "YOU ARE A WIZARD", shift: 1, type: "caesar" }];
function startGameMode() {
    gameModeActive = true;
    gameScore = 0;
    timeLeft = 60;
    const gamePanel = document.getElementById('gameModePanel');
    const toolPanel = document.getElementById('cipherToolPanel');
    const gameScoreEl = document.getElementById('gameScore');
    const gameTimerEl = document.getElementById('gameTimer');
    if (gamePanel) gamePanel.style.display = 'block';
    if (toolPanel) toolPanel.style.display = 'none';
    if (gameScoreEl) gameScoreEl.textContent = gameScore;
    if (gameTimerEl) gameTimerEl.textContent = timeLeft;
    const feedbackEl = document.getElementById('gameFeedback');
    if (feedbackEl) feedbackEl.innerHTML = '';
    startGameTimer();
    loadNextPuzzle();}
function startGameTimer() {
    if (gameTimer) clearInterval(gameTimer);
    gameTimer = setInterval(() => {
        if (timeLeft <= 0) {
            endGameMode("TIME'S UP!");
        } else {
            timeLeft--;
            const timerEl = document.getElementById('gameTimer');
            if (timerEl) timerEl.textContent = timeLeft;}
    }, 1000);}
function loadNextPuzzle() {
    if (!gameModeActive) return;
    const randomIndex = Math.floor(Math.random() * puzzles.length);
    currentPuzzle = { ...puzzles[randomIndex] };
    const encodedEl = document.getElementById('gameEncodedMessage');
    const answerInput = document.getElementById('gameUserAnswer');
    const feedbackEl = document.getElementById('gameFeedback');
    if (encodedEl) encodedEl.textContent = currentPuzzle.encoded;
    if (answerInput) answerInput.value = '';
    if (feedbackEl) feedbackEl.innerHTML = '';}
function checkGameAnswer() {
    const userAnswer = document.getElementById('gameUserAnswer');
    const feedbackEl = document.getElementById('gameFeedback');
    if (!userAnswer) return;    
    const answer = userAnswer.value.toUpperCase().trim();
    if (answer === currentPuzzle.answer.toUpperCase()) {
        gameScore += 10;
        const scoreEl = document.getElementById('gameScore');
        if (scoreEl) scoreEl.textContent = gameScore;
        if (feedbackEl) feedbackEl.innerHTML = '<span style="color:#33ff33">✓ CORRECT! +10 points</span>';
        loadNextPuzzle();
    } else {
        if (feedbackEl) feedbackEl.innerHTML = '<span style="color:#ff3366">✗ INCORRECT. Try again!</span>';}}
function getHint() {
    const feedbackEl = document.getElementById('gameFeedback');
    const scoreEl = document.getElementById('gameScore');
    if (gameScore >= 5) {
        gameScore -= 5;
        if (scoreEl) scoreEl.textContent = gameScore;
        let hint = '';
        const ans = currentPuzzle.answer;
        if (ans && ans.length > 0) {
            hint = `First letter: ${ans[0]}, Length: ${ans.length}`;
        }
        if (feedbackEl) feedbackEl.innerHTML = `<span style="color:#ffaa33">💡 HINT: ${hint}</span>`;
    } else {
        if (feedbackEl) feedbackEl.innerHTML = '<span style="color:#ffaa33">❌ Not enough points for hint (need 5)</span>';}}
function endGameMode(reason) {
    gameModeActive = false;
    if (gameTimer) clearInterval(gameTimer);
    const gamePanel = document.getElementById('gameModePanel');
    const toolPanel = document.getElementById('cipherToolPanel');
    const gameMessageEl = document.getElementById('gameMessage');
    if (gamePanel) gamePanel.style.display = 'none';
    if (toolPanel) toolPanel.style.display = 'block';
    let highScore = localStorage.getItem('cipherHighScore') || 0;
    if (gameScore > highScore) {
        localStorage.setItem('cipherHighScore', gameScore);
        highScore = gameScore;
        if (gameMessageEl) gameMessageEl.innerHTML = `🏆 NEW HIGH SCORE: ${gameScore}! 🏆`;
    } else {
        if (gameMessageEl) gameMessageEl.innerHTML = `Game over. Score: ${gameScore} | High Score: ${highScore}`;}
    setTimeout(() => {
        if (gameMessageEl) gameMessageEl.innerHTML = '';
    }, 3000);}
function cancelGameMode() {
    if (gameTimer) clearInterval(gameTimer);
    gameModeActive = false;
    const gamePanel = document.getElementById('gameModePanel');
    const toolPanel = document.getElementById('cipherToolPanel');
    const gameMessageEl = document.getElementById('gameMessage');
    if (gamePanel) gamePanel.style.display = 'none';
    if (toolPanel) toolPanel.style.display = 'block';
    if (gameMessageEl) gameMessageEl.innerHTML = 'Game mode cancelled.';}
// terminal command
function processTerminalCommand(command) {
    const cmd = command.toLowerCase().trim();
    let response = '';
    if (cmd === 'date') {
        const date = new Date();
        response = `Current date: ${date.toDateString()}`;}
    else if (cmd === 'time') {
        const date = new Date();
        response = `Current time: ${date.toLocaleTimeString()}`;}
    else if (cmd === 'clear') {
        return 'CLEAR';}
    else if (cmd === 'theme') {
        const newTheme = toggleGlobalTheme();
        response = `Theme switched to ${newTheme.toUpperCase()} mode. (Applies to ALL zones!)`;}
    else if (cmd === 'joke') {
        const jokes = [
            'Why did the chicken cross the road? To get to the TERMINAL!',
            'What do you call a fake noodle? An IMPASTA!',
            'Why do programmers prefer dark mode? Because light attracts bugs!',
            'What is a computer\'s favorite beat? An ALGO-RHYTHM!'];
        response = jokes[Math.floor(Math.random() * jokes.length)];}
    else if (cmd === 'feed') {
        response = '🍗 You fed your chicken! (Connect to THE COOP for the full chicken simulation)';}
    else if (cmd.startsWith('cipher ')) {
        const msg = cmd.substring(7);
        const encoded = msg.split('').map(c => {
            if (c.match(/[a-z]/i)) {
                const code = c.charCodeAt(0);
                const base = code >= 97 ? 97 : 65;
                return String.fromCharCode(((code - base + 3) % 26) + base);}
            return c;
        }).join('');
        response = `Encoded: "${encoded}"`;}
    else if (cmd === 'help') {
        response = 'Available commands: date, time, clear, theme, joke, feed, cipher [msg]';}
    else if (cmd === '') {
        response = '';}
    else {
        response = `'${command}' is not recognized. Type "help" for available commands.`;}
    return response;}
// global theme
const THEMES = {
    green: {
        name: 'green',
        primaryColor: '#33ff33',
        secondaryColor: '#66ff66',
        borderColor: '#33ff33',
        shadowColor: '#33ff33',
        textColor: '#33ff33',
        accentColor: '#33ff33'},
    orange: {
        name: 'orange',
        primaryColor: '#ff6600',
        secondaryColor: '#ff9933',
        borderColor: '#ff6600',
        shadowColor: '#ff6600',
        textColor: '#ff6600',
        accentColor: '#ffaa33'}};
let currentGlobalTheme = 'green';
function loadGlobalTheme() {
    const savedTheme = localStorage.getItem('globalTheme');
    if (savedTheme && THEMES[savedTheme]) {
        currentGlobalTheme = savedTheme;
    } else {
        currentGlobalTheme = 'green';
    }
    return currentGlobalTheme;}
function saveGlobalTheme(themeName) {
    localStorage.setItem('globalTheme', themeName);
    currentGlobalTheme = themeName;}
function applyGlobalTheme() {
    const themeName = loadGlobalTheme();
    const theme = THEMES[themeName];
    const container = document.querySelector('.container');
    if (container) {
        container.style.borderColor = theme.borderColor;
        container.style.boxShadow = `0 0 20px ${theme.shadowColor}, inset 0 0 10px ${theme.shadowColor}`;}
    const elementsWithBorder = document.querySelectorAll('.zone-card, .terminal-container, .cipher-container, .chicken-display, .stat, .command-list, .footer, .header');
    elementsWithBorder.forEach(el => {
        if (el.style) el.style.borderColor = theme.borderColor;});
    const textElements = document.querySelectorAll('.main-title, .zone-title, .zone-desc, .zone-status, .banner, .rotating-banner, .terminal-prompt, .terminal-output, .terminal-input, .command-badge, .stat-label, .death-counter, .cipher-label, .zone-icon');
    textElements.forEach(el => {
        if (el.style) el.style.color = theme.textColor;});
    document.documentElement.style.setProperty('--theme-color', theme.primaryColor);
    document.documentElement.style.setProperty('--theme-glow', theme.shadowColor);
    const cursor = document.querySelector('.cursor-blink');
    if (cursor) cursor.style.backgroundColor = theme.primaryColor;
    const mainTitle = document.querySelector('.main-title');
    if (mainTitle) mainTitle.style.textShadow = `0 0 5px ${theme.primaryColor}`;
    const rotatingBanner = document.querySelector('.rotating-banner');
    if (rotatingBanner) {
        rotatingBanner.style.borderTopColor = theme.borderColor;
        rotatingBanner.style.borderBottomColor = theme.borderColor;}
    const actionBtns = document.querySelectorAll('.action-btn, .start-btn, .cipher-btn, .theme-btn');
    actionBtns.forEach(btn => {
        if (btn.style) {
            btn.style.borderColor = theme.borderColor;
            btn.style.color = theme.textColor;}});
    const footerLinks = document.querySelectorAll('.hatch-footer-link, .menu-link, .footer-links a');
    footerLinks.forEach(link => {
        if (link.style) {
            link.style.borderBottomColor = theme.borderColor;
            link.style.color = theme.textColor;}});}
function toggleGlobalTheme() {
    const newTheme = currentGlobalTheme === 'green' ? 'orange' : 'green';
    saveGlobalTheme(newTheme);
    applyGlobalTheme();
    const themeColor = newTheme === 'green' ? '#33ff33' : '#ff6600';
    document.documentElement.style.setProperty('--theme-color', themeColor);
    document.documentElement.style.setProperty('--theme-glow', themeColor);
    console.log(`Theme switched to ${newTheme} mode`);
    return newTheme;}
function getCurrentTheme() {
    return loadGlobalTheme();}
// initialize
window.addEventListener('DOMContentLoaded', () => {
    rotateBanner();});
