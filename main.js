//chairman of the rings // 2 results
//premier of the rings // 0 results
//president of the rings
//citizen of the rings // 1 result
//legend of marie
//final reality
//peasant of the rings
//bourgois of the rings

// define all the objects
var gordon = new Player(100,0);
var map = new Room(0);
var m = new Monster(0);
var firstScreen = true;
var tempPlayer = new Player(100,0);

// set view elements to local variables
var output = document.getElementById("container");  // Get the content of the container element 
var answer = document.getElementById("answer"); // Get the answer field

//set up view
answer.focus(); // autofocus on input field
document.getElementById("answer") // answer field now allows enter key as input
    .addEventListener("keyup", function(event) {
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

function isVerbWeapon(word){
	for(var x=0; x < gordon.getWeaponAmount(); x++ )
	{
		w = gordon.getWeapon(x);

		if(word == w.getName())
			return x;
	}
	return -1;
}

function help(){
	/* Task: Provide game information
	to user, including game description
	and a list of commands.
	In: Nothing. Out: Nothing. */

	output.innerHTML += "<br>F I N A L R E A L I T Y<br>";
	output.innerHTML += "= = = = = = = = = = = =<br><br>";

	output.innerHTML += "Long ago in the beautiful kingdom of FRANKIA, surrounded by mountains and forests... " +
	"A long peace has ended...<br><br>An evil wizard known as ROBESPIERRE has summoned Hellspawn " +
	"in hopes to rule the kingdom...<br><br>He eliminated the good king and has imprisoned the beautiful PRINCESS MARIE ANTOINETTE " +
	"in the royal castle.<br><br>"+ 
	" The people wait, their only hope, a prophecy..." +
	"<br><br>When the kingdom is in darkness, a hero will come..." +
	"<br><br>Bearing the GOLDEN LANCE...<br><br>";

	output.innerHTML += "COMMAND LIST<br>";
	output.innerHTML += "All commands in FINAL REALITY must be entered in verb-noun pairs.<br><br>";
	output.innerHTML += "Verb - Noun : Function<br><br>";
	output.innerHTML += "help - me : Accesses this list at any time during gameplay.<br><br>";
	output.innerHTML += "scan - environs : Examine current location.<br><br>";
	output.innerHTML += "go - (Forward/Backward) : Translates character in desired direction.<br><br>";
	output.innerHTML += "taketh - (Name of weapon) - Allows user to add a weapon encountered in a room";
	output.innerHTML += " to their inventory.<br><br>";
	output.innerHTML += " scan - (Name of monster) - Allows user to examine monster.<br><br>";
	
	//unsure if display the story before or after command list

	
}

// set up any map
function setUpMap(room){

	tempPlayer.setPlayer(gordon); // Sets up temporary save of game. (*)
	// this needs to be set when the player enters a room
	// not when setUpMap() is called at the beginning of each round

	// describe the room
	output.innerHTML += room.describeRoom();
	output.innerHTML += room.getDescription2();

	if(room.getHealth() > 0) // If there are potions inside the room
	{						 // Player health is increased.
					output.innerHTML += "Thou encounterest ye olde POTION. Thou gain " + map.getHealth() + " HP.<br>";
					gordon.increaseHealth(map.getHealth());
	}

	if(room.getArmor() > 0) 	// If there are armor boosts inside the room
	{   					// Player armor is increased.
		output.innerHTML += "Thou encounterest ye olde GREENE ARMOUR. Thou gain " + map.getArmor() + " armor points.<br>";
		gordon.increaseArmor(map.getArmor());
	}

	if(gordon.getPosition() == 0 && room.getMonsterAmount() > 0 && firstScreen == true){
	// hard coded, this is probably bad
		output.innerHTML += "<br>Verily something approaches from yonder umbrage! Thou haveth upon yeself only thy DAGGER.";
	}

	if(room.getMonsterAmount() > 0){ // If monsters are extant
		m = room.getMonster(); 
		output.innerHTML += "A";
		if(isVowel(m.getName().charAt(0)))
			output.innerHTML += "n"
		output.innerHTML += (" " + m.getName() + " standeths before ye.<br>"); // Player is reminded that this is so.
	}

	// If objects are still extant
	if(room.getObjectCount() > 0) // If objects are still extant
		output.innerHTML += room.getObjectDescription();

	if(firstScreen == true){
		output.innerHTML += "<br>Type HELP for a list of commands.";
		firstScreen = false;
	}

	output.innerHTML += "<br>What dost thou do?"; // THE prompt
	$(window).scrollTop() + $(window).height();
}

function yourMove(){
	var badCommand = true;

	// get the answer first
	var option = answer.value;

	// and reset the input field to blank
	document.getElementById("answer").value = "";
	
	// display the answer before reprinting 
	// screen for that cool CLI effect
	output.innerHTML += "<br>>"+option+"<br>";

	var temp = "";  // Multi-purpose temporary number value
	
	var w = new Weapon(0);

	// assumes the response is in two word format
	var verb = "";
	var noun = "";

	// get first two words in the response
	var words = option.split(" ");
	verb = words[0];
	noun = words[1];

	// interpret the answer
	// checks if first word is an object in the inventory
	if(isVerbWeapon(verb) != -1)  // If verb inflicted was an object found
	{							  // in the user's inventory
		w = gordon.getWeapon(isVerbWeapon(verb));
		
		if(noun == m.getName()) // If noun is monster the user 
		{						// wishes to attack with noun			
			// Takes damage
			output.innerHTML += w.attackString();
			temp = w.getDamage();
			m.getHurt(temp);
			output.innerHTML += "The " + m.getName() + " takes " + temp + " damage.<br>";
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

	else if(verb == "go") // If user wishes to go...
	{	
		if(noun == "backward" || noun == "back") // backward...
		{
			output.innerHTML += "Thou canneth notst goeth in yonder direction.<br>";
			// ...they will find that quite difficult.

			badCommand = false;
		}

		if(noun == "forward") // If user wishes to go forward...
		{
			if(map.getObstructCount() == 0){ 	// and there are no obstructions...
				gordon.incrementPosition(); 	// they will do so.
				//map = new Room(gordon.getPosition());
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
			gordon.incrementPosition(); // They pass the current room.
			badCommand = false;
	}

	// </Go>

	// Allows user to examine environment.

	else if(verb == "scan" || verb == "look"){
		if(noun == "around" || noun == "environs" || noun == "room"){
			output.innerHTML += map.getDescription2(); // Describes current room at the user's request.

			// monster description should probably be a function
			if(map.getMonsterAmount() > 0){  // If there are monsters, the user is reminded.
				m = map.getMonster(); 
				output.innerHTML += "A";
				if(isVowel(m.getName().charAt(0)))
					output.innerHTML += "n"
				output.innerHTML += (" " + m.getName() + " standeths before ye.<br>"); // Player is reminded that this is so.
			}

			if(map.getObjectCount() > 0){ // If there are items, the user is reminded.
				output.innerHTML += map.getObjectDescription();
			}

			badCommand = false;
		}

		if(map.getMonsterAmount() > 0 && noun == m.getName()) // If user looks at a monster
		{
			output.innerHTML += m.getDescription();
			badCommand = false;
		}
	}

	// Allows user to take objects from room.
	else if((map.getObjectCount() > 0) && (verb == "taketh" || verb == "take"
		|| verb == "get") &&
		(noun == map.getObjectName() ) ) {
			output.innerHTML += "Thou takest ye olde " + map.getObjectName() + ".<br>";
			gordon.receiveWeapon(map.getObject()); // Adds item to inventory.
			badCommand = false;
		}

	// Shows stats
	else if((verb == "eval" || verb == "check") &&
		(noun == "statistics" || noun == "stats")){
		output.innerHTML += gordon.printStatus();
		badCommand = false;
	}

	// Shows help screen with list of commands
	else if(verb == "help"){
		help();
		badCommand = false;
	}

	// If bad command or object

	if(badCommand) {
		output.innerHTML += "Something command error happens. Error ";

		if(Math.floor((Math.random() * 100) + 1)>50)
			output.innerHTML += "-";

		output.innerHTML += (Math.floor(Math.random() * Number.MAX_SAFE_INTEGER) + 1);
		output.innerHTML += ": Bad command or non-extant object.<br>" + "Type 'HELP' for help.<br>";
	}

	// End of round

	if(map.getMonsterAmount() > 0){ // If monsters are extant.
			output.innerHTML += m.attackString();
			output.innerHTML += "<br>Thou takest " + m.getDamage() + " damage.";
			gordon.getHurt(m.getDamage()); // Temporary monster attacks.
	}

	if(gordon.getHealth() <= 0) // If player == teh deadz 
	{	
			output.innerHTML += "Thy bloody corpse falls lifelessly to ye olde floor.<br>"; // Inform them
			output.innerHTML += "Loading from most recent saved game...<br>";
			
			gordon.setPlayer(tempPlayer); // Load game from temporary save point at beginning of setUpMap (*)

			map = new Room(tempPlayer.getPosition());
			setUpMap(map);

	} else if(gordon.getPosition()!=tempPlayer.getPosition()){
			map = new Room(gordon.getPosition());
			//update the view
			setUpMap(map);
	} else {
		output.innerHTML += "<br>What dost thou do?"; // THE prompt
		$(window).scrollTop() + $(window).height();
	}

}

// yourMove() has an if statement at the end that checks: 
// if user is in current room (check against tempplayer position) and is not dead
// monster attacks and the user is prompted again "what dost thou do"
// else if gordon is dead set up map with saved value
// else if gordon is not dead and position is advanced set up map with next map

// set up new game
setUpMap(map);
console.log("This should only trigger once");
