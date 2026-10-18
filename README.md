# 1000-7: A wholesome unique calcaulator to feel 1000-7 to the fullest!

After grasping the basics with the calculator from the assignment from The Odin Project, I had to make my own version, the exact way I had always dreamed it. A wholesome calculator whose purpose is not just to do math, but to help ground you, and not lose your mind, aimed for an overstimulated, broken distressed mind that needs to be rewired. With this capstone project from Foundations Odin Project, I have made another dream come true, and it is all mine! Kaneki is a character that always resonated with me, and that is why doing this feels on a greater evel. 

Tokyo Ghoul is not
mine, however, it belongs to its creator, **Sui Ishida**. It draws
inspiration, and it is based from it, designed, and developed as an
immersive experience to reach the ultimate experience of 1000-7!

At first used my
calculator project as a base sample for reference and guidance, until
removing all other operations to leave only substraction, then, I redesigned the architecture from scratch to support a specialized psychological loop—implementing a custom state machine for sequential subtraction, dynamic DOM injection for atmospheric overlays, multi-tiered milestone tracking, and an infinite number-line engine for Centipede Mode.

For all purposes,
please consider this project, as what it is: a form of fanart.

I highly recommend
listening to “Unravel while playing this web based game! Are you
ready for the countdown?

Thanks to The Odin Project I was able to make another dream come true!

---

##  Technical Overview & Architecture

This project is built using vanilla web technologies, focusing on modular state management, dynamic UI rendering, and immersive event handling.

### 1. State & Logic Engine (JavaScript)
* **Sequential Subtraction Flow:** Stripped down standard arithmetic operations to strictly validate descending steps of 7.
* **State Management:** Tracks active countdown values (`currentNumber`), buffer inputs (`currentInput`), operation modes, and locking mechanisms to prevent race conditions during penalty animations.
* **Streak Tracking & Milestones:** Monitors consecutive correct answers (`streakCount`) to trigger reward milestones at multiples of 7.

### 2. Atmospheric UI & DOM Injection (CSS & HTML)
* **Dynamic Injection:** Programmatically injects high-priority CSS stylesheets and full-screen overlay containers directly into the DOM upon execution.
* **Visual FX:** Features custom CSS `@keyframes` shake animations for calculator breakdown events, high-contrast monospace typography (`'Courier New'`), and absolute-positioned pitch-black blackout screens.

### 3. Progressive Narrative & Reward Tiers
* **Tiered Object Architecture (`rewardTiers`):** Utilizes a structured milestone dictionary mapping interval keys (`7`, `14`, `21`, `28`, `35`, `42`, `49`) to immersive psychological monologues.
* **Timed Intermissions:** Implements asynchronous countdown intervals that lock user interaction during narrative reveals before seamlessly returning control to the descent.

### 4. Centipede Mode & Negative Numbers
* **Infinite Number-Line Support:** Removes arbitrary zero-bound limits, allowing the calculation engine to flow past `0` into negative integers (`-7`, `-14`, `-21`, etc.) to sustain the psychological experience.

### 5. Error Handling & Dual Penalties
* **Typo Breakdown:** Triggers a single random psychological taunt, screen shake, and forced 5-second blackout before resetting the descent to `1000`.
* **Illegal Subtraction:** Fires a total system collapse protocol displaying the entire array of failure taunts simultaneously upon invalid inputs.

### 6. Input Flexibility
* Fully supports both mouse/touch interaction via an on-screen button grid and complete physical keyboard event listeners (`Enter`, `Backspace`, `Escape`, digits `0-9`, and `-`).

##7. I made anoter tweak, and included Kaneki's eye, with svg.
---

