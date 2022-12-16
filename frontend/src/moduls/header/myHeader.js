import React from 'react';
import "./myHeader.css";
import {startGame} from "../js/worldCanvas";

const MyHeader = () => {
    return (
        <header>
                <button id="start" onClick={()=>{
                    startGame();
                    startGame();
                }}>Restart</button>
            {/*input onChange="showFile(this)"*/}

                <select name="user_profile_color_1" >
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