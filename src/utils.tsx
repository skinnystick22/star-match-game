const utils = {
    // Sum an array
    sum: (arr: number[]) => arr.reduce((acc, curr) => acc + curr, 0),

    // create an array of numbers between min and max (edges included)
    range: (min: number, max: number) => Array.from({length: max - min + 1}, (_, i) => min + i),

    // pick a random number between min and max (edges included)
    random: (min: number, max: number) => min + Math.floor(Math.random() * (max - min + 1)),

    // Given an array of numbers and a max...
    // Pick a random sum (< max) from the set of all available sums in arr
    randomSumIn: (arr: number[], max: number) => {
        const sets: number[][] = [[]];
        const sums = [];
        for (let i: number = 0; i < arr.length; i++) {
            for (let j: number = 0, len = sets.length; j < len; j++) {
                const candidateSet: number[] = sets[j].concat(arr[i]);
                const candidateSum: number = utils.sum(candidateSet);
                if (candidateSum <= max) {
                    sets.push(candidateSet);
                    sums.push(candidateSum);
                }
            }
        }
        return sums[utils.random(0, sums.length - 1)];
    },
};

export default utils;
