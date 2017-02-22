Array.prototype.inGroupsOf = Array.prototype.inGroupsOf || function(size) {
    var thisArray = this.slice(0);
    var subArrays = [];
    while (thisArray.length > 0)
        subArrays.push(thisArray.splice(0, size));
    return subArrays;
} 