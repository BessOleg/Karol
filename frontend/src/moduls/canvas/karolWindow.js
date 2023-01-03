'use strict'
import React, {useEffect, useMemo, useRef, useState} from "react";
import {tool, htmlObj} from "../js/storage";
import {myGameArea} from "../js/worldCanvas"
import useScreenSize from "../js/useScreenSize";

require("./canvas.css")

const KarolWindow = () => {
    const { width, height } = useScreenSize();
    let canRef = useRef()
    let loadRef = useRef()
    useEffect(() => {
        myGameArea.canvas = tool.canvas = canRef.current;
        myGameArea.context = tool.ctx = tool.canvas.getContext("2d")
        htmlObj.KarolLoad = loadRef.current;
    }, [])

    useMemo(() => {
        if (myGameArea.canvas !== null) {
            myGameArea.myWindowMap();
        }
    }, [width, height]);

    return (
        <div>
            <canvas id="Canvas" ref={canRef}/>
            <meter id="loading" ref={loadRef} value="0" min="0" max="100" optimum="85" low="33" high="66"/>
        </div>
    );
};


//<button onClick={() => CanvasLoad()}>load</button>
export default KarolWindow;
