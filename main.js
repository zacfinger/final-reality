// define all the objects
const gordon = new Player();
const map = new Room();
var m = new Monster(0);
var firstScreen = true;

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

	// describe the room
	output.innerHTML += room.describeRoom();
	output.innerHTML += "<br>";
	output.innerHTML += room.getDescription2();
	output.innerHTML += "<br>";

	if(room.getMonsterAmount() > 0){ // If monsters are extant
		m = room.getMonster(); 	// Temporary monster retrieved from room.
						   		// Temporary monster for battling, looking.
		output.innerHTML += "A";
		if((m.getName()).charAt(0) == "I")
			output.innerHTML += "n"
		output.innerHTML += (" " + m.getName() + " standeths before ye.<br>"); // Player is reminded that this is so.
	}

	if(firstScreen == true){
		output.innerHTML += "<br>Type HELP for a list of commands.<br>";
		firstScreen = false;
	}

	output.innerHTML += "What dost thou do?"; // THE prompt
	$(window).scrollTop() + $(window).height();
}

function yourMove(){
	var option = answer.value;
	// get the answer first
	document.getElementById("answer").value = "";
	// and reset the input field to blank
	output.innerHTML += "<br>>"+option+"<br>";

	var temp = "";  // Multi-purpose emporary number value
	
	var m = new Monster(0); 
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
	temp = isVerbWeapon(verb);
	if(temp != -1)  // If verb inflicted was an object found
	{				// in the user's inventory
		w = gordon.getWeapon(temp);

		if(map.getMonsterAmount() > 0){
			m = map.getMonster();
		
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

	// <Go>	

	// figure this out later
	/*if(option == "open door"){
		output.innerHTML += "<br>";
		output.innerHTML += (map.description2);

	}
	else{
		output.innerHTML += "<br>";
		output.innerHTML += "Why didst thou not open the door?";
	}*/

	// </Go>

	// Allows user to examine environment.

	// Allows user to take objects from room.

	// Shows stats

	// Saves Game

	// Shows help screen with list of commands
	if(verb == "help")
		help();

	// If bad command or object

	//update the view
	//do something to map before end of yourMove()
	setUpMap(map);
}

// set up new game
setUpMap(map);
