function findUniqueAndCountDuplicate(nums) {
    const counterObject = {};

    for (let num of nums) {
        if (counterObject[num]) {
            counterObject[num]++;
        } else {
            counterObject[num] = 1;
        }
    }

    const uniqueValues = [];
    const duplicateCounts = {};

    for (let key in counterObject) {
        if (counterObject[key] == 1) {
            uniqueValues.push(Number(key));
        } else {
            duplicateCounts[key] = counterObject[key];
        }
    }

    return {
        uniqueValues,
        duplicateCounts,
    };
}

const nums = [1, 2, 2, 3, 4, 4, 4, 5, 6, 6];

console.log(findUniqueAndCountDuplicate(nums));
