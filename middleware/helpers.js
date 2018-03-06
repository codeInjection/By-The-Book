var helpers = {};



helpers.escapeRegex = (text) => {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}


//removes an element from an array, using for removing wishlist and readlist items!
helpers.remove = (array, element) => {
    const index = array.indexOf(element);

    if (index !== -1) {
        array.splice(index, 1);
    }
}


module.exports = helpers;