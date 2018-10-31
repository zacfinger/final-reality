class Item {
	// healthIncrease	number	Increases the HP of the target
	// magicIncrease	number	Increases the MP of the target
	// name
	// price
	//
	// Items can be applied to opponents
	// health and magic parameters can be negative
	//
	// Potion = Restores HP
	// Ether = Restores MP
	// Elixir = Restores both HP and MP

	constructor(str, dmg, magic, price){
		this.name = str;
		this.healthIncrease = dmg;
		this.magicIncrease = magic;
		this.price = price;
		this.isWeapon = false;
		this.itemTypeNumber = 3; 
		// supposed to represent total number of item types
		//  
	}

	/* this will need to be removed from item.js and everywhere it is called
	// replaced by itemfactory.js
	makeItem(num){
		switch(num) {
		    case 1:
		        return new Item("ELIXIR",10,0,5);
		        break;
		    case 2:
		    	return new Item("TONIC",10,0,5);
		    	break;
		    default:
		        return new Item("POTION",10,0,5);
		}
	}*/

	// i recognize this adds some item factory functionality
	// to item class. this should be its own class ItemFactory
	getTotalItemTypeNumber(){
		return this.itemTypeNumber;
	}

	isItemWeapon(){
		return this.isWeapon;
	}

	healString(){
		var string = "Thou useth ye olde " + this.name + ".<br>";

		if(this.healthIncrease != 0){
			if(this.healthIncrease > 0)
				string += "Thou gainesth " + this.healthIncrease + " HP.<br>";
			else
				string += "Thou loseth " + (-1 * this.healthIncrease) + " HP.<br>";
		}
		if(this.magicIncrease != 0){
			if(this.magicIncrease > 0)
				string += "Thou gainesth " + this.magicIncrease + " MP.<br>";
			else
				string += "Thou loseth " + (-1 * this.magicIncrease) + " MP.<br>";
		}

		return string;
	}

	getHealthIncrease(){
		return this.healthIncrease;
	}

	getMagicIncrease(){
		return this.magicIncrease;
	}

	getName(){
		return this.name;
	}

	getPrice(){
		return this.price;
	}

	setItem(i){
		
		this.name = i.getName();
		this.healthIncrease = i.getHealthIncrease();
		this.magicIncrease = i.getMagicIncrease();
		this.price = i.getPrice();
		this.isWeapon = i.isItemWeapon();
	}
}