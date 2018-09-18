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

	// Add weapon to inventory
	receiveWeapon(thing){
		this.inventory[this.weaponamount] = thing;	// Inputted weapon is added to player's
		this.weaponamount++;						// inventory. Weapon amount is incremented.
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
	
}
