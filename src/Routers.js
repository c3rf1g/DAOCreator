import React from 'react';
import App from "./App";
import {Switch} from "@mui/material";
import AirDropPage from "./AirdropPage/AirDropPage";
import DaoPage from "./DAOPage/DAOPage";
import {Route, Routes} from "react-router-dom";
const Routers = () => {


    return (
        <Routes >
            <Route exact path="/compiler" element={<App/>}/>
            <Route path="/airdrop" element={<AirDropPage/>}/>
            <Route exact path="/:address" element={<DaoPage/>}/>
        </Routes>
    );
};

export default Routers;