class Weapon {

	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     * 
     * Weapon class
     *
     * * * * * * * * 
     *
     * Parameters:
     *
     * @param type 		// 1: dagger
	 *					// 2: pistol
     * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

	constructor (num){
		// Accepts a number after robustly assessing its validity.
		if(num < 1 || num > 3)
			this.type = 0;

			this.type = num;
	}
}