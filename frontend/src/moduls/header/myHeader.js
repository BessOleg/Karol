import React, {useEffect, useRef} from 'react';
import "./myHeader.css";
import {myGameArea, startGame} from "../js/worldCanvas";
import {htmlObj, tool} from "../js/storage";


const MyHeader = () => {
    let lvlSel = useRef()
    useEffect(() => {
        htmlObj.lvlSelect = lvlSel.current;

    }, [])

    return (
        <header>
                <button id="start" onClick={()=>{
                    startGame();
                    startGame();
                }}>Restart</button>
            {/*input onChange="showFile(this)"*/}

                <select name="user_profile_color_1" ref={lvlSel} >
                    <option value="1">level</option>
                    <option value="2">level</option>
                    <option value="3">level</option>
                    <option value="4">level</option>
                    loading
                </select>
        </header>
    );
};

export default MyHeader;