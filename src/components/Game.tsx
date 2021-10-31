import React, {useEffect, useState} from "react";
import utils from "../utils";
import PlayAgain from "./PlayAgain";
import DisplayStars from "./DisplayStars";
import PlayNumber from "./PlayNumber";

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

export default Game
