class Monster {

	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     * 
     * Monster class
     *
     * * * * * * * * 
     *
     * Parameters:
     *
     * @param 	type 		// 0: imp
	 *						// 1: peasant
	 *						// 3: grue
	 *			name
     * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

	constructor (num){
		if(num == 0){
			if(Math.floor((Math.random() * 100) + 1)>=50)
				this.name = "IMP";
			else
				this.name = "GOBLIN";

			this.description = "The beast is stout, the height of three or four of the King's feet. It squeals as it lunges for thou, its mouth perferated by rows of teeth, dripping wet with ye olde blood.";
		}
		if(num == 1){
			this.name = "PEASANT";
			// "'Death to collaborators,' he yells"
			//this.description = "'Death to collaborators,' he yells.";
		}
		if(num == 2){
			this.name = "GRUE";
			this.description = "It has a figure as of a man, but lacks the spirit of one. Its long arms ending in fingers sharp, as of knives.";
		}

		this.type = num;
		this.health = (num+1) * 3;
	}

	getName(){
		return this.name;
	}

	getHurt(num){  // Decrements monsters' health.
		this.health -= num;
	}

	getHealth(){  // Returns the monsters' current health.
		return this.health;
	}

	attackString(){ 
		switch(this.type){
			case 0: return "The "+this.name+" lunges. ";
			case 1: return "The PEASANT fireseth the PISTOL and shouteth 'Death to royalists!' ";
			case 2: return "The GRUE stares deeply into you and releases a magic missile of energy. ";
		}
	}

	getDamage(){  // Damage given by monsters is determined by their type.
		return ((this.type+1) * 10);
	}

	getDescription(){
		return this.description;
	}

}