class Weapon extends Item {

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
		
		if(num == 0){
			super("DAGGER",(num+1)*10,0,10);
			this.attack = "Thou jabbeth ye ";
		}
		if(num == 1){
			super("PISTOL",(num+1)*10,0,20);
			this.attack = "Thou firest ye ";

		}
		if(num == 2){
			super("STAFF",(num+1)*10,0,25);
			this.attack = "Thou swingest ye ";
		}

		this.type = num;

		var description0 = "Ye olde ";
		var description1 = " lies on ye olde ground.";
		this.description = description0 + this.name + description1;
		
	}

	getAttack(){
		return this.attack;
	}

	attackString(){
		return this.attack + this.name + ". ";
	}

	getDamage(){	// Returns an attack (hit points)  
					// Damage given by weapons is determined by their type.
		//return ((this.type + 1) * 10);
		return this.healthIncrease;
	}

	getDescription(){
		return this.description;
	}

	getType(){
		return this.type;
	}

	setItem(w){
		this.type = w.getType();
		this.name = w.getName();
		this.attack = w.getAttack();
		this.description = w.getDescription();
		this.healthIncrease = w.getDamage();
		this.price = w.getPrice();
		this.magicIncrease = w.getMagicIncrease();
	}
}