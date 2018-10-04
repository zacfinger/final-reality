// 1000 YEAR KINGDOM command line javascript game
//
// (c) 2018 ZacFinger.com
// v0.0.1.810.03

// things left to do:
// ------ ---- -- ---
// update rooms so that obstructions have directionality
//
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
// // make monsters have gold and items
// // user can use word "loot" to loot monster
// // user has to use word "take potion" to get potion/armor
// // user uses word "kill" to use currently equipped item

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
var tempPlayer = new Player(100,0);
var myWorld = new World();
var tempItems = [];

gordon.setX(map.getX());
gordon.setY(map.getY());
//tempPlayer.setX(map.getX());
//tempPlayer.setY(map.getY());

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

function isVowel(x) {

  var result;

  result = x == "A" || x == "E" || x == "I" || x == "O" || x == "U";
  return result;
}

function isVerbWeapon(word){ 	// Checks to see if verb issued is a weapon in inventory.
	for(var x=0; x < gordon.getWeaponAmount(); x++ ) // Cycles through inventory to check
	{
		w = gordon.getWeapon(x);

		if(word == w.getName())
			return x; // returns index of requested weapon
	}
	return -1; // returns -1 if weapon is not found in the inventory.
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
	+ "Verb" + printSpace(13) + "- Noun" + printSpace(15) + ": Function<br>"
	+ "----------------" + printSpace(3) + "------------------" + printSpace(3) + "--------<br>"
	+ "help" + printSpace(13) + "- me" + printSpace(17) + ": Accesses this list at any time during gameplay.<br>"
	+ "scan" + printSpace(13) + "- environs" + printSpace(11) + ": Examine current location.<br>"
	+ "go " + printSpace(14) + "- (north/south)" + printSpace(6) + ": Translates character in desired direction.<br>"
	+ "taketh" + printSpace(11) + "- (name of weapon)" + printSpace(3) 
	+ ": Allows user to add a weapon encountered in a room<br>"
	+ "" + printSpace(40) + "to their inventory.<br>" + "scan" + printSpace(13) 
	+ "- (name of monster)" + printSpace(2) + ": Allows user to examine monster.<br>"
	+ "(name of weapon) - (name of object)" + printSpace(3) + ": Uses desired weapon against desired object.<br>"
	+ printSpace(40) + "* Example: 'sword vine' allows user to<br>"
	+ printSpace(42) + "use the SWORD to cut a stubborn VINE.<br>"
	+ "(name of weapon) - (name of enemy)" + printSpace(4) + ": Uses desired weapon against desired enemy.<br>"
	+ printSpace(40) + "* Example: 'dagger imp' allows the user<br>"
	+ printSpace(42) + "to use the DAGGER against an IMP.<br>"
	+ printSpace(40) + "* Example: 'sword goblin' allows the user<br>"
	+ printSpace(42) + "to lance a GOBLIN with the SWORD.<br>"
	+ "eval" + printSpace(13) + "- stats" + printSpace(14) 
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

			// this will work but its probably a good idea to set this to an array once
			// that is, when they enter the room for the first time set array tempItems
			// not every single time the room is described etc
	if(room.getItemAmount() > 0) // If there are items inside the room
	{
		for(var x=0;x<room.getItemAmount();x++){
			output.innerHTML += "Thou encounterest ye olde ";
			tempItems[x] = new Item("null",0,0,0);
			tempItems[x].setItem(room.getItemAt(x));
			
			output.innerHTML += tempItems[x].getName();
			output.innerHTML += ".<br>";
		}

		//POTION. Thou gain " + map.getHealth() + " HP.<br>";
		//gordon.increaseHealth(map.getHealth());
		//map.setHealth(0);		// Map health set to zero
	}

	if(room.getArmor() > 0) // If there are armor boosts inside the room
	{   					// Player armor is increased.
		output.innerHTML += "Thou encounterest ye olde GREENE ARMOUR. Thou gain " + map.getArmor() + " armor points.<br>";
		gordon.increaseArmor(map.getArmor());
		map.setArmor(0);
	}

	if(room.getMonsterAmount() > 0){ // If monsters are extant

		if(firstScreen){ // hard coded, this is probably bad
			output.innerHTML += "Thou haveth upon yeself only thy DAGGER.<br>"+
			"Verily something approaches from yonder umbrage!<br>";
		}

		m = room.getMonster(); 
		
		output.innerHTML += "A";
		if(isVowel(m.getName().charAt(0)))
			output.innerHTML += "n"
		output.innerHTML += (" " + m.getName() + " standeths before ye.<br>"); // Player is reminded that this is so.
	}

	if(room.getObjectCount() > 0) // If objects are still extant
		output.innerHTML += room.getObjectDescription() + "<br>";  // Player is reminded as such.

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
	if(isVerbWeapon(verb) != -1)  // If verb inflicted was an object found
	{							  // in the user's inventory
		w = gordon.getWeapon(isVerbWeapon(verb));
		
		if(noun == m.getName()) // If noun is monster the user 
		{						// wishes to attack with noun			
			// Takes damage
			output.innerHTML += w.attackString() + "<br>";
			m.getHurt(w.getDamage());
			output.innerHTML += "The " + m.getName() + " takes " + w.getDamage() + " damage.<br>";
			map.setMonster(m); // Returns enemy to map

			if(m.getHealth() <= 0) // If monster == teh deadz0r
			{
					output.innerHTML += "The " + m.getName() + " is vanquished.<br>";
					map.destroyAllMonsters(); // Set monstercount to zero.
			}

			badCommand = false;

		}
	}

	// <Go>	

	else if(verb == "GO") // If user wishes to go...
	{	
		if(noun == "WEST" || noun == "EAST"){
			output.innerHTML += "Thou canneth notst goeth in yonder direction.<br>";
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

	else if(verb == "SCAN" || verb == "LOOK"){
		if(noun == "AROUND" || noun == "ENVIRONS" || noun == "ROOM" || noun == ""){
			output.innerHTML += map.getDescription2() + "<br>"; // Describes current room at the user's request.

			// monster description should probably be a function
			if(map.getMonsterAmount() > 0){  // If there are monsters, the user is reminded.
				m = map.getMonster(); 
				output.innerHTML += "A";
				if(isVowel(m.getName().charAt(0)))
					output.innerHTML += "n"
				output.innerHTML += (" " + m.getName() + " standeths before ye.<br>");
			}

			if(map.getObjectCount() > 0){ // If there are items, the user is reminded.
				output.innerHTML += map.getObjectDescription() + "<br>";
			}

			badCommand = false;
		}

		if(map.getMonsterAmount() > 0 && noun == m.getName()) // If user looks at a monster
		{
			output.innerHTML += m.getDescription() + "<br>";  // The monster is described
			badCommand = false;
		}
	}

	// Allows user to take weapons from room.
	else if((map.getObjectCount() > 0) && (verb == "TAKETH" || verb == "TAKE"
		|| verb == "GET") &&
		(noun == map.getObjectName() ) ) {
			output.innerHTML += "Thou takest ye olde " + map.getObjectName() + ".<br>";
			gordon.receiveWeapon(map.getObject()); 	// Adds item to inventory and
			badCommand = false;						// detracts item from map.
		}

	else if((map.getItemAmount() > 0) && (verb == "TAKETH" || verb == "TAKE"
		|| verb == "GET") && (map.isObjectThere(noun) != -1 )	) {

		var indexOf = map.isObjectThere(noun);

		gordon.receiveItem(map.getItemAt(indexOf));
		output.innerHTML += "Thou takest ye olde " + noun.toUpperCase() + ".<br>";
		map.removeItemAt(indexOf);
		badCommand = false;
		
		// have to set it so that item is removed

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
