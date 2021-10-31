import React from "react";

const PlayNumber = (props: any) => (
    <button
        className="number"
        style={{backgroundColor: colors[props.status]}}
        onClick={() => props.onClick(props.playNum, props.status)}
    >
        {props.playNum}
    </button>
)

const colors: { [key: string]: string } = {
    available: 'lightgray',
    used: 'lightgreen',
    wrong: 'lightcoral',
    candidate: 'deepskyblue',
};

export default PlayNumber;
