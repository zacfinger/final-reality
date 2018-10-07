class Player {

	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     * 
     * Player class
     * (C) 2018 ZacFinger.com
     * https://github.com/zacfinger/final-reality
     *
     * * * * * * * * 
     *
     * Parameters:
     *
     * @param number 	health 			The player's health ( 0 - 100 )
     * @param number 	armor 			The player's armor ( 0 - 100 )
     * @param weapon[] 	inventory 		Array of Weapon objects
     * @param number 	weaponamount 	Amount of weapons
     * @param number 	positionX 		Player's current map location (0 = first map)
     * @param number	gold			Amount of GP the user has
     * 						
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
		this.magic = 0;

		this.inventory = [];	// Inventory of weapons
		
		this.inventory[0] = new Weapon(0);	// Default weapon
		this.positionX = 0;					// First map
		this.positionY = 0;
		this.gold = 10;
	}

	setX(num){
		this.positionX = num;
	}

	setY(num){
		this.positionY = num;
	}

	setPlayer(gordon){  // Receives another player object and sets
						// current player attributes to that object's.
						// This is used for loading from save points.
		this.health = gordon.getHealth();
		this.armor = gordon.getArmor();

		this.positionX = gordon.getPositionX();
		this.positionY = gordon.getPositionY();

		this.inventory = []; // Reset weapon inventory to empty



		for(var x=0; x<gordon.getWeaponAmount(); x++){
			if(!gordon.getWeapon(x).isItemWeapon())
				this.inventory[x] = new Item("null",0,0,0);
			else
				this.inventory[x] = new Weapon(3);

			//this.inventory[x] = new Item("null",0,0,0);
			this.inventory[x].setItem(gordon.getItem(x));
			
		}
		
	}

	increaseHealth(num){
		if(num + this.health > 100)    	// This ensures that the player's
			num = 100 - this.health;    // health will not exceed 100.

		this.health+=num;
	}

	increaseArmor(num){
		if(num + this.armor > 100)		// This ensures that the player's
			num = 100 - this.armor;    	// armor will not exceed 100.

		this.armor+=num;
	}

	getWeaponAmount() // Get amount of items
	{
		return this.inventory.length;
	}

	getWeaponName(num){ // Get name of item in position num
		return this.inventory[num].getName();
	}

	getWeapon(num){
		return this.inventory[num];
	}

	goSouth(){  // Increments users' room number
		this.positionX++;
	}

	goNorth(){
		this.positionX--;
	}

	getPositionX(){  // Get users' position
		return this.positionX;
	}

	getPositionY(){  // Get users' position
		return this.positionY;
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

	getHurt(num)							// Inflicts damage upon user.
	{									
		if(this.armor > 0)					// If user has armor, armor is
			num = this.decreaseArmor(num);	// first targeted. Then health.

		this.health -= num; 

	}

	getHealth(){  // Get users' health
		return this.health;
	}

	getArmor(){   // Get users' armor
		return this.armor;
	}

	getItem(x){
		return this.inventory[x];
	}

	receiveItem(thing){
		if(thing.isItemWeapon())
			this.inventory[this.inventory.length] = new Weapon(3);
		else
			this.inventory[this.inventory.length] = new Item("null",0,0,0);

		this.inventory[this.inventory.length-1].setItem(thing);
		
	}

	printStatus(){ // Display health, armor, inventory
		var string = "Thou hath " + this.health + " HP. Thine shielding is " + this.armor + ". ";

		if(this.inventory.length>0){
			string+= "In thine inventory, there is ye olde:<br>";

			for(var x=0;x<this.inventory.length;x++){  // Cycle through inventory, display each weapon.
				string+= " * "+this.inventory[x].getName()+"<br>";
			}
		}

		string += "* " + this.gold + " GP<br>";

		return string + "<br>";
	}

	hasVerb(str){	// Checks to see if verb issued is an item in inventory.
		for(var x=0;x<this.inventory.length;x++) // Cycles through inventory to check
		{
			if(str == this.inventory[x].getName())
				return x; // returns index of requested item
		}

		return -1; // returns -1 if item is not found in the inventory.
	}

	removeItem(num){
		this.inventory.splice(num,1); // remove item from inventory
	}

	useItem(num){
		var healthAdjust = this.inventory[num].getHealthIncrease();
		var magicAdjust = this.inventory[num].getMagicIncrease();

		if(this.health + healthAdjust > 100){
			this.health = 100;
		}
		else if (this.health + healthAdjust < 0){
			this.health = 0;
		}
		else {
			this.health += healthAdjust;
		}

		if(this.magic + magicAdjust > 100){
			this.health = 100;
		}
		else if (this.magic + magicAdjust < 0){
			this.magic = 0;
		}
		else {
			this.magic += magicAdjust;
		}

		this.removeItem(num);
	}

	

}
