import React, {useEffect, useState} from 'react';
import './App.css';

const DisplayStars = (props: any) => (
    <React.Fragment>
        {utils.range(1, props.count).map((starId: number) =>
            <div key={starId} className="star"/>
        )}
    </React.Fragment>
)

const PlayNumber = (props: any) => (
    <button
        className="number"
        style={{backgroundColor: colors[props.status]}}
        onClick={() => props.onClick(props.playNum, props.status)}
    >
        {props.playNum}
    </button>
)

const PlayAgain = (props: any) => (
    <div className="game-done">
        <div className="message" style={{color: props.gameStatus === 'lost' ? 'red' : 'green'}}>
            {props.gameStatus === 'lost' ? 'Game Over' : 'Nice'}
        </div>
        <button onClick={props.onClick}>Play Again</button>
    </div>
)

const useGameState = () => {
    const [stars, setStars] = useState<number>(utils.random(1, 9));
    const [availableNumbers, setAvailableNums] = useState<number[]>(utils.range(1, 9));
    const [candidateNumbers, setCandidateNums] = useState<number[]>(new Array<number>());
    const [secondsLeft, setSecondsLeft] = useState<number>(10);

    useEffect(() => {
        if (secondsLeft > 0 && availableNumbers.length > 0) {
            const timerId = setTimeout(() => {
                setSecondsLeft(secondsLeft - 1)
            }, 1000);
            return () => clearTimeout(timerId);
        }
    })

    const setGameState = (newCandidateNumbers: number[]) => {
        if (utils.sum(newCandidateNumbers) !== stars) {
            setCandidateNums(newCandidateNumbers);
        } else {
            const newAvailableNumbers = availableNumbers.filter((n: number) => !newCandidateNumbers.includes(n));
            setStars(utils.randomSumIn(newAvailableNumbers, 9));
            setAvailableNums(newAvailableNumbers);
            setCandidateNums(new Array<number>());
        }
    }
    return {
        stars, availableNumbers, candidateNumbers, secondsLeft, setGameState
    }
}

const Game = (props: any) => {
    const {stars, availableNumbers, candidateNumbers, secondsLeft, setGameState} = useGameState();

    const candidateAreWrong: boolean = utils.sum(candidateNumbers) > stars;

    const gameStatus: string = availableNumbers.length === 0 ? 'won' : secondsLeft === 0 ? 'lost' : 'active';

    const numberStatus = (num: number) => {
        if (!availableNumbers.includes(num)) {
            return 'used';
        }
        if (candidateNumbers.includes(num)) {
            return candidateAreWrong ? 'wrong' : 'candidate';
        }

        return 'available';
    }

    const onNumberClick = (num: number, currentStatus: string) => {
        if (gameStatus !== 'active' || currentStatus === 'used') {
            return;
        }

        const newCandidateNumbers: number[] = currentStatus === 'available' ? candidateNumbers.concat(num)
            : candidateNumbers.filter((cn: number) => cn !== num);

        setGameState(newCandidateNumbers);
    }

    return (
        <div className="game">
            <div className="help">
                Pick 1 or more numbers that sum to the number of stars
            </div>
            <div className="body">
                <div className="left">
                    {
                        gameStatus !== 'active' ? (<PlayAgain onClick={props.startNewGame} gameStatus={gameStatus}/>)
                            : (<DisplayStars count={stars}/>)
                    }

                </div>
                <div className="right">
                    {utils.range(1, 9).map(number =>
                        <PlayNumber
                            key={number}
                            status={numberStatus(number)}
                            playNum={number}
                            onClick={onNumberClick}
                        />
                    )}
                </div>
            </div>
            <div className="timer">Time Remaining: {secondsLeft}</div>
        </div>
    );
};

const StarMatch = () => {
    const [gameId, setGameId] = useState<number>(1)

    return <Game key={gameId} startNewGame={() => setGameId(gameId + 1)}/>;
}

// Color Theme
const colors: { [key: string]: string } = {
    available: 'lightgray',
    used: 'lightgreen',
    wrong: 'lightcoral',
    candidate: 'deepskyblue',
};

// Math science
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

function App() {
    return (
        <StarMatch/>
    );
}

export default App;
