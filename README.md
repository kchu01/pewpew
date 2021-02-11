# pew pew

Play the classic 1981 fixed shooter game, Galaga, though HTML5, CSS, and JavaScript! Stylized through the world of Star Wars.

## Overview

You have been given a mission - to take down enemy TIE Fighter ships to defeat the Galactic Empire and save the galaxy!

## Game Rules

1. Avoid lasers shot by enemy TIE Fighters and blast your way to victory. 
2. Move with <b>left</b> and <b>right</b> arrow keys to avoid lasers. 
3. Press the <b>space bar</b> to shoot lasers at the enemy.

## Wireframes

![Start screen](/imgs/titlescreen.png)

Title Screen - Press Enter to Play


![Play screen with laser shooting TIE Fighter](/imgs/starwars.jpg)

Ship with TIE Fighter

Image of player ship shot

![Win](/imgs/winscreen.png)

End Screen v1 - Victory

![Lose](/imgs/losescreen.png)

End Screen v2 - Lose
## User Stories

####
1. Start screen
2. Start with one ship that is controlled with left and right arrows
3. Press enter to shoot and if it makes contact with a TIE Fighter then their ship is destroyed
4. If TIE Fighter shoots and it makes contact with player ship then player loses
5. Offer a restart button that resets the game state if player lost
6. If player destroys all enemy ships then galaxy is saved!

## MVP Checklist

#### 
1. Start screen that offers a start button and instructions on how to play
2. Displays the score (how many ships you have hit)
3. Player is able to move and shoot their X-Wing (left and right motion, space bar to shoot)
4. TIE Fighters are at a fixed location but can shoot
5. Hit detection for both X-Wing and TIE Fighter (use canvas to assist with detection)
6. End screen that includes "You saved the galaxy!" or "Your ship has been destroyed!" depending if the player wins or loses

## Stretch Goals | Bonus

####
1. Offer more than one life and it continues game 
2. A final boss - Death Star!
3. Add sound when lasers are shot
4. Add background music 

## Resources

####
1. Keycodes | https://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
2. LocalCompare | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare
3. Background Panning | http://devblog.lastrose.com/css-hero-image-pan/
4. Inheritance | https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Inheritance
5. Canvas | https://www.w3schools.com/tags/ref_canvas.asp
6. Arrays | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array?fbclid=IwAR0R6dm69t2O01_XojMU-32f4PClBG3MFJAqcH1ikfTktFCvq7ouEAQm0zQ
7. Array.splice | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
8. Collision | https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript/Collision_detection
