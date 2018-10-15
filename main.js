// 1000 YEAR KINGDOM command line javascript game
//
// (c) 2018 ZacFinger.com
// v0.0.1.810.14.17

// things left to do:
// ------ ---- -- ---
// array of monsters in rooms
// clean up item and weapon classes
// // rename item methods to be weapon method names
// weapon methods must be inherited from item
// set and get methods in player, room, world, etc must work
// world and player must be persistent as user changes rooms
// apply factory pattern
//
// user must be able to use potions, elixirs, etc
// if user uses potion on monster the monster gains health
// if user uses potion on self it gains health
// if user users weapon on self it takes damage
// if user uses weapon on monster, monster takes dmg
// user uses word "kill" to use currently equipped item
//
// make monsters have gold and items
// user can use word "loot" to loot monster
// you encounter a goblins dead body
// 
// update rooms so that obstructions have directionality
// make west and east work
//
// add large enough array in myWorld for all rooms to exist
// // initialize large enough array
// // room.js contains array of all possible rooms
// // // pull rooms and monsters programmatically from JSON file?
// https://www.w3schools.com/jquery/ajax_ajax.asp
//
// firstScreen will not work if you are killed by the IMP in map 1,0
// fix checking gordon health > 0 when monster attacks breaks functionality
// 
// add non violent NPCs
// 
// make items more robust (i.e., stats for items)
// make INN in town restore health
// make shop where you can buy items for the castle
//
// update battle system (earthbound battle system)
// super mario rpg battle system
// 
// clean up/document/comment main.js/main.css/index.html 
// make opening screen (first load up) block letter title screen
// add copyright info to title screen
//
// test edge cases
//

// https://babeljs.io/
// https://webpack.js.org/
// https://babeljs.io/docs/en/next/learn
// https://webpack.js.org/concepts
// https://wesbos.com/courses/
// https://es6.io/
// require.js

// notes: http://www2.silverblade.net/cliches/
// https://stackoverflow.com/questions/1640502/pc-speaker-beep-via-javascript
// https://stackoverflow.com/questions/27366848/how-do-i-store-my-node-mysql-password-not-in-plain-text
// https://stackoverflow.com/questions/22348705/best-way-to-store-db-config-in-node-js-express-app
// https://www.ffcompendium.com/h/faqs/ff1bsiron.txt
// https://strategywiki.org/wiki/Final_Fantasy/Items

///////////////////////////

// possible names
// -------- -----
// chairman of the rings // 2 results
// premier of the rings // 0 results
// president of the rings // 21 results
// citizen of the rings // 1 result
// legend of marie // 315000 results
// final reality // 61500 results
// peasant of the rings // 0 results
// bourgeoisie of the rings // 0 results
// bourgeois of the rings // 0 results
// comrade of the rings // 

///////////////////////////

// kill goblin
// loot goblin
// "look at" goblin
///////////////////////////

/*
you encountereth ye olde parish of st. dennis. it has a cemetary and it is constructed in the gothic architectural style. 
the cleric inside "what is your name" <choose character name (and eventually race and class)>
// paladin or mage and one emphasizes strength/speed while other emphasizes magic/wisdom
"we have been expecting you. it is dangerous to go alone. take this" // gives characer the CATHERINE SWORD
"for generations the clerics of this parish have been entrusted to safeguard the CATHERINE SWORD 
until the day the propheseid hero <NAME> would arrive."
"for it is written, only <NAME> can defeat ROBESPIERRE and rescue the PRINCESS"
"take now whatever thou may find in these treasure chests to aid thee in thy quest"
"return to the parish for a rest if thou are wounded in battle. sleep heals all."
explain what to buy in the city

"of gold thou has gained 120 GP"
"fortune smiles upon thee <NAME>, thou hast found the <OBJECT>"

in the city:
* peasant: this is lumeria, the city of lights
* peasant: please! save the princess!
* aristocratic girl: i am arylon! the dancer!
* cleric: st. joan left the CATHERINE SWORD at the parish for safekeeping 360 years ago, before she was captured by the orcs.
* guard: the king was sure that one day the HERO <name> will come to save the princess, just as in st. joan's prophecy
* guard: the king was looking for <name> you do not happen to be them do you?
* guard: robespierre used to be a good wizard, until...






guards 
*/

// define all the objects
var gordon = new Player(100,0);
var map = new Room(1,0);
var tempMap = new Room(0,0);
var firstScreen = true;
var firstMonster = true;
var tempPlayer = new Player(100,0);
var myWorld = new World();
var tempItems = [];
var m = null;
var w = new Item("null",0,0,0);

gordon.setX(map.getX());
gordon.setY(map.getY());

// set view elements to local variables
var output = document.getElementById("container");  // Get the content of the container element 
var answer = document.getElementById("answer"); // Get the answer field

//output.innerHTML = "1000 YEAR KINGDOM<br>(c) 2018 ZacFinger.com<br>v0.0.1.81<br><br>";

//set up view
answer.focus(); // autofocus on input field
document.getElementById("answer") // answer field now allows enter key as input
    .addEventListener("keyup", function(event) { // this simulates old school CLI
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("enter").click();
    }
});

// used globally
// may not be best practice to declare in main.js
// still learning about global vars in raw JS
function isVowel(x) {

  var result;

  result = x == "A" || x == "E" || x == "I" || x == "O" || x == "U";
  return result;
}

function printSpace(num){
	// returns num amount of non breaking space characters for 
	// building tables and other blocks requiring legibility
	var str = "";

	for(var x=0;x<num;x++){
		str+= "&nbsp;"
	}

	return str;
}

function help(){
	/* Task: Provide game information
	to user, including game description
	and a list of commands.
	In: Nothing. Out: Nothing. */

	/*
	output.innerHTML += "<br>F I N A L R E A L I T Y<br>";
	output.innerHTML += "= = = = = = = = = = = =<br><br>";*/

	// display the story
	output.innerHTML = "STORY SO FAR<br>";
	output.innerHTML += "===== == ===<br>";
	output.innerHTML += "Long ago in the Sixth Age of the World...<br>"+
	/*"Surrounded by mountains and forests...<br>"+*/
	"A long peace has ended...<br><br>"+

	"A mysterious wizard known as ROBESPIERRE used<br>" +
	"evil magic in hopes to rule the kingdom...<br><br>"+

	"He eliminated the good king and has imprisoned the<br>" +
	"beautiful PRINCESS MARIE ANTOINETTE in the royal castle.<br><br>"+ 

	"The people wait, their only hope, a prophecy...<br><br>" +

	"When the kingdom is in darkness, a HERO will come...<br>" +
	"Bearing the CATHERINE SWORD...<br><br>";

	// display the commands
	output.innerHTML += "COMMAND LIST<br>" + "======= ====<br>"
	+ "All commands in 1000 YEAR KINGDOM must be entered in verb-noun pairs.<br><br>"
	+ "Verb" + printSpace(13) + "Noun" + printSpace(15) + ": Function<br>"
	+ "----------------" + printSpace(1) + "------------------" + printSpace(3) + "--------<br>"
	+ "help" + printSpace(13) + "me" + printSpace(17) + ": Accesses this list at any time during gameplay.<br>"
	+ "scan" + printSpace(13) + "environs" + printSpace(11) + ": Examine current location.<br>"
	+ "go " + printSpace(14) + "(north/south)" + printSpace(6) + ": Translates character in desired direction.<br>"
	+ "taketh" + printSpace(11) + "(name of weapon)" + printSpace(3) 
	+ ": Allows user to add a weapon encountered in a room<br>"
	+ "" + printSpace(38) + "to their inventory.<br>" + "scan" + printSpace(13) 
	+ "(name of monster)" + printSpace(2) + ": Allows user to examine monster.<br>"
	+ "(name of weapon) (name of object)" + printSpace(3) + ": Uses desired weapon against desired object.<br>"
	+ printSpace(38) + "* Example: 'sword vine' allows user to<br>"
	+ printSpace(40) + "use the SWORD to cut a stubborn VINE.<br>"
	+ "(name of weapon) (name of enemy)" + printSpace(4) + ": Uses desired weapon against desired enemy.<br>"
	+ printSpace(38) + "* Example: 'dagger imp' allows the user<br>"
	+ printSpace(40) + "to use the DAGGER against an IMP.<br>"
	+ printSpace(38) + "* Example: 'sword goblin' allows the user<br>"
	+ printSpace(40) + "to lance a GOBLIN with the SWORD.<br>"
	+ "eval" + printSpace(13) + "stats" + printSpace(14) 
	+ ": Allows user to check health, armor and inventory.<br><br>"

	// unsure whether to put story before or after command list in help menu
	
}

// called when a user enters any room
// or when loading up the most recent save point
function setUpMap(room){
	// Sets up temporary save of game. (*)
	tempPlayer.setPlayer(gordon);
	tempMap.setRoom(room);

	// describe the room
	output.innerHTML += room.describeRoom() + "<br>" // Provides verbal description of entering current room.
	output.innerHTML += room.getDescription2() + "<br>"; // Provides verbal description of current room.

	if(room.getArmor() > 0) // If there are armor boosts inside the room
	{   					// Player armor is increased.
		output.innerHTML += "Thou encounterest ye olde GREENE ARMOUR. Thou gain " + map.getArmor() + " armor points.<br>";
		gordon.increaseArmor(map.getArmor());
		map.setArmor(0);
	}

	m = null;

	if(room.getMonster() != null){ 		// If monsters are extant
										// but not necessarily alive
		
		if(firstScreen){ // hard coded, this is probably bad
			output.innerHTML += "Thou haveth upon yeself only thy DAGGER.<br>"+
			"Verily something approaches from yonder umbrage!<br>";
		}

		m = new Monster(3); // test monster "Hello world"
		m.setMonster(room.getMonster()); 
		
		if(room.getMonsterAmount() > 0){ 	// If monsters are extant
			output.innerHTML += "A";		// and also alive
			if(isVowel(m.getName().charAt(0)))
				output.innerHTML += "n"
			output.innerHTML += (" " + m.getName() + " standeths before ye.<br>"); // Player is reminded that this is so.
			
		}
	}

	if(room.getObjectCount() > 0) // If objects are still extant
	{
		for(var x=0;x<room.getObjectCount();x++){
			// Player is reminded as such.
			output.innerHTML += "Thou encounterest ye olde ";
			tempItems[x] = new Item("null",0,0,0);
			tempItems[x].setItem(room.getItemAt(x));
			
			output.innerHTML += tempItems[x].getName();
			output.innerHTML += ".<br>";
		}
		// this will work but its probably a good idea to set this to an array once
		// that is, when they enter the room for the first time set array tempItems
		// not every single time the room is described etc
	}

	if(firstScreen == true){
		output.innerHTML += "Type HELP for a list of commands.<br>";
		firstScreen = false;
	}

	output.innerHTML += "What dost thou do?<br><br>"; // THE prompt
	$(window).scrollTop() + $(window).height();

}

// called when a user enters any command
function yourMove(){
	/* Description: Inflicts various 
	actions upon the room, the things
	within it, or to the player.
	*/

	// set to false if any of the entered commands succeed
	// if still true at the end of yourMove(), error is printed
	var badCommand = true;

	// get the answer first
	var option = answer.value;

	// and reset the input field to blank
	document.getElementById("answer").value = "";
	
	// display the answer before reprinting 
	// screen for that cool CLI effect
	output.innerHTML += ">"+option+"<br>";

	// assumes the response is in two word format
	var verb = "";
	var noun = "";

	// get first two words in the response
	var words = option.split(" ");
	verb = words[0].toUpperCase();
	if(words[1] != null)
		noun = words[1].toUpperCase();

	// interpret the answer
	// checks if first word is an object in the inventory
	if( (gordon.hasVerb(verb) != -1) || (verb == "USE" && gordon.hasVerb(noun) != -1)) 	
	// If verb inflicted was an object
	// found in the user's inventory
	{
		if(verb == "USE" && gordon.hasVerb(noun) != -1){
			verb = noun; // not sure this is a good idea
			noun = "";
		}

		if(gordon.getWeapon(gordon.hasVerb(verb)).isItemWeapon())
			w = new Weapon(3);
		else
			w = new Item("null",0,0,0);
		// not sure this is the best 
		// thing to do considering weapon 
		// extends item but it works

		w.setItem(gordon.getWeapon(gordon.hasVerb(verb)));

		/*___________________________________________________________________________________________________
		|              |                          |                             |                            |
		|              |        imp is null       |  imp is !null and is alive  |  imp is !null and is dead  |
		|______________|__________________________|_____________________________|____________________________|
		|              |                          |                             |                            |
		|  dagger imp  | "Dagger at what" message | Imp is attacked with dagger |  Imp already dead message  |
		|______________|__________________________|_____________________________|____________________________|
		|              |                          |                             |                            |
		|  dagger      | "Dagger at what" message | Imp is attacked with dagger |  "Dagger at what" message  |
		|______________|__________________________|_____________________________|____________________________|
		|              |                          |                             |                            |
		|  potion      | Potion applied to player |   Potion applied to player  |  Potion applied to player  |
		|______________|__________________________|_____________________________|____________________________|
		|              |                          |                             |                            |
		|  potion imp  | "Potion at what" message |    Potion applied to imp    |  Imp already dead message  |
		|______________|__________________________|_____________________________|___________________________*/

		// Above: Expected behavior when testing for edge cases

		// below: bunch of booleans for the gauntlet of if-statements
		// every possible scenario to be accounted for

		var impNull = (m == null); // if monster is not null
		var nounIsMonsterName = false;

		if(!impNull)
			nounIsMonsterName = (noun == m.getName());

		var impNotNullAndIsAlive = (m != null && map.getMonsterAmount() >= 1);
		var impNotNullAndIsDead = (m != null && map.getMonsterAmount() < 1);
		var verbIsWeapon = w.isItemWeapon(); // if verb is a weapon (not a regular item)
		var nounIsEmptyOrIsMonsterName = (noun == "" || nounIsMonsterName);

		if((impNotNullAndIsAlive && verbIsWeapon && nounIsEmptyOrIsMonsterName)) {
			// If monsters are still extant
			// and noun is empty or
			// if noun is monster the user 
			// wishes to attack with noun
				
			// Takes damage
			output.innerHTML += w.attackString() + "<br>";
			m.getHurt(w.getDamage());
			output.innerHTML += "The " + m.getName() + " takes " + w.getDamage() + " damage.<br>";
			//map.setMonster(m); // Returns enemy to map

			if(m.getHealth() <= 0) // If monster == teh deadz0r
			{
				output.innerHTML += "The " + m.getName() + " is vanquished.<br>";

				if(firstMonster)
					output.innerHTML += " What happenseth when thou shalt LOOKE at it?<br>";

				map.destroyAllMonsters(); // Set monstercount to zero.
			}
			
			badCommand = false;
		}

		else if(impNotNullAndIsDead && nounIsMonsterName){ 
			// If monster is dead but the user insists on using verb on it
			output.innerHTML += "Verily! Ye olde " + m.getName() + " already lieseth lifeless before ye.<br>";
			if(firstMonster){
				output.innerHTML += " Mighteth you wanteth to ye olde LOOT it of its belongings?<br>";
				firstMonster = false;
			}
			badCommand = false;
		}

		else if( (!verbIsWeapon && !nounIsEmptyOrIsMonsterName) ||
			(verbIsWeapon && ((impNull) || 
			(!nounIsEmptyOrIsMonsterName) || 
			(noun == "" && impNotNullAndIsDead))
			)) {
			// noun is empty and no monsters afoot
			// or noun not found in map
			output.innerHTML += "Thou useth the " + w.getName() + " on which thing?<br>";
			badCommand = false;
		}

		else if(!verbIsWeapon && noun == "") {
			// use non weapon items
			// still need to figure out best
			// implementation for this part

			output.innerHTML += w.healString();
			// prints message such as 'thou drinkesteth ye olde potion'
			// // also includes string such as thou gainseth 10 hp or mp accordingly

			gordon.useItem(gordon.hasVerb(verb)); 
			// modify stats and remove item from gordon's inventory

			badCommand = false;
		}

		else if(!verbIsWeapon && (nounIsMonsterName && impNotNullAndIsAlive)){
			// use non weapon items on monsters
			// still need to figure out this part too
			output.innerHTML += m.useItem(w);
			gordon.removeItem(gordon.hasVerb(verb));
			badCommand = false;
		}

		if(!impNull)
			map.setMonster(m); // Returns enemy to map
	
	}

	// <Go>	

	else if(verb == "GO") // If user wishes to go...
	{	
		if(noun == "WEST" || noun == "EAST"){
			output.innerHTML += "Thou canneth notst goeth in yonder direction...YET.<br>";
			// ...they will find that quite difficult.

			badCommand = false;
		}

		if(noun == "NORTH") // backward...
		{
			gordon.goNorth();
			myWorld.setRoom(map);

			badCommand = false;
		}

		if(noun == "SOUTH") // If user wishes to go forward...
		{
			if(map.getObstructCount() == 0){ 	// and there are no obstructions...
				gordon.goSouth(); 	// they will do so.
				myWorld.setRoom(map);

			}
			else // If there are obstructions...
			{
				output.innerHTML += map.describeObstruction() + "<br>";
				// These obstructions are described...
				if(map.getDamage() > 0)				  // If the obstructions are 
					gordon.getHurt(map.getDamage());  // dangerous (such as a cliff) 
													  // the damage is inflicted.

			}

			badCommand = false;
		}
	}

	else if(map.getObstructCount() > 0 && verb == map.getVerb() && noun == map.getNoun()){ 
	// If there are obstructions and the user applies the right verb...
			gordon.goSouth(); // They pass the current room.
			myWorld.setRoom(map);
			badCommand = false;
	}

	// </Go>

	// Allows user to examine environment.

	else if(verb == "SCAN" || verb == "LOOK" || verb == "LOOKE"){
		if(noun == "AROUND" || noun == "ENVIRONS" || noun == "ROOM" || noun == ""){
			output.innerHTML += map.getDescription2() + "<br>"; // Describes current room at the user's request.

			// monster description should probably be a function
			if(map.getMonsterAmount() > 0){  // If there are monsters, the user is reminded.
				//m = map.getMonster(); 
				output.innerHTML += "A";
				if(isVowel(m.getName().charAt(0)))
					output.innerHTML += "n"
				output.innerHTML += (" " + m.getName() + " standeths before ye.<br>");
			}
			
			if(map.getObjectCount() > 0) // If there are items, the user is reminded.
			{
				for(var x=0;x<map.getObjectCount();x++){
					output.innerHTML += "Thou encounterest ye olde ";
					tempItems[x] = new Item("null",0,0,0);
					tempItems[x].setItem(map.getItemAt(x));
					
					output.innerHTML += tempItems[x].getName();
					output.innerHTML += ".<br>";
				}
			}

			// above two if blocks should probably be a room function
			// considering they are also called in setupMap()

			badCommand = false;
		}

		// TODO: refactor code so that map.getMonsterAmount >= 1 && monster.getHealth() <= 0 is equivalent to a dead monster
		// map.getMonsterAmount == 0 && monster.getHealth of any value would be an empty room, not a room with a dead monster
		if(/*map.getMonsterAmount() > 0*/ map.getMonster() != null && noun == m.getName()) // If user looks at a monster
		{
			output.innerHTML += m.describeMonster() + "<br>";  // The monster is described

			if(firstMonster && m.getHealth() <= 0){
				output.innerHTML += " Mighteth you wanteth to ye olde LOOT it of its belongings?<br>";
				firstMonster = false;
			}

			badCommand = false;
		}
	}

	// Allows user to take items from room.
	else if((map.getObjectCount() > 0) && (verb == "TAKETH" || verb == "TAKE"
		|| verb == "GET") && (map.isObjectThere(noun) != -1 )	) {

		var indexOf = map.isObjectThere(noun);

		output.innerHTML += "Thou takest ye olde " + noun.toUpperCase() + ".<br>";
		gordon.receiveItem(map.getItemAt(indexOf)); // Adds item to inventory and
		map.removeItemAt(indexOf);					// detracts item from map.
		badCommand = false;

	}

	// Shows stats
	else if((verb == "EVAL" || verb == "CHECK") &&
		(noun == "STATISTICS" || noun == "STATS" || noun == "")){
		output.innerHTML += gordon.printStatus();
		badCommand = false;
	}

	// Shows help screen with list of commands
	else if(verb == "HELP"){
		help();
		badCommand = false;
	}

	else if(verb == "KILL" && (noun == "SELF" || noun == "YOURSELF")) // only for testing purposes i swear
	{
		gordon.getHurt(200);
		badCommand = false;
	}

	// If bad command or object

	if(badCommand) {
		output.innerHTML += "Something command error happens. Error ";

		if(Math.floor((Math.random() * 100) + 1)>50)
			output.innerHTML += "-";

		output.innerHTML += (Math.floor(Math.random() * Number.MAX_SAFE_INTEGER));
		output.innerHTML += ": Bad command or non-extant object.<br>" + "Type 'help' for help.<br>";
	}

	if(map.getMonsterAmount() > 0){ // If monsters are extant.
			
			output.innerHTML += m.attackString() + "<br>";
			output.innerHTML += "Thou takest " + m.getDamage() + " damage.<br>";
			gordon.getHurt(m.getDamage()); // Monster attacks.
	}

	// End of round

	if(gordon.getHealth() <= 0) // If player == teh deadz 
	{	
			output.innerHTML += "Thy bloody corpse falls lifelessly to ye olde grounde.<br>"; // Inform them
			output.innerHTML += "<br>Loading from most recent saved game...<br><br>";
			
			gordon.setPlayer(tempPlayer); // Load game from temporary save point at beginning of setUpMap (*)
			map.setRoom(tempMap); // retrieved from the temp map saved upon entry in setUpMap()
			
			setUpMap(map);

	} else if(gordon.getPositionX()!=tempPlayer.getPositionX() ||
		gordon.getPositionY() != tempPlayer.getPositionY()){
		// If user is still alive and has advanced into the next room
		
		// if the user has already been in the room
		if(myWorld.hasRoom(gordon.getPositionX(),gordon.getPositionY())){
			map.setRoom(myWorld.getRoom(gordon.getPositionX(),gordon.getPositionY()));

		}
		else {
			// if not then new room constructor
			map = new Room(gordon.getPositionX(),gordon.getPositionY());
			// should probably be map.setRoom
		}
		
		//update the view
		setUpMap(map);

	} else {
		output.innerHTML += "What dost thou do?<br><br>"; // THE prompt
		$(window).scrollTop() + $(window).height();
	}

}

// set up new game
setUpMap(map);
