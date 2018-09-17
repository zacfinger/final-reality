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
	output.innerHTML += room.description;
	output.innerHTML += "\n"+"What dost thou do?"; // THE prompt
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
		output.innerHTML += ("\n"+map.description2);

	}
	else{
		output.innerHTML += "\n"+"Why didst thou not open the door?";
	}
	//update the view
	//do something to map before end of yourMove()
	setUpMap(map);
}


