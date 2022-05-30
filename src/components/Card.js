import React from "react";

const Card = ({img, code}) => {

    return (
        <div>
            <img src={img} alt={code}/>
        </div>
    )
}

export default Card;