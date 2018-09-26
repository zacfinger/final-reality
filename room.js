class Room {

	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     * 
     * Room class
     * (C) 2018 ZacFinger.com
     * https://github.com/zacfinger/final-reality
     *
     * * * * * * * * 
     *
     * Parameters:
     *
     * @param weapon 	weapon 					Weapon within room.
     * @param string 	description 			Initial description of room.
     * @param string 	description2 			Secondary description of room.
     * @param number 	monsteramount 			Count of monsters ( 0 or 1 for now )
     * @param number 	getWeaponAmount			Count of weapons ( 0 of 1 for now )
     * @param number 	obstructioncount		Count of obstructions in room ( 0 or 1 )
     * @param string 	obstructionname			Name of obstruction
     * @param string 	obstructionverb			Verb to be applied to obstruction
     * @param string 	obstructiondescription 	Description of obstruction
     * @param number 	obstructiondamage 		If obstruction is dangerous, damage is inflicted.
     * @param monster 	m 						Monster within room.
     * @param number 	health 					Health to be encountered upon entering a room, if any.
     * @param number 	armor 					Armor to be encountered upon entering a room, if any.
     * 
     * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

	constructor (num){ 
		if(num == 0){ // Map 0 of new game
			this.weapon = new Weapon(0);

			// if look any direction and a monster before ye
			// 
		
			this.description = "Thou findeth yeself in the woods. ";
			this.description2 = "In the distance ahead is a great castle. ";
			this.monsteramount = 1;
			this.weaponamount = 0;
			this.obstructioncount = 1;
			this.obstructionname = "LOG";
			this.obstructionverb = "CLIMB";
			this.obstructiondescription = "There is a LOG blocking thy path. Perhaps thou shalt CLIMB it.";
			this.obstructiondamage = 0;
			this.m = new Monster(0);
			this.health = 10;
			this.armor = 10;
		}
		if(num == 1){
			this.weapon = new Weapon(1);
		
			this.description = "Thou climbest overeth the LOG. ";
			this.description2 = "Now thou findest yeself at a fork in the path. ";
			this.monsteramount = 0;
			this.weaponamount = 0;
			this.obstructioncount = 1;
			this.obstructionname = "SPIDER";
			this.obstructionverb = "DAGGER";
			this.obstructiondescription = "Thou walkest forward. Ye old spider bites thy body with sickening precision. ";
			this.obstructiondamage = 200;
			this.m = new Monster(0);
			this.health = 0;
			this.armor = 0;
		}
	}

	/*
	[0][0] user encounters an imp which is killed easily, exits are south
	[1][0] user can go east or west
	[1][1] east of [1][0] is a church where a cleric NPC gives you the IRONWOOD SWORD / CATHERINE SWORD
			"its dangerous to go alone" // basillica of st denis // st catherine of fierbois
			https://www.unboundworlds.com/2014/10/magic-swords-king-arthur-aragorn-and-joan-of-arc/
	[1][-1] west of [1][0] is a battle against a peastant that can not be defeated without the GOLDEN LANCE
	// need save states to occur at certain rooms rather than in every room
	// example: when first peasant kills you in [1][-1] need to return to room [1][0] 

	*/

	getWeaponAmount(){
		return this.weaponamount;
	}

	getObject(){
		this.weaponamount--;
		return this.weapon;
	}

	getWeapon(){
		return this.weapon;
	}

	describeRoom(){ // Returns primary description.
		return this.description;
	}

	getDescription2(){ // Returns secondary description.
		return this.description2;
	}

	getMonsterAmount(){
		return this.monsteramount;
	}

	getMonster(){
		return this.m;
	}

	setMonster(temp){
		this.m = temp;
	}

	destroyAllMonsters(){ // Sets monster count to zero.
		this.monsteramount = 0;
	}

	getObstructCount(){
		return this.obstructioncount;
	}

	describeObstruction(){ // Returns description of obstruction.
		return this.obstructiondescription;
	}

	getDamage(){ // Return damage an obstruction inflicts.
		return this.obstructiondamage;
	}

	getVerb(){ // Verb to be applied to obstruction
		return this.obstructionverb;
	}

	getNoun(){ // Name of obstruction
		return this.obstructionname;
	}

	getHealth(){
		return this.health;
	}

	getArmor(){
		return this.armor;
	}

	getObjectCount(){
		return this.weaponamount;
	}

	getObjectDescription(){
		return this.weapon.getDescription();
	}

	getObjectName(){
		return this.weapon.getName();
	}

	setHealth(num){
		this.health = num;
	}

	setArmor(num){
		this.armor = num;
	}

	setRoom(map){
		this.weapon.setWeapon(map.getWeapon());
		this.description = map.describeRoom();
		this.description2 = map.getDescription2();
		this.monsteramount = map.getMonsterAmount();
		this.weaponamount = map.getWeaponAmount();
		this.obstructioncount = map.getObstructCount();
		this.obstructionname = map.getNoun();
		this.obstructionverb = map.getVerb();
		this.obstructiondescription = map.describeObstruction();
		this.obstructiondamage = map.getDamage();
		this.m.setMonster(map.getMonster());
		this.health = map.getHealth();
		this.armor = map.getArmor();
	}
}