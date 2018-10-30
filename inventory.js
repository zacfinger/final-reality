class Inventory {

	constructor(item) {
		this.items = [];
		this.indexOfEquippedItem = -1;

		if(item.isWeapon())
			this.items[0] = new Weapon(3);
		else
			this.items[0] = new Item("null",0,0,0);

		this.items[0].setItem(item);
	}

	// user story: when the user hits "eval" 
	// user can type equip dagger
	// 
	equipItemAt(num){

	}
}