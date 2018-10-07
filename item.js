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
	}

	isItemWeapon(){
		return this.isWeapon;
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