'use strict'
import React, {useEffect, useMemo, useRef} from "react";
import {tool} from "../js/storage";
import {myGameArea} from "../js/worldCanvas"

require("./canvas.css")

const KarolWindow = () => {
    let canRef = useRef()
    useEffect(() => {
        myGameArea.canvas = tool.canvas = canRef.current;
        myGameArea.context = tool.ctx = tool.canvas.getContext("2d")
    }, [])
    useMemo(() => {
        if (myGameArea.canvas !== null) {
            myGameArea.myWindowMap();
        }
    }, [window.innerWidth, window.innerHeight])
    return (
        <div>
            <canvas id="Canvas" ref={canRef}/>
            <meter id="loading" value="0" min="0" max="100" optimum="85" low="33" high="66"/>
        </div>
    );
};
//<button onClick={() => CanvasLoad()}>load</button>
export default KarolWindow;