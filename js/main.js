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
// Store timer reference globally
window.globalTimerInterval = null;
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
    if (window.globalTimerInterval) {
        clearInterval(window.globalTimerInterval);
        window.globalTimerInterval = null;}
// Get current theme color
    const themeName = loadGlobalTheme();
    const themeColor = themeName === 'green' ? '#33ff33' : (themeName === 'red' ? '#ff0000' : '#ff6600');
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
// Reset timer display
    const timerDisplay = document.getElementById('feedTimerDisplay');
    if (timerDisplay) {
        timerDisplay.classList.remove('hidden');
        timerDisplay.style.color = '#ffaa33';
        timerDisplay.innerHTML = 'TIME TO FEED: 45s';}
    const messagesEl = document.getElementById('gameMessages');
    if (messagesEl) {
        messagesEl.innerHTML = `<span style="color:${themeColor}">Your egg has arrived! You have 45 seconds to feed it!</span>`;}
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
// reload the latest chicken state from localStorage first
    const saved = localStorage.getItem('chickenState');
    if (saved) {
        chickenState = JSON.parse(saved);}
// Check if chicken is dead
    if (chickenState.stage === 'dead') {
        const messagesEl = document.getElementById('gameMessages');
        if (messagesEl) {
            messagesEl.innerHTML = '<span style="color:#ffaa33">💀 Clucky is dead. Start a new game!</span>';}
        return;}
// Check if chicken is saved (lived full life)
    if (chickenState.saved === true) {
        const messagesEl = document.getElementById('gameMessages');
        if (messagesEl) {
            messagesEl.innerHTML = '<span style="color:#ffaa33">🐓 Clucky lived a full life! Start a new game to raise another chicken.</span>';}
        return;}
// check if chicken is adult form first
    if (chickenState.stage === 'adult') {
        const messagesEl = document.getElementById('gameMessages');
        if (messagesEl) {
            messagesEl.innerHTML = '<span style="color:#ffaa33">🐔 Clucky is already an adult. Go make your choice (Cook or Let Live) before starting a new game!</span>';}
        return;}
// Update hunger and lastFed
    chickenState.lastFed = Date.now();
    chickenState.hunger = Math.min(100, chickenState.hunger + 20);
// Save immediately after updating hunger
    saveChicken();
// Check for growth (which will save again if stage changes)
    checkGrowth();
// Update display
    updateDisplay();
// Get current theme color for message
    const themeName = loadGlobalTheme();
    const themeColor = themeName === 'green' ? '#33ff33' : (themeName === 'red' ? '#ff0000' : '#ff6600');
    const messagesEl = document.getElementById('gameMessages');
    if (messagesEl) {
        messagesEl.innerHTML = `<span style="color:${themeColor}">🍗 Yum! Hunger increased to ${chickenState.hunger}%. You have 45 seconds to feed again!</span>`;}}
function playWithChicken() {
// Reload the latest chicken state from localStorage first
    const saved = localStorage.getItem('chickenState');
    if (saved) {
        chickenState = JSON.parse(saved);}
// Check if chicken is dead
    if (chickenState.stage === 'dead') {
        const messagesEl = document.getElementById('gameMessages');
        if (messagesEl) {
            messagesEl.innerHTML = '<span style="color:#ffaa33">💀 Clucky is dead. Start a new game!</span>';}
        return;}
// Check if chicken is saved (lived full life)
    if (chickenState.saved === true) {
        const messagesEl = document.getElementById('gameMessages');
        if (messagesEl) {
            messagesEl.innerHTML = '<span style="color:#ffaa33">🐓 Clucky lived a full life! Start a new game to raise another chicken.</span>';}
        return;}
// Check if chicken is adult firsth then show proper message
    if (chickenState.stage === 'adult') {
        const messagesEl = document.getElementById('gameMessages');
        if (messagesEl) {
            messagesEl.innerHTML = '<span style="color:#ffaa33">🐔 Clucky is already an adult. Go make your choice (Cook or Let Live) before starting a new game!</span>';}
        return;}
// Update happiness 
    chickenState.happiness = Math.min(100, chickenState.happiness + 20);
// Save immediately
    saveChicken();
// Check for growth
    checkGrowth();
// Update display
    updateDisplay();
    const themeName = loadGlobalTheme();
    const themeColor = themeName === 'green' ? '#33ff33' : (themeName === 'red' ? '#ff0000' : '#ff6600');
    const messagesEl = document.getElementById('gameMessages');
    if (messagesEl) {
        messagesEl.innerHTML = `<span style="color:${themeColor}">🐔 You played with your chicken! Happiness increased to ${chickenState.happiness}%.</span>`;}}
function checkGrowth() {
// reload the latest chicken state from localStorage first
    const saved = localStorage.getItem('chickenState');
    if (saved) {
        chickenState = JSON.parse(saved);}
    let stageChanged = false;
// Only process growth if not dead, not saved, and not already adult
    if (chickenState.stage !== 'dead' && chickenState.saved !== true && chickenState.stage !== 'adult') {
        if (chickenState.stage === 'egg' && chickenState.happiness >= 70) {
            chickenState.stage = 'chick';
            stageChanged = true;} 
        else if (chickenState.stage === 'chick' && chickenState.hunger >= 100 && chickenState.happiness >= 100) {
            chickenState.stage = 'adult';
            stageChanged = true;
// Stop the global timer when becoming adult
            if (window.globalTimerInterval) {
                clearInterval(window.globalTimerInterval);
                window.globalTimerInterval = null;}}
        if (stageChanged) {
            saveChicken();
            const themeName = loadGlobalTheme();
            const themeColor = themeName === 'green' ? '#33ff33' : (themeName === 'red' ? '#ff0000' : '#ff6600');
            const messagesEl = document.getElementById('gameMessages');
            if (messagesEl) {
                if (chickenState.stage === 'chick') {
                    messagesEl.innerHTML = `<span style="color:${themeColor}">🐥 Your egg hatched! A baby chick appears! Keep feeding and playing!</span>`;
                } else if (chickenState.stage === 'adult') {
                    messagesEl.innerHTML = `<span style="color:${themeColor}">🐔 Your chick grew into a full adult chicken! Both meters at 100%! Make your choice in THE COOP</span>`;}}}}
    updateDisplay();}
function makeChoice(choice) {
// reload the latest chicken state from localStorage first
    const saved = localStorage.getItem('chickenState');
    if (saved) {
        chickenState = JSON.parse(saved);}
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
            messagesEl.innerHTML = `<span style="color:#ffaa33">🐓 You let Clucky live a full, happy life as a proud rooster! Chickens Saved: ${savedCount}</span>`;}}
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
// Always update button visibility based on current stage
    if (actionButtons && choiceButtons) {
        if (chickenState.stage === 'adult') {
// Adult - show choice buttons, hide action buttons
            actionButtons.style.display = 'none';
            choiceButtons.style.display = 'flex';
        } else if (chickenState.stage === 'dead' || chickenState.saved === true) {
// Dead or saved - hide both
            actionButtons.style.display = 'none';
            choiceButtons.style.display = 'none';
        } else {
// Egg or chick - show action buttons, hide choice buttons
            actionButtons.style.display = 'flex';
            choiceButtons.style.display = 'none';}}
// Also update the timer display based on stage
    const timerDisplay = document.getElementById('feedTimerDisplay');
    if (timerDisplay) {
        if (chickenState.stage === 'adult') {
            timerDisplay.classList.remove('hidden');
            timerDisplay.style.color = '#33ff33';
            timerDisplay.innerHTML = '🐔 MAKE YOUR CHOICE 🐔';
        } else if (chickenState.stage === 'dead' || chickenState.saved === true) {
            timerDisplay.classList.remove('hidden');
            timerDisplay.style.color = '#ff3366';
            timerDisplay.innerHTML = '⏱️ GAME OVER';
        } else {
// For egg or chick, timer will be updated by the interval
            timerDisplay.classList.remove('hidden');}}}
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
            hint = `First letter: ${ans[0]}, Length: ${ans.length}`;}
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
// Reload current chicken state
        const savedState = localStorage.getItem('chickenState');
        if (savedState) {
            const currentChicken = JSON.parse(savedState);
// check if cluck is an adult first  - show proper message from terminal
            if (currentChicken.stage === 'adult') {
                response = '🐔 Clucky is already adult! Go to THE COOP to make your choice (Cook or Let Live)!';}
            else if (currentChicken.saved === true) {
                response = '🐓 Clucky lived a full life! Start a new game in THE COOP to raise another chicken.';}
            else if (currentChicken.stage === 'dead') {
                response = '💀 Clucky is dead. Start a new game in THE COOP.';}
            else {
// Call the feed function
                if (typeof feedChicken === 'function') {
                    feedChicken();
// Get updated state
                    const updatedState = localStorage.getItem('chickenState');
                    if (updatedState) {
                        const chicken = JSON.parse(updatedState);
                        response = `🍗 You fed Clucky! Hunger: ${chicken.hunger}% | Happiness: ${chicken.happiness}%`;
                    } else {
                        response = '🍗 You fed Clucky! Check THE COOP to see progress.';}
                } else {
                    response = '❌ Chicken simulator not ready. Start a game in THE COOP first.';}}
        } else {
            response = '❌ No chicken found. Start a game in THE COOP first!';}}
    else if (cmd === 'play') {
// Reload current chicken state
        const savedState = localStorage.getItem('chickenState');
        if (savedState) {
            const currentChicken = JSON.parse(savedState);
// check if clucky is an adult - show proper message from terminal
            if (currentChicken.stage === 'adult') {
                response = '🐔 Clucky is already adult! Go to THE COOP to make your choice (Cook or Let Live)!';}
            else if (currentChicken.saved === true) {
                response = '🐓 Clucky lived a full life! Start a new game in THE COOP to raise another chicken.';}
            else if (currentChicken.stage === 'dead') {
                response = '💀 Clucky is dead. Start a new game in THE COOP.';}
            else {
// Call the play function
                if (typeof playWithChicken === 'function') {
                    playWithChicken();
// Get updated state
                    const updatedState = localStorage.getItem('chickenState');
                    if (updatedState) {
                        const chicken = JSON.parse(updatedState);
                        response = `🐔 You played with Clucky! Hunger: ${chicken.hunger}% | Happiness: ${chicken.happiness}%`;
                    } else {
                        response = '🐔 You played with Clucky! Check THE COOP to see progress.';}
                } else {
                    response = '❌ Chicken simulator not ready. Start a game in THE COOP first.';}}
        } else {
            response = '❌ No chicken found. Start a game in THE COOP first!';}}
    else if (cmd === 'status') {
        const saved = localStorage.getItem('chickenState');
        if (saved) {
            const chicken = JSON.parse(saved);
            if (chicken.saved === true) {
                response = `🐓 Clucky lived a full, happy life as a proud rooster! Chickens Saved: ${localStorage.getItem('chickenSavedCount') || 0}`;
            } else if (chicken.stage === 'dead') {
                response = `💀 Clucky is dead. Start a new game in THE COOP.`;
            } else if (chicken.stage === 'adult') {
                response = `🐔 CLUCKY IS ADULT! Go to THE COOP to make your choice! (Cook or Let Live)`;
            } else {
                const timeSinceLastFeed = Math.floor((Date.now() - chicken.lastFed) / 1000);
                const timeLeft = Math.max(0, 45 - timeSinceLastFeed);
                response = `🐔 Clucky the ${chicken.stage.toUpperCase()} | Hunger: ${chicken.hunger}% | Happiness: ${chicken.happiness}% | Time to feed: ${timeLeft}s`;}
        } else {
            response = `❌ No chicken found. Start a game in THE COOP first!`;}}
    else if (cmd === 'solve') {
        const puzzlesList = [
            { encoded: "LIEF LV IXQ", answer: "LIFE IS FUN" },
            { encoded: "Ymj fywnj htsyjz yt ymj qjky tk ymj gjxy", answer: "THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG" },
            { encoded: "IFMMP XPSME", answer: "HELLO WORLD" },
            { encoded: "ZPV BSF B XJTTFSE", answer: "YOU ARE A WIZARD" }];
        response = "🔓 CRACK THE CODE SOLUTIONS:\n";
        puzzlesList.forEach((p, i) => {
            response += `${i+1}. "${p.encoded}" → "${p.answer}"\n`;});
        response += "\n💡 Use these to win the Cipher Den game mode!";}
    else if (cmd.startsWith('encode ')) {
        const parts = cmd.substring(7).trim().split(' ');
        let shift = 1;
        let msg = '';
        if (parts.length > 0 && /^\d+$/.test(parts[0])) {
            shift = parseInt(parts[0]);
            if (shift < 1) shift = 1;
            if (shift > 5) shift = 5;
            msg = parts.slice(1).join(' ');
        } else {
            msg = parts.join(' ');}
        if (msg === '') {
            return 'Usage: encode [shift 1-5] [message]  OR  encode [message] (uses shift 1)';}
        const encoded = msg.split('').map(c => {
            if (c.match(/[a-z]/i)) {
                const code = c.charCodeAt(0);
                const base = code >= 97 ? 97 : 65;
                return String.fromCharCode(((code - base + shift) % 26) + base);}
            return c;
        }).join('');
        response = `Encoded (shift ${shift}): "${encoded}"`;}
    else if (cmd === 'help') {
        response = 'Available commands: date, time, clear, theme, joke, feed, play, status, solve, encode [1-5] [msg]';}
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
        accentColor: '#ffaa33'},
    red: {
        name: 'red',
        primaryColor: '#ff0000',
        secondaryColor: '#ff3333',
        borderColor: '#ff0000',
        shadowColor: '#ff0000',
        textColor: '#ff0000',
        accentColor: '#ff3333'}};
let currentGlobalTheme = 'green';
let redThemeUnlockedFlag = false;
function loadGlobalTheme() {
// Check if red theme was unlocked
    redThemeUnlockedFlag = localStorage.getItem('redThemeUnlocked') === 'true';
    const savedTheme = localStorage.getItem('globalTheme');
    if (savedTheme && THEMES[savedTheme]) {
        currentGlobalTheme = savedTheme;
    } else {
        currentGlobalTheme = 'green';}
    return currentGlobalTheme;}
function saveGlobalTheme(themeName) {
    localStorage.setItem('globalTheme', themeName);
    currentGlobalTheme = themeName;}
function applyGlobalTheme() {
    const theme = THEMES[currentGlobalTheme];
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
// Get available themes based on unlock status
    const availableThemes = redThemeUnlockedFlag ? ['green', 'orange', 'red'] : ['green', 'orange'];
    const currentIndex = availableThemes.indexOf(currentGlobalTheme);
    const nextIndex = (currentIndex + 1) % availableThemes.length;
    const newTheme = availableThemes[nextIndex];
    saveGlobalTheme(newTheme);
    applyGlobalTheme();
    const themeColor = THEMES[newTheme].primaryColor;
    document.documentElement.style.setProperty('--theme-color', themeColor);
    document.documentElement.style.setProperty('--theme-glow', themeColor);
    console.log(`Theme switched to ${newTheme} mode`);
    return newTheme;}
function getCurrentTheme() {
    return loadGlobalTheme();}
function isRedThemeUnlocked() {
    return redThemeUnlockedFlag;}
// initialize
window.addEventListener('DOMContentLoaded', () => {
    rotateBanner();});