// define all the objects
const gordon = new Player();
const map = new Room();

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

// set up any map
function setUpMap(room){

	m = room.getMonster(); // Temporary monster retrieved from room.

	// describe the room
	output.innerHTML += room.describeRoom();
	output.innerHTML += "<br>";
	output.innerHTML += room.getDescription2();
	output.innerHTML += "<br>";

	if(room.getMonsterAmount() > 0) // If monsters are extant
		output.innerHTML += "A"
		if((m.getName()).charAt(0) == "I")
			output.innerHTML += "n"

		output.innerHTML += (" " + m.getName() + " standeths before ye."); // Player is reminded that this is so.

	output.innerHTML += "<br>" + "What dost thou do?"; // THE prompt
}

///////

// set up new game
setUpMap(map);

function yourMove(){
	var option = answer.value;
	// get the answer first
	document.getElementById("answer").value = "";
	// and reset the input field to blank

	// interpret the answer
	// figure this out later
	if(option == "open door"){
		output.innerHTML += "<br>";
		output.innerHTML += (map.description2);

	}
	else{
		output.innerHTML += "<br>";
		output.innerHTML += "Why didst thou not open the door?";
	}
	//update the view
	//do something to map before end of yourMove()
	setUpMap(map);
}


