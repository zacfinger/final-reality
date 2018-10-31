class itemFactory {
	constructor(){
		this.itemTypeNumber = 3;
		// this will need to be removed from item.js later
		// not to mention always updated when new items are added
	}

	// this should be removed from item.js later
	makeItem(item){
		switch(item) {
		    case 1:
		        return new Item("ELIXIR",10,0,5);
		        break;
		    case 2:
		    	return new Item("TONIC",10,0,5);
		    	break;
		    default:
		        return new Item("POTION",10,0,5);
		}
	}

	// this should be removed from item.js later
	getTotalItemTypeNumber(){
		return this.itemTypeNumber;
	}

	// should be removed from monster.js
	makeRandomItem(){
		var num = (Math.floor(Math.random() * (this.itemTypeNumber)));
		return this.makeItem(num);
	}
}

let ItemEnum = Object.freeze({
	"POTION": 0,
	"ELIXIR": 1,
	"TONIC": 2
});