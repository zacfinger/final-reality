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

	constructor(str, num1, num2, num3){
		this.name = str;
		this.healthIncrease = num1;
		this.magicIncrease = num2;
		this.price = num3;
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
	}
}