import React, {useEffect, useState} from 'react';
import "./DAOPage.css"
import { BarLoader,DoubleBubble, SlidingPebbles }
    from 'react-spinner-animated';

import 'react-spinner-animated/dist/index.css'
import {LinearProgress} from "@mui/material";
import Web3 from "web3";
import MainDAOPage from "./MainDAOPage";


function Authed(props) {
    const address = props.DAOAddress
    const [isDao, setIsDao] = useState(false)
    const [loading, setLoading] = useState(true)
    const [balance, setBalance] = useState(0)
    const isDaoContract = () => {
        const web3 = new Web3(Web3.givenProvider)
        const abi = [
            {
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "_name",
                        "type": "string"
                    },
                    {
                        "internalType": "address[]",
                        "name": "addresses",
                        "type": "address[]"
                    },
                    {
                        "internalType": "address",
                        "name": "_token",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amountAirdropToken",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_owner",
                        "type": "address"
                    }
                ],
                "name": "balanceOf",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address[]",
                        "name": "addresses",
                        "type": "address[]"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    }
                ],
                "name": "doAirdropByList",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_address",
                        "type": "address"
                    }
                ],
                "name": "getDAOUserStatusByAddress",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getOwner",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getToken",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "name",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "owner",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "token",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            }
        ]
        try {
            const contract = new web3.eth.Contract(abi, address)
            contract.methods.getDAOUserStatusByAddress(localStorage.getItem("address")).call().then(r => {
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

    useEffect(() => {
        if (isDao){
        //
        }
    }, [isDao])
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
                            <div className="MainDaoPage" style={{backgroundColor: "white"}}>
                                <MainDAOPage DAOAddress={props.DAOAddress}/>
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
                    localStorage.setItem("address", r[0])
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
                    <Authed DAOAddress={props.DAOAddress}/>
                    :
                    <div className="Button">
                        <button className="ConnectWallet" onClick={Auth}>Connect wallet</button>
                    </div>
            }

        </div>
    );
};

export default Auth;