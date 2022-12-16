import React from 'react';
import "./buttonsManag.css";

let {Controls} = require("../js/control");

const ButonsManag = () => {
    return (
        <div id="interface">
            <button id="go" onClick={() => {
                Controls.move()
            }}>GO
            </button>
            <button id="turn" onClick={() => {
                Controls.turn()
            }}><img src="https://img.icons8.com/doodle/344/rotate.png" id="im"/></button>
            <button id="token" onClick={() => {
                Controls.token()
            }}>token
            </button>
        </div>
    );
};

export default ButonsManag;