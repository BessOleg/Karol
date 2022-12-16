import React from 'react';
import "./codeManag.css"
import {codeKarol} from "../js/Karol";

const CodeManag = () => {
    return (
        <div className="conteiner">
            <div className="code">
                <div id="codePush"><input type="button" onClick={()=>{
                    codeKarol();
                }} id="gocode" value="Submit code"/></div>
                <textarea>
</textarea>
            </div>
            <div className="code">
                <h4>Help</h4>
                <h5>control functions</h5>
                <p> karol.go(); - make a move</p>
                <p> karol.turnLeft(); - make a turn left</p>
                <p> karol.putCoin(); - put in a coin</p>
                <p> karol.flipCoin(); - flip a coin</p>
                <p> karol.checkCoin(); - check for the presence of a coin</p>
                <p>karol.checkTabCoin(); - check for coin fields</p>
                <p>karol.checkWall(); - check on the wall</p>
            </div>
        </div>
);
};

export default CodeManag;