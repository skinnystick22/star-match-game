import React from "react";
import utils from "../utils";

const DisplayStars = (props: any) => (
    <React.Fragment>
        {utils.range(1, props.count).map((starId: number) =>
            <div key={starId} className="star"/>
        )}
    </React.Fragment>
)

export default DisplayStars;
