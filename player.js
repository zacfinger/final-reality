class Player {

	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     * 
     * Player class
     *
     * * * * * * * * 
     *
     * Parameters:
     *
     * @param health 		// The player's health ( 0 - 100 )
     * @param armor 		// The player's armor ( 0 - 100 )
     * @param inventory 	// Array of Weapon objects
     * @param weaponamount 	// Amount of weapons ( 0 or 1 )
     * @param position 		// Player's current map location.
     * 						// 0 = First map
     * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
	
	constructor(healthnum,armornum){
		if(healthnum > 100)  // Health and armor have maximum
			healthnum = 100; // value of 100 and minimum value
		if(armornum > 100)   // of 0. These if statements
			armornum = 100;  // protect against fallacious
		if(healthnum < 0)    // values whilst accounting for
			healthnum = 0;   // users gaining or losing health
		if(armornum < 0)     // in ways that bring them beyond
			armornum = 0;    // the maximum or minimum.

		this.health = healthnum;
		this.armor = armornum;

		this.inventory = [];	// Inventory of weapons
		this.inventory[0] = new Weapon(0);
		this.weaponamount = 1;	// Default weapon
		this.position = 0;		// First map

	}

	setPlayer(gordon){
		this.health = gordon.getHealth();
		this.armor = gordon.getArmor();

		this.weaponamount = gordon.getWeaponAmount();
		this.position = gordon.getPosition();

		this.inventory = [];

		for(var x=0; x<this.weaponamount; x++){
			this.inventory[x] = gordon.getWeapon(x);
		}
	}

	increaseHealth(num){
		if(num + this.health > 100)    		// This ensures that the player's
			num = 100 - this.health;    // health will not exceed 100.

		this.health+=num;
	}

	increaseArmor(num){
		if(num + this.armor > 100)
			num = 100 - this.armor;

		this.armor+=num;
	}

	getWeaponAmount()
	{
		return this.weaponamount;
	}

	getWeaponName(num){
		return this.inventory[num].getName();
	}

	getWeapon(num){
		return this.inventory[num];
	}

	incrementPosition(){
		this.position++;
	}

	getPosition(){
		return this.position;
	}

	decreaseArmor(num){
		var temp;
		
		if(this.armor - num < 0)
		{						   
			temp = num - this.armor;	// This ensures that the player's
			num = this.armor;          	// health will not go below zero.
		}
		else
		{
			temp = 0;
		}

		this.armor = this.armor - num;

		return temp;
	}

	getHurt(num)						// Inflicts damage upon user.
	{									
		if(this.armor > 0)				// If user has armor, armor is
			num = decreaseArmor(num);	// first targeted. Then health.

		this.health -= num; 

	}

	getHealth(){
		return this.health;
	}

	getArmor(){
		return this.armor;
	}

	// Add weapon to inventory
	receiveWeapon(thing){
		this.inventory[this.weaponamount] = thing;	// Inputted weapon is added to player's
		this.weaponamount++;						// inventory. Weapon amount is incremented.
	}

	printStatus(){
		var string = "Thou hath " + this.health + " HP. Thine shielding is " + this.armor + ". ";

		if(this.weaponamount>0){
			string+= "In thine inventory, there is ye olde:<br><br>";

			for(var x=0;x<this.weaponamount;x++){
				string+= " * "+this.inventory[x].getName()+"<br>";
			}
		}

		return string + "<br>";
	}
}
