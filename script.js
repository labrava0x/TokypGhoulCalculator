let currentNumber = 1000;
let currentInput = '';
let isSubtractMode = false;
let isLocked = false;
let streakCount = 0; 

const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.buttons button');
const calculator = document.querySelector('.calculator');

// Initialize display
display.textContent = currentNumber;

// Dynamic Inject: Keyframe Animation & Dark Overlay Styles
if (!document.getElementById('rize-breakdown-styles')) {
  const styleSheet = document.createElement('style');
  styleSheet.id = 'rize-breakdown-styles';
  styleSheet.textContent = `
    @keyframes shake {
      0% { transform: translate(1px, 1px) rotate(0deg); }
      20% { transform: translate(-3px, 0deg) rotate(1deg); }
      40% { transform: translate(1px, -1px) rotate(1deg); }
      60% { transform: translate(-3px, 1px) rotate(0deg); }
      80% { transform: translate(-1px, -1px) rotate(1deg); }
      100% { transform: translate(1px, -2px) rotate(-1deg); }
    }
    .calculator.shake {
      animation: shake 0.4s ease;
    }
    
    /* Pitch-Black Jump-Scare & Reward Overlays */
    .blackout-overlay, .reward-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: #000000;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 12px;
      padding: 40px;
      box-sizing: border-box;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s ease;
    }
    .blackout-overlay.active, .reward-overlay.active {
      opacity: 1;
      pointer-events: auto;
    }
    .blackout-taunts-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      text-align: center;
      max-width: 750px;
    }
    .blackout-taunt {
      font-family: 'Courier New', Courier, monospace;
      font-size: 1.05rem;
      color: #ff1a1a;
      text-shadow: 0 0 14px rgba(255, 0, 0, 0.95), 2px 2px 4px #000;
      user-select: none;
      line-height: 1.5;
    }
    .blackout-timer, .reward-timer {
      font-family: 'Courier New', Courier, monospace;
      font-size: 0.85rem;
      color: #661111;
      letter-spacing: 2px;
      margin-top: 15px;
    }
    .reward-text {
      font-family: 'Courier New', Courier, monospace;
      font-size: 1.15rem;
      color: #ff3333;
      text-align: center;
      line-height: 1.9;
      max-width: 720px;
      text-shadow: 0 0 15px rgba(255, 0, 50, 0.95), 2px 2px 6px #000;
      user-select: none;
    }
  `;
  document.head.appendChild(styleSheet);
}

// Ensure Overlays Exist in DOM
let blackoutOverlay = document.querySelector('.blackout-overlay');
if (!blackoutOverlay) {
  blackoutOverlay = document.createElement('div');
  blackoutOverlay.className = 'blackout-overlay';
  document.body.appendChild(blackoutOverlay);
}

let rewardOverlay = document.querySelector('.reward-overlay');
if (!rewardOverlay) {
  rewardOverlay = document.createElement('div');
  rewardOverlay.className = 'reward-overlay';
  document.body.appendChild(rewardOverlay);
}

// Full pool of failure taunts
const taunts = [
  "Poor thing",
  "can't you keep up?",
  "just giving in already",
  "no one is coming to save you",
  "Are you scared? don't hold back!",
  "Pathetic, little thing, let me see how much you can scream!",
  "You were too good, too nice, too pure. That is the problem. Someone like you cannot take up space in this world",
  "You hate being alone? You really think someone will stay? Look at you! You just keep breaking. Such a fragile thing!"
];

// Tiered Progressive Reward Monologues (Indexed by streak cycle: 7, 14, 21, 28, 35, 42, 49)
const rewardTiers = {
  7: `Why are you crying? You said you would rather hurt yourself than inflict pain on others. You chose to be neutral. You chose to not take up space. But, you know, what happens when you play both sides? In the end, everybody loses. You saw what happened with your mother. Learn the lesson that your mother couldn't seem to grasp. But, sometimes, to protect one thing, you have to have the resolve to let another thing go.`,
  14: `Let go of yourself, submit yourself to me!`,
  21: `Remember how you just repeated: "All suffering in this world is born from an individual's incompetence"? Don't let them win in your suffering, overpower them, eat them, devour them, until there's nothing left!!`,
  28: `You wish your mother would have chosen you? Scream it! Because she did not choose you no one will? Choose yourself! Was it too late? Just unravel, the world, and claim it as yours! Yes, like that, keep going!`,
  35: `You were left alone because you could not be strong, come on, let everyone hear you! Scream for me! Live for yourself, destroy, and take for yourself!`,
  42: `Even if it means forsaking everything in this world? Even if it meant hurting someone?`,
  49: `"My good one"!! Let's become one!!`
};

// PENALTY 1: Normal Mistake / Typo -> ONE random taunt, reset to 1000
function triggerSingleTauntBreakdown() {
  isLocked = true;
  streakCount = 0;
  calculator.classList.add('shake');
  display.textContent = 'UNRAVEL the world';

  const randomTaunt = taunts[Math.floor(Math.random() * taunts.length)];

  setTimeout(() => {
    calculator.classList.remove('shake');
    let countdown = 5;
    
    function renderBlackout() {
      blackoutOverlay.innerHTML = `
        <div class="blackout-taunts-container">
          <div class="blackout-taunt">${randomTaunt}</div>
        </div>
        <div class="blackout-timer">[ restarting descent in ${countdown}... ]</div>
      `;
      blackoutOverlay.classList.add('active');
    }

    renderBlackout();

    const countdownInterval = setInterval(() => {
      countdown--;
      if (countdown > 0) {
        renderBlackout();
      } else {
        clearInterval(countdownInterval);
        blackoutOverlay.classList.remove('active');
        currentNumber = 1000;
        currentInput = '';
        isSubtractMode = false;
        display.textContent = currentNumber;
        isLocked = false;
      }
    }, 1000);
  }, 600);
}

// PENALTY 2: Illegal Subtraction -> ALL taunts at once, reset to 1000
function triggerAllTauntsBreakdown() {
  isLocked = true;
  streakCount = 0;
  calculator.classList.add('shake');
  display.textContent = 'UNRAVEL the world';

  setTimeout(() => {
    calculator.classList.remove('shake');
    let countdown = 5;
    
    function renderBlackout() {
      blackoutOverlay.innerHTML = `
        <div class="blackout-taunts-container">
          ${taunts.map(t => `<div class="blackout-taunt">${t}</div>`).join('')}
        </div>
        <div class="blackout-timer">[ restarting descent in ${countdown}... ]</div>
      `;
      blackoutOverlay.classList.add('active');
    }

    renderBlackout();

    const countdownInterval = setInterval(() => {
      countdown--;
      if (countdown > 0) {
        renderBlackout();
      } else {
        clearInterval(countdownInterval);
        blackoutOverlay.classList.remove('active');
        currentNumber = 1000;
        currentInput = '';
        isSubtractMode = false;
        display.textContent = currentNumber;
        isLocked = false;
      }
    }, 1000);
  }, 600);
}

// Trigger Tiered Rize Reward Overlay based on streak count (clamps past 49)
function triggerStreakReward() {
  isLocked = true;
  let countdown = 8; 

  const availableTiers = Object.keys(rewardTiers).map(Number).sort((a, b) => a - b);
  const targetTier = Math.floor(streakCount / 7) * 7;
  const tierKey = rewardTiers[targetTier] ? targetTier : availableTiers[availableTiers.length - 1];
  const activeMonologue = rewardTiers[tierKey];

  function renderReward() {
    rewardOverlay.innerHTML = `
      <div class="reward-text">${activeMonologue}</div>
      <div class="reward-timer">[ continuing descent in ${countdown}... ]</div>
    `;
    rewardOverlay.classList.add('active');
  }

  renderReward();

  const rewardInterval = setInterval(() => {
    countdown--;
    if (countdown > 0) {
      renderReward();
    } else {
      clearInterval(rewardInterval);
      rewardOverlay.classList.remove('active');
      currentInput = '';
      isSubtractMode = false;
      display.textContent = currentNumber;
      isLocked = false;
    }
  }, 1000);
}

// Process Successful Progression Step (Centipede Mode: continues past 0 into negative numbers)
function processSuccessStep(nextValue) {
  currentNumber = nextValue;
  streakCount++;
  currentInput = '';

  display.textContent = currentNumber;
  
  // Check if streak reached a multiple of 7
  if (streakCount > 0 && streakCount % 7 === 0) {
    setTimeout(() => {
      triggerStreakReward();
    }, 150);
  }
}

buttons.forEach(button => {
  button.addEventListener('click', () => {
    if (isLocked) return;

    const val = button.textContent.trim();

    // CLEAR
    if (val === 'Clear') {
      currentNumber = 1000;
      currentInput = '';
      isSubtractMode = false;
      streakCount = 0;
      display.textContent = currentNumber;
      return;
    }

    // BACKSPACE (←)
    if (val === '←') {
      if (currentInput.length > 0) {
        currentInput = currentInput.slice(0, -1);
        display.textContent = currentInput === '' ? currentNumber : currentInput;
      }
      return;
    }

    // MINUS (-)
    if (val === '-') {
      isSubtractMode = true;
      currentInput = '';
      display.textContent = '-';
      return;
    }

    // EQUALS (=)
    if (val === '=') {
      const expected = currentNumber - 7;

      if (isSubtractMode) {
        const subtrahend = currentInput === '' ? 7 : parseFloat(currentInput);
        
        if (subtrahend === 7) {
          processSuccessStep(expected);
        } else {
          // ILLEGAL SUBTRACTION -> ALL taunts at once!
          triggerAllTauntsBreakdown();
        }
      } else {
        // Manual Verification Mode
        if (currentInput === '') return;
        const guessed = parseInt(currentInput, 10);

        if (guessed === expected) {
          processSuccessStep(expected);
        } else {
          // MANUAL TYPO / MISTAKE -> ONE random taunt!
          triggerSingleTauntBreakdown();
        }
      }
      return;
    }

    // DIGITS (0-9)
    if (display.textContent === 'UNRAVEL the world') {
      return;
    }

    if (display.textContent === '-' || (isSubtractMode && currentInput === '')) {
      currentInput = val;
    } else {
      currentInput += val;
    }
    display.textContent = currentInput;
  });
});

// Keyboard Controls
document.addEventListener('keydown', (e) => {
  if (isLocked) return;

  if (e.key >= '0' && e.key <= '9') {
    const btn = Array.from(buttons).find(b => b.textContent.trim() === e.key);
    if (btn) btn.click();
  } else if (e.key === '-' || e.key === 'Subtract') {
    const btn = Array.from(buttons).find(b => b.textContent.trim() === '-');
    if (btn) btn.click();
  } else if (e.key === 'Enter' || e.key === '=') {
    const btn = Array.from(buttons).find(b => b.textContent.trim() === '=');
    if (btn) btn.click();
  } else if (e.key === 'Backspace') {
    const btn = Array.from(buttons).find(b => b.textContent.trim() === '←');
    if (btn) btn.click();
  } else if (e.key === 'Escape') {
    const btn = Array.from(buttons).find(b => b.textContent.trim() === 'Clear');
    if (btn) btn.click();
  }
});