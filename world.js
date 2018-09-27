class World {

// World class contains an array of Rooms

	constructor(){
		//this.amountOfRoomsX = 0;
		this.rooms = [];
		this.rooms[0] = [];
		this.rooms[1] = [];
		this.rooms[0][0] = new Room(0,0);
		this.rooms[1][0] = new Room(0,0);
		//this.rooms[-1][0] = new Room(-1,0);
		//console.log("this broke");

	}

	setRoom(map){
		/*
		need to be able to send in X and Y coordinates
		*/
		console.log(map);
		this.rooms[map.getX()][map.getY()].setRoom(map);
	}
}