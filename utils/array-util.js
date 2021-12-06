module.exports = {
  /**
   * Creates a new array with randomized elements of the provided array.
   * @param {array} array The array to randomize.
   * @returns {array} A new array, with randomized elements.
   */
  shuffle: function(array){
    if(!array) return null;
    
    const newArray = array.slice(0);
    let currentIndex = newArray.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = newArray[currentIndex];
      newArray[currentIndex] = newArray[randomIndex];
      newArray[randomIndex] = temporaryValue;
    }
    
    //return a duplicate of the array
    return newArray;
  }
}