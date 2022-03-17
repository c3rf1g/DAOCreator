import React, {useEffect, useState} from 'react';
import "./DAOPage.css"
import { BarLoader,DoubleBubble, SlidingPebbles }
    from 'react-spinner-animated';

import 'react-spinner-animated/dist/index.css'
import {LinearProgress} from "@mui/material";
import Web3 from "web3";


function Authed(props) {
    const address = props.DAOAddress
    const [isDao, setIsDao] = useState(false)
    const [loading, setLoading] = useState(true)
    const isDaoContract = () => {
        const web3 = new Web3(Web3.givenProvider)
        const abi = [{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"getAirdropStatusByAddress","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"}]
        try {
            const contract = new web3.eth.Contract(abi, address)
            contract.methods.getAirdropStatusByAddress(props.account).call().then(r => {
                    console.log(r)
                    setIsDao(true)
                    setLoading(false)
                }
            )
        } catch {
            setIsDao(false)
            setLoading(false)
        }
    }
    useEffect(() => {
        if (loading) {
            isDaoContract()

        }
    }, [loading])
    return (
        <div>
            {
                loading ?
                    <div className="ErrorMessage" style={{backgroundColor: "white"}}>
                        <LinearProgress />
                        <p>Loading</p>
                    </div>
                    :
                        !isDao && !loading  ?
                            <div className="ErrorMessage" style={{backgroundColor: "white" }}>You are not in DAO :(</div>
                        :

                            <div className="ErrorMessage" style={{backgroundColor: "white"}}>
                                <LinearProgress />
                                <p>Loading DAO</p>
                            </div>
            }
        </div>


    )
}

const Auth = (props) => {
    const [auth, setAuth] = useState(false)
    const [accountAddress, setAccountAddress] = useState("")
    const Auth =  () => {
        if (window.ethereum) {
            const ethereum = window.ethereum

            ethereum
                .request({ method: 'eth_requestAccounts' })
                .then((r) => {
                    console.log(r[0])
                    localStorage.setItem("authed", true)
                    setAccountAddress(r[0])     
                    setAuth(true)
                })
                .catch((err) => {
                    if (err.code === 4001) {
                        console.log('Please connect to MetaMask.');
                    } else {
                        console.error(err);
                    }
                });
        } else {
            console.log("Please install Metamask")
        }

    }
    return (
        <div>
            {
                auth || localStorage.getItem('authed')?
                    <Authed account={accountAddress} DAOAddress={props.DAOAddress}/>
                    :
                    <div className="Button">
                        <button className="ConnectWallet" onClick={Auth}>Connect wallet</button>
                    </div>
            }

        </div>
    );
};

export default Auth;