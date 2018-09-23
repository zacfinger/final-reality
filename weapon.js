class Weapon {

	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     * 
     * Weapon class
     * (C) 2018 ZacFinger.com
     * https://github.com/zacfinger/final-reality
     *
     * * * * * * * * 
     *
     * Parameters:
     *
     * @param number	type		Weapon attributes are determined by type in the constructor
     * @param string	name 		Name of the weapon
     * @param string	attack 		Description to be printed when weapon is used
     * @param string	description Description to be printed when weapon is found in a room
     * 
     * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

	constructor (num){    // Accepts a number after robustly assessing its validity.
		
		this.type = num;
		
		if(num == 0){
			this.name = "DAGGER";
			this.attack = "Thou jabbeth ye ";
		}
		if(num == 1){
			this.name = "PISTOL";
			this.attack = "Thou firest ye ";

		}
		if(num == 2){
			this.name = "STAFF";
			this.attack = "Thou swingest ye ";
		}

		var description0 = "Ye olde ";
		var description1 = " lies on ye olde ground.";
		this.description = description0 + this.name + description1;
		
	}

	getName(){
		return this.name;
	}

	attackString(){
		return this.attack + this.name + ". ";
	}

	getDamage(){	// Returns an attack (hit points)  
					// Damage given by weapons is determined by their type.
		return ((this.type + 1) * 10);
	}

	getDescription(){
		return this.description;
	}
}