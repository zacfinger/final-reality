class World {

// World class contains an array of Rooms

	constructor(){
		this.amountOfRooms = 0;
		this.rooms = [];
		this.rooms[this.amountOfRooms] = new Room(0);
	}

	setRoom(map){
		this.rooms[this.amountOfRooms].setRoom(map);
		this.amountOfRooms++;
	}
}