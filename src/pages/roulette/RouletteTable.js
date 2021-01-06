import React from 'react'
import './Roulette.css'

function RouletteTable(props) {
    let numbers = [...props.numbers];
    numbers.sort((a, b) => (a.num > b.num) ? 1 : -1);
    numbers.splice(0, 1);
    console.log([...Array(5)])
    return (
        <div className="betTable">
            <div>
                <button disabled={props.spinning} className={`zero ${props.numbers[0].color}`}>{props.numbers[0].num}</button>
                {

                }
                {/* <div className="section">
                    <button className="red">1</button>
                    <button className="black">2</button>
                    <button className="red">3</button>
                    <button className="black">4</button>
                    <button className="red">5</button>
                    <button className="black">6</button>
                    <button className="red">7</button>
                    <button className="black">8</button>
                    <button className="red">9</button>
                    <button className="black">10</button>
                    <button className="black">11</button>
                    <button className="red">12</button>
                </div>
                <div className="section">
                    <button className="black">13</button>
                    <button className="red">14</button>
                    <button className="black">15</button>
                    <button className="red">16</button>
                    <button className="black">17</button>
                    <button className="red">18</button>
                    <button className="red">19</button>
                    <button className="black">20</button>
                    <button className="red">21</button>
                    <button className="black">22</button>
                    <button className="red">23</button>
                    <button className="black">24</button>
                </div>
                <div className="section">
                    <button className="red">25</button>
                    <button className="black">26</button>
                    <button className="red">27</button>
                    <button className="black">28</button>
                    <button className="black">29</button>
                    <button className="red">30</button>
                    <button className="black">31</button>
                    <button className="red">32</button>
                    <button className="black">33</button>
                    <button className="red">34</button>
                    <button className="black">35</button>
                    <button className="red">36</button>
                </div>
                <div className="section">
                    <button className="green">2-1</button>
                    <button className="green">2-1</button>
                    <button className="green">2-1</button>
                </div>
            </div>
            <div className="extraButtons">
                <div className="twelveButtons">
                    <button className="twelve"><span>1st12</span></button>
                    <button className="twelve"><span>2nd12</span></button>
                    <button className="twelve"><span>3rd12</span></button>
                </div>
                <div className="edgeButtons">
                    <button><span>1-18</span></button>
                    <button><span>EVEN</span></button>
                    <button style={{ backgroundColor: "red" }}></button>
                    <button style={{ backgroundColor: "black" }}></button>
                    <button><span>ODD</span></button>
                    <button><span>19-36</span></button>
                </div> */}
            </div>
        </div>
    )
}

export default RouletteTable
