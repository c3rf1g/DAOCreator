import React, {useEffect, useState} from 'react';

import Web3 from "web3";
import Auth from "./Authed";

const DaoPage = (props) => {
    console.log(props.match.params.address)
    const address = props.match.params.address
    return (
        <div>

            <Auth DAOAddress={address}/>
        </div>
    );
};

export default DaoPage;