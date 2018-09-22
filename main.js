//chairman of the rings
//premier of the rings
//president of the rings
//citizen of the rings
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
	"A long peace has ended...<br><br>An evil wizard known as ROBESPIERRE has seized the legendary GOLDEN LANCE " +
	"in hopes to rule the kingdom... He eliminated the good king He has kidnapped Princess MARIE ANTOINETTE and she is imprisoned in his evil castle, the ROOM OF MACHINES. " + 
	" The people wait, their only hope, a prophecy..." +
	"<br><br>When the kingdom is in darkness, a hero will come...<br><br>";

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
		output.innerHTML += "<br>Type HELP for a list of commands.<br>";
		firstScreen = false;
	}

	output.innerHTML += "What dost thou do?"; // THE prompt
	$(window).scrollTop() + $(window).height();
}

function yourMove(){
	var option = answer.value;
	console.log(option);
	// get the answer first
	document.getElementById("answer").value = "";
	// and reset the input field to blank
	output.innerHTML += "<br>>"+option+"<br>";

	var temp = "";  // Multi-purpose temporary number value
	
	var m = new Monster(0); // Temporary monster retrieved from room.
							// Temporary monster for battling, looking.

	var w = new Weapon(0);

	// assumes the response is in two word format
	var verb = "";
	var noun = "";

	// get first two words in the response
	var words = option.split(" ");
	verb = words[0];
	noun = words[1];

	console.log(verb+" .. ");

	// interpret the answer
	if(map.getMonsterAmount() > 0){
		m = map.getMonster();
	// checks if first word is an object in the inventory
	temp = isVerbWeapon(verb);
	if(temp != -1)  // If verb inflicted was an object found
	{				// in the user's inventory
		w = gordon.getWeapon(temp);
		
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

			}
		}
	}

	console.log(verb+" ... ");

	// <Go>	

	if(verb == "go") // If user wishes to go...
	{	console.log(verb);
		if(noun == "backward" || noun == "back") // backward...
		{
			output.innerHTML += "Thou canneth notst goeth in yonder direction.<br>";
			// ...they will find that quite difficult.
		}

		if(noun == "forward") // If user wishes to go forward...
		{
			if(map.getObstructCount() == 0){ 	// and there are no obstructions...
				gordon.incrementPosition(); 	// they will do so.
				map = new Room(gordon.getPosition());
			}
			else // If there are obstructions...
			{
				output.innerHTML += map.describeObstruction() + "<br>";
				// These obstructions are described...
				if(map.getDamage() > 0)				  // If the obstructions are 
					gordon.getHurt(map.getDamage());  // dangerous (such as a cliff) 
													  // the damage is inflicted.
			}
		}
	}

	if(map.getObstructCount() > 0){ // If there are obstructions...
		if(verb == map.getVerb() && noun == map.getNoun()){ // And the user applies the right verb...
			gordon.incrementPosition(); // They pass the current room.
			map = new Room(gordon.getPosition());
		}
	}

	// </Go>

	// Allows user to examine environment.

	// Allows user to take objects from room.

	// Shows stats

	// Saves Game

	// Shows help screen with list of commands
	if(verb == "help")
		help();

	// If bad command or object

	if(map.getMonsterAmount() > 0){ // If monsters are extant.
		output.innerHTML += m.attackString();
		output.innerHTML += "<br>Thou takest " + m.getDamage() + " damage.";
		gordon.getHurt(m.getDamage()); // Temporary monster attacks.
	}

	// End of round

	if(gordon.getHealth() <= 0) // If player == teh deadz 
	{	
		output.innerHTML += "Thy corpse falls lifelessly to ye olde floor.<br>"; // Inform them
		
		gordon.setPlayer(tempPlayer); // Load game from temporary save point at beginning of setUpMap (*)

		map = new Room(gordon.getPosition());
	}

	console.log(verb + " end of function");

	//update the view
	setUpMap(map);
}

// set up new game
setUpMap(map);
