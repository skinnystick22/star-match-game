import React, {useState} from 'react';
import './App.css';

const DisplayStars = (props: any) => (
    <>
        {utils.range(1, props.count).map((starId: number) =>
            <div key={starId} className="star"/>
        )}
    </>
)

const PlayNumber = (props: any) => (
    <button className="number" onClick={() => console.log('Num', props.number)}>
        {props.number}
    </button>
)

const StarMatch = () => {
    const [stars, setStars] = useState(utils.random(1, 9));
    const [availableNumbers, setAvailableNums] = useState(...);
    const [candidateNumbers, setCandidateNums] = useState([]);

    const numberStatus = (num: number) => {
        if (!availableNumbers.includes(num)) {
            return 'used';
        }
        if (candidateNumbers.includes(num)){
return ....
        }

        return 'available';
    }

    return (
        <div className="game">
            <div className="help">
                Pick 1 or more numbers that sum to the number of stars
            </div>
            <div className="body">
                <div className="left">
                    <DisplayStars count={stars}/>
                </div>
                <div className="right">
                    {utils.range(1, 9).map(number => <PlayNumber
                        key={number}
                        status={numberStatus(num)}
                        number={number}/>)}
                </div>
            </div>
            <div className="timer">Time Remaining: 10</div>
        </div>
    );
};

// Color Theme
const colors = {
    available: 'lightgray',
    used: 'lightgreen',
    wrong: 'lightcoral',
    candidate: 'deepskyblue',
};

// Math science
const utils = {
    // Sum an array
    sum: (arr: []) => arr.reduce((acc, curr) => acc + curr, 0),

    // create an array of numbers between min and max (edges included)
    range: (min: number, max: number) => Array.from({length: max - min + 1}, (_, i) => min + i),

    // pick a random number between min and max (edges included)
    random: (min: number, max: number) => min + Math.floor(Math.random() * (max - min + 1)),

    // Given an array of numbers and a max...
    // Pick a random sum (< max) from the set of all available sums in arr
    randomSumIn: (arr: [], max: number) => {
        const sets = [[]];
        const sums = [];
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0, len = sets.length; j < len; j++) {
                const candidateSet = sets[j].concat(arr[i]);
                // @ts-ignore
                const candidateSum = utils.sum(candidateSet);
                if (candidateSum <= max) {
                    sets.push(candidateSet);
                    sums.push(candidateSum);
                }
            }
        }
        return sums[utils.random(0, sums.length - 1)];
    },
};

function App() {
    return (
        <StarMatch/>
    );
}

export default App;
