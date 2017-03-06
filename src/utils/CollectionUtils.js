import {Map, List} from 'immutable';

export default class CollectionUtils {
    static iterateArrayInGroupsOf = (array, size) => {
        var thisArray = array.slice(0); // Clone
        var subArrays = [];
        while (thisArray.length > 0)
            subArrays.push(thisArray.splice(0, size));
        return subArrays;
    }

    static differenceBetween(hash1, hash2) {
        let clonedHash1 = this.clone(hash1);
        Object.keys(hash2).forEach(function(key) {
            delete clonedHash1[key];
        });

        return clonedHash1;
    }
    
    static everythingExceptKey(object, key) {
        let clonedHash1 = this.clone(object);
        delete clonedHash1[key];
        return clonedHash1;
    }

    static clone(object) {
        //TODO: A Hacky way to clone a Hash without writing lots of code and not using jQuery.
        //var clonedHash1 = JSON.parse(JSON.stringify(hash1));
        return Map(object).toJS();
    }
}