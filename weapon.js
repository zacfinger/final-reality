// Check out this link:
// https://stackoverflow.com/questions/287903/what-is-the-preferred-syntax-for-defining-enums-in-javascript
let WeaponEnum = Object.freeze({
	"DAGGER": 0,
	"STAFF": 1,
	"HAMMER": 2,
	"AXE": 3,
	"CATHERINE_SWORD": 4,
});


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
     * @param number	ammo
     * 
     * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

	constructor (num){    // Accepts a number after robustly assessing its validity.
		
		if(num == 0){
			super("DAGGER",(num+1)*10,0,10);
			this.attack = "Thou jabbeth ye ";
		}
		if(num == 1){
			super("STAFF",(num+1)*10,0,15);
			this.attack = "Thou swingest ye ";
		}
		if(num == 2){
			super("HAMMER",(num+1)*10,0,20);
			this.attack = "Thou firest ye ";

		}
		if(num == 3){
			super("AXE",(num+1)*10,0,25);
			this.attack = "Thou swingest ye olde ";

		}
		if(num == 4){
			super("CATHERINE SWORD",(num+2)*10,0,100);
			this.attack = "Thou lanceth with thy ";

		}

		this.type = num;
		this.isWeapon = true;

	}

	getAttack(){
		return this.attack;
	}

	attackString(){
		return this.attack + this.name + ". ";
	}

	getDamage(){	// Returns an attack (hit points)  
					// Damage given by weapons is determined by their type.
		
		return this.healthIncrease;
	}

	getType(){
		return this.type;
	}

	setItem(w){


		this.type = w.getType();
		this.name = w.getName();
		this.attack = w.getAttack();
		//this.description = w.getDescription();
		this.healthIncrease = w.getDamage();
		this.price = w.getPrice();
		this.magicIncrease = w.getMagicIncrease();
		this.isWeapon = w.isItemWeapon();
	}
}

function makeWeapon(weapon)
{
	if (weapon in WeaponEnum)
	{
		return new Weapon(WeaponEnum[weapon]);
	}
	else
	{
		let err = weapon + " was not a valid weapon. Please refer to the WeaponEnum.";
		throw err;
	}
}