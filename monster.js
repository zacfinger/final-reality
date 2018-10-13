class Monster {

	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     * 
     * Monster class
     * (C) 2018 ZacFinger.com
     * https://github.com/zacfinger/final-reality
     *
     * * * * * * * * 
     *
     * Parameters:
     *
     * @param string name 			Name of the monster.
     * @param string description 	Description of monster.
     * @param number type 			Monster attributes are determined by type in the constructor.
     * @param number health 		Depends on monster type.
     * @param number gold			Amount of gold pieces the monster holds
     * @param item[] inventory
     * 
     * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

     /// http://robdodson.me/javascript-design-patterns-factory/
     /// https://medium.com/@SntsDev/the-factory-pattern-in-js-es6-78f0afad17e9

	constructor (num){
		if(num == 0){
			if(Math.floor((Math.random() * 100) + 1)>=50)
				this.name = "IMP";
			else
				this.name = "GOBLIN";

			this.description = "The beast is stout, the height of three or four of the King's feet. "
			+ "It squeals as it lunges for thou, its mouth perferated by rows of teeth, dripping wet with ye olde blood.";

		}
		if(num == 1){
			this.name = "PEASANT";
			// "'Death to collaborators,' he yells"
			//this.description = "'Death to collaborators,' he yells.";
		}
		if(num == 2){
			this.name = "GRUE";
			this.description = "It has a figure as of a man, but lacks the spirit of one."
			+ "Its long arms ending in fingers sharp, as of knives.";
		}

		if(num == 3){
			this.name = "TEST";
			this.description = "Hello world.";
		}

		this.type = num;
		this.health = (num+1) * 3;
		this.gold = Math.floor((Math.random() * ((num+1)*10)) + ((num+1)*3));

		var inventoryLength = Math.floor(Math.random() * ((num+1)));
		this.inventory = [];

		for(var x=0;x<=inventoryLength;x++){
			if(Math.floor(Math.random() * 100)>= 20)
				this.inventory[x] = new Item("ELIXIR",10,0,5);
			else
				this.inventory[x] = new Weapon(1);
		}
	}

	getType(){
		return this.type;
	}

	getGold(){
		return this.gold;
	}

	setGold(num){
		this.gold = num;
	}

	setMonster(m){
		this.name = m.getName();
		this.description = m.getDescription();
		this.type = m.getType();
		this.health = m.getHealth();
		this.gold = m.getGold();
	}

	getName(){ // Returns monster's name
		return this.name;
	}

	getHurt(num){ // Decrements monster's health.
		this.health -= num;
	}

	getHealth(){  // Returns the monster's current health.
		return this.health;
	}

	attackString(){ 
		switch(this.type){
			case 0: return "The "+this.name+" lunges. ";
			case 1: return "The PEASANT fireseth the PISTOL and shouteth 'Death to royalists!' ";
			case 2: return "The GRUE stares deeply into you and releases a magic missile of energy. ";
		}
	}

	getDamage(){ // Returns an attack (hit points)
	// Damage given by monsters is determined by their type.
		return ((this.type+1) * 10);
	}

	getDescription(){ // Returns description of monster
		return this.description;
	}

	useItem(w){
		var string = "Thou useth ye olde " + w.getName() + " on the " + this.name + ".<br> He ";

		var healthAdjust = w.getHealthIncrease();
		var maxHealth = (this.type+1) * 3;

		if(healthAdjust >= 0)
			string += "gainseth " + healthAdjust;
		else
			string += "loseth " + (-1 * healthAdjust);

		if(this.health + healthAdjust > maxHealth){
			this.health = maxHealth;
		}
		else if (this.health + healthAdjust < 0) {
			this.health = 0;
		}
		else {

			this.health += healthAdjust;
		}

		string += " HP.<br>Why on earth wouldst thou do that?<br>";

		return string;
	}

}