import React, {useState} from 'react';
import './styles/App.css';
import Game from "./components/Game";

const StarMatch = () => {
    const [gameId, setGameId] = useState<number>(1)

    return <Game key={gameId} startNewGame={() => setGameId(gameId + 1)}/>;
}

const App = () => {
    return <StarMatch/>;
}

export default App;
