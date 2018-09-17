class Room {

	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     * 
     * Room class
     *
     * * * * * * * * 
     *
     * Parameters:
     *
     * @param type 		// 1: dagger
	 *					// 2: club
	 *					// 3: sword
	 *					// 4: pistol
     * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

     // notes: http://www2.silverblade.net/cliches/

	constructor (num){ // Map 0 of new game
		this.weapon = new Weapon(0);
	
		this.description = "Thou findeth yeself in the woods. Thou only haveth upon yeself thy DAGGER. ";
		this.description2 = "In the distance is a great castle. Verily an IMP approaches from yonder umbrage!";
		this.monsteramount = 1;
		this.weaponamount = 0;
		this.obstructioncount = 1;
		this.obstructionname = "door";
		this.obstructionverb = "open";
		this.obstructiondescription = "There is a DOOR blocking thy path.";
		this.obstructiondamage = 0;
		this.m = new Monster(0);
	}

	describeRoom(){
		return this.description;
	}

	getDescription2(){
		return this.description2
	}

	getMonsterAmount(){
		return this.monsteramount;
	}

	getMonster(){
		return this.m;
	}
}