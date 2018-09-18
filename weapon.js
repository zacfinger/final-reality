class Weapon {

	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     * 
     * Weapon class
     *
     * * * * * * * * 
     *
     * Parameters:
     *
     * @param type 		// 0: dagger
	 *					// 1: pistol
     * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

	constructor (num){
		
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
			this.attack = "Thou swingesteth ye olde ";
		}

		this.type = num;
		this.health = num * 3;
	}

	getName(){
		return this.name;
	}

	attackString(){
		return this.attack + this.name + ". ";
	}

	getDamage(){
		return ((this.type + 1) * 10);
	}
}