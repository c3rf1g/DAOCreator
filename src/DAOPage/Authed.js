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
            const abi = [
                    {
                        "constant": true,
                        "inputs": [],
                        "name": "name",
                        "outputs": [
                            {
                                "name": "",
                                "type": "string"
                            }
                        ],
                        "payable": false,
                        "stateMutability": "view",
                        "type": "function"
                    },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "name": "_spender",
                            "type": "address"
                        },
                        {
                            "name": "_value",
                            "type": "uint256"
                        }
                    ],
                    "name": "approve",
                    "outputs": [
                        {
                            "name": "",
                            "type": "bool"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [],
                    "name": "totalSupply",
                    "outputs": [
                        {
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "name": "_from",
                            "type": "address"
                        },
                        {
                            "name": "_to",
                            "type": "address"
                        },
                        {
                            "name": "_value",
                            "type": "uint256"
                        }
                    ],
                    "name": "transferFrom",
                    "outputs": [
                        {
                            "name": "",
                            "type": "bool"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [],
                    "name": "decimals",
                    "outputs": [
                        {
                            "name": "",
                            "type": "uint8"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [
                        {
                            "name": "_owner",
                            "type": "address"
                        }
                    ],
                    "name": "balanceOf",
                    "outputs": [
                        {
                            "name": "balance",
                            "type": "uint256"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [],
                    "name": "symbol",
                    "outputs": [
                        {
                            "name": "",
                            "type": "string"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "name": "_to",
                            "type": "address"
                        },
                        {
                            "name": "_value",
                            "type": "uint256"
                        }
                    ],
                    "name": "transfer",
                    "outputs": [
                        {
                            "name": "",
                            "type": "bool"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [
                        {
                            "name": "_owner",
                            "type": "address"
                        },
                        {
                            "name": "_spender",
                            "type": "address"
                        }
                    ],
                    "name": "allowance",
                    "outputs": [
                        {
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "payable": true,
                    "stateMutability": "payable",
                    "type": "fallback"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": true,
                            "name": "owner",
                            "type": "address"
                        },
                        {
                            "indexed": true,
                            "name": "spender",
                            "type": "address"
                        },
                        {
                            "indexed": false,
                            "name": "value",
                            "type": "uint256"
                        }
                    ],
                    "name": "Approval",
                    "type": "event"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": true,
                            "name": "from",
                            "type": "address"
                        },
                        {
                            "indexed": true,
                            "name": "to",
                            "type": "address"
                        },
                        {
                            "indexed": false,
                            "name": "value",
                            "type": "uint256"
                        }
                    ],
                    "name": "Transfer",
                    "type": "event"
                }
        ]
            const web3 = new Web3(Web3.givenProvider)
            const contract = new web3.eth.Contract(abi, "0x1ACcBD355245AbA93CE46D33ab1D0152CE33Fd00")
            contract.methods.balanceOf("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266").call().then(r => {
                console.log(r)
                setBalance(r)
            })
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
                                <MainDAOPage/>
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