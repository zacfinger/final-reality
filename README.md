# Final Reality

Interactive fiction game built in JQuery + Vanilla JavaScript, simulating a command line interface similar to ye olde MUD and text-based adventure games. 

Visit [1000yearKingdom.com](http://1000yearkingdom.com) to view a live demo.

(c) 2018-2020 ZacFinger.com

License: MIT

Version: 0.0.2

## jQuery and JavaScript features

Upon loading `index.html`, the jQuery 3.3.1 library is called, as well as the game's player, monster and item classes. jQuery is the only external dependency upon which the game relies. 

The main view of the game simulates an old school command line interface by making use of the following features:
* Commands are entered into an `input` field pinned to the bottom of the container `div` via `'bottom:0'` attribute in the CSS selector.
* The jQuery function `.focus()` is used to maintain focus on the main `input` field.
* With the jQuery function `.addEventListener()`, the "ENTER" key on the keyboard is added as en event listener to the `input` field. 
* When "ENTER" is hit, this calls `.click()` on a hidden `button` input, which calls function `yourMove()` in `main.js`. 
* `yourMove()` interprets the text in the `input` field, clears the field, and executes the appropriate game actions (which are as of yet still evolving).
* The container `<div>` is then updated with the output from the main game engine.

## Classes

The following files are called by `index.html` (in the following order):

* `jQuery 3.3.1`
    * Served by Google. This is the only external dependency the project requires.
* `item.js`
    * Class definition for items the user can carry.
* `weapon.js`
    * Weapon class, inherits from `item`.
* `player.js`
    * Player object containing various attributes including an array of `item`s.
* `monster.js`
    * Class definition for the `monster` objects, with names usually inspired from Dungeons & Dragons and Final Fantasy.
* `room.js`
    * Room object which contains `item`s, `weapon`s and `monster`s with which the user can interact. Right now the entire world (3 rooms) in this class. This will eventually need to be moved to external storage.
* `main.js`
    * Main application program containing the function `setUpMap()` which renders the room and all the objects it contains. The function also updates the div.

