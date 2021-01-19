import React from 'react'

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function Carousel() {
    return (
        <div className="slot">
            {
                numbers.map((num) =>
                    <div className="carousel__cell">{num}</div>
                )
            }
        </div>
    )
}

export default Carousel
