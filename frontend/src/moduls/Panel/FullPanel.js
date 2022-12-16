import React from 'react';
import "./FullPanel.css"
import ButonsManag from "./ButonsManag";
import KarolWindow from "../canvas/karolWindow";
import Info from "./Info";

const FullPanel = () => {
    return (
        <div className="conteiner">
            <ButonsManag/>
            <KarolWindow/>
            <Info/>
        </div>
    );
};

export default FullPanel;