import React, {useEffect, useState} from 'react';
import Web3 from "web3";

const Vote = (props) => {
    const [selectedButton, setSelectedButton] = useState(0)
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
            "inputs": [],
            "name": "createVote",
            "outputs": [],
            "stateMutability": "nonpayable",
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
            "inputs": [],
            "name": "getCountVotes",
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
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "voteId",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "infoType",
                    "type": "string"
                }
            ],
            "name": "getInfoAboutVote",
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
            "name": "getTotalSupply",
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
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "voteId",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "field",
                    "type": "uint256"
                }
            ],
            "name": "setVote",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "nonpayable",
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
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "usersVoted",
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
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "name": "votesInfo",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]
    const web3 = new Web3(Web3.givenProvider)
    const contract = new web3.eth.Contract(abi, "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9")
    // contract.methods.getUserStatus(props.vote.id, localStorage.getItem("address")).call().then(r => {
    //     console.log(r)
    // })
    useEffect(() => {
        const el = document.getElementsByClassName(props.vote.voteName + props.index)[0]
        if (selectedButton === 1 ){
            el.getElementsByClassName("FirstOption")[0].style.backgroundColor = "orange"
        } else {
            el.getElementsByClassName("FirstOption")[0].style.backgroundColor = "white"
        }
        if (selectedButton === 2) {
            el.getElementsByClassName("SecondOption")[0].style.backgroundColor = "orange"
        } else {
            el.getElementsByClassName("SecondOption")[0].style.backgroundColor = "white"
        }
    }, [selectedButton])
    return (
        <div className={"obertka " + props.vote.voteName + props.index}>
            <div className="VotingCard">
                {props.vote.voteName}
                <div>
                    <button onClick={() => {
                        setSelectedButton(1)
                    }} className="OptionButton FirstOption">{
                        props.vote.field1
                    }</button>
                </div>
                <div>
                    <button onClick={() => {
                        setSelectedButton(2)
                    }} className="OptionButton SecondOption">{
                        props.vote.field2
                    }
                    </button>
                </div>
                <div>
                    <button className="OptionButton SendButton">Send vote!</button>
                </div>
            </div>
        </div>
    );
};

export default Vote;