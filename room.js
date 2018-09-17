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

	constructor (num){ // Map 0 of new game
		this.weapon = new Weapon(0);
	
		this.description = "Thou art Dr. Gordon Freeman (PhD). The test went horribly awry. ";
		this.description2 = "The laboratory is ruined. Behind thou is ye olde test chamber. Before thou is a DOOR. ";
		this.monsteramount = 0;
		this.weaponamount = 0;
		this.obstructioncount = 1;
		this.obstructionname = "door";
		this.obstructionverb = "open";
		this.obstructiondescription = "There is a DOOR blocking thy path.";
		this.obstructiondamage = 0;
	}
}