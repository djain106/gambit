import React, { useState } from 'react'
import { TweenLite, TweenMax, Power2 } from 'gsap'
import RouletteWheel from './RouletteWheel'
import RouletteTable from './RouletteTable';

function Roulette() {
    const [spinning, setSpinning] = useState(false);

    function spin() {
        setSpinning(true);
    }

    function endSpin() {
        setSpinning(false);
    }

    return (
        <div className="border">
            <RouletteWheel spinning={spinning} />
            <RouletteTable spin={spin} endSpin={endSpin} />
        </div>
    )
}

export default Roulette
