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

	constructor (num){ 
		if(num == 0){ // Map 0 of new game
			this.weapon = new Weapon(0);
		
			this.description = "Thou findeth yeself in the woods. ";
			this.description2 = "In the distance ahead is a great castle. ";
			this.monsteramount = 1;
			this.weaponamount = 0;
			this.obstructioncount = 1;
			this.obstructionname = "log";
			this.obstructionverb = "climb";
			this.obstructiondescription = "There is a LOG blocking thy path.";
			this.obstructiondamage = 0;
			this.m = new Monster(0);
			this.health = 0;
			this.armor = 0;
		}
		if(num == 1){
			this.weapon = new Weapon(1);
		
			this.description = "Thou climbest overeth the LOG.";
			this.description2 = "Now thou findest yeself at a fork in the path.";
			this.monsteramount = 0;
			this.weaponamount = 1;
			this.obstructioncount = 1;
			this.obstructionname = "spider";
			this.obstructionverb = "dagger";
			this.obstructiondescription = "Thou walkest forward. Ye old spider bites thy body with sickening precision.";
			this.obstructiondamage = 200;
			this.m = new Monster(0);
			this.health = 0;
			this.armor = 0;
		}
	}

	getWeaponAmount(){
		return this.weaponamount;
	}

	getObject(){
		this.weaponamount--;
		return this.weapon;
	}

	describeRoom(){
		return this.description;
	}

	getDescription2(){
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

	destroyAllMonsters(){
		this.monsteramount = 0;
	}

	getObstructCount(){
		return this.obstructioncount;
	}

	describeObstruction(){
		return this.obstructiondescription;
	}

	getDamage(){
		return this.obstructiondamage;
	}

	getVerb(){
		return this.obstructionverb;
	}

	getNoun(){
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
}