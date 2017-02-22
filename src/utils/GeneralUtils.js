export default class GeneralUtils {
    static iterateArrayInGroupsOf = (array, size) => {
        var thisArray = array.slice(0); // Clone
        var subArrays = [];
        while (thisArray.length > 0)
            subArrays.push(thisArray.splice(0, size));
        return subArrays;
    }
}