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
		}
		if(num == 1)
			this.name = "PEASANT";
			// "'Death to collaborators,' he yells"
		if(num == 2)
			this.name = "GRUE";

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

}