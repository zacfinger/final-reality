class World {

// World class contains an array of Rooms

	constructor(){
		//this.amountOfRoomsX = 0;
		this.rooms = [[],[],[]];
		//this.rooms[0] = [];
		//this.rooms[1] = [];
		//this.rooms[0][0] = new Room(0,0);
		//this.rooms[1][0] = new Room(0,0);
		//this.rooms[-1][0] = new Room(-1,0);

	}

	hasRoom(x,y){
		return (this.rooms[x][y] != null);
	}

	setRoom(map){
		/*
		need to be able to send in X and Y coordinates
		*/
		if(this.rooms[map.getX()] == null || this.rooms[map.getX()][map.getY()] == null)
			this.rooms[map.getX()][map.getY()] = new Room(0,0)
		this.rooms[map.getX()][map.getY()].setRoom(map);
	}

	getRoom(x,y){
		return this.rooms[x][y];
	}
}