import React from 'react';

import Web3 from "web3";
import Auth from "./Authed";

const DaoPage = (props) => {
    console.log(props.match.params.address)
    const address = props.match.params.address
    const isDaoContract = async () => {
        const web3 = new Web3(Web3.givenProvider)
        const abi = [{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"getAirdropStatusByAddress","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"}]
        const contract = new web3.eth.Contract(abi, address)
        console.log(contract.methods.getAirdropStatusByAddress("0xdD2FD4581271e230360230F9337D5c0430Bf44C0").call().then(r => console.log(r)))
    }
    return (
        <div>

            {
                address.length === 42 && address.slice(0, 2) === "0x" ?
                    <Auth/>
                    // (<p style={{backgroundColor: "white"}} onClick={isDaoContract}>ok</p>)
                    :
                    (<p>ne ok</p>)
            }
        </div>
    );
};

export default DaoPage;