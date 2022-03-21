import React from 'react';
import "./AirdropPage.css"
import {AppBar, Button, Container, createTheme, IconButton, Toolbar, Typography} from "@mui/material";
import {ThemeProvider} from "@emotion/react";
import {BrowserRouter} from "react-router-dom";
import Header from "../Header";
import Web3 from "web3";
import ParseCard from "./ParseCard";
import DoAirdropCard from "./DoAirdropCard";




const AirDropPage = () => {
    document.getElementsByTagName("body")[0].style.backgroundColor = "white"
    const web3 = new Web3(Web3.givenProvider)
    console.log(Object.entries(Web3.providers))
    return (
        <div className="AirdropPage_Tape">
            <div className="AirdropPage">
                <ParseCard/>
                <DoAirdropCard/>
            </div>


        </div>
    );
};

export default AirDropPage;