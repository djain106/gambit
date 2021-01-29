import React from 'react'

const numbers = ["🍒", "🥭", "🍊", "🍓", "🍇"];

function Carousel(props) {
    return (
        <div className="slot" >
            <div id={`ring-${props.ringId}`}>
                {
                    numbers.map((num, i) =>
                        <div key={num} className="carousel__cell" style={{ transform: `rotateX(${i * (360 / numbers.length)}deg) translateZ(90px)` }}><p>{num}</p></div>
                    )
                }
            </div>
        </div>
    )
}

export default Carousel
