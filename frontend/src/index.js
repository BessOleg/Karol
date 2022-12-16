import React from 'react';
import ReactDOM from 'react-dom/client';
import $ from "jquery";
import MyHeader from "./moduls/header/myHeader";
import FullPanel from "./moduls/Panel/FullPanel";
import CodeManag from "./moduls/Panel/codeManag";
import "./index.css";
require("./moduls/js/main")
const root = ReactDOM.createRoot($("#root")[0]);
root.render(
    <React.StrictMode>
        <MyHeader/>
        <FullPanel/>
        <CodeManag/>
    </React.StrictMode>
);

