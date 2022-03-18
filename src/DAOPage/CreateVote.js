import React, {useEffect, useState} from 'react';
import Web3 from "web3";

const CreateVote = (props) => {
    const [voteFields, setVoteFields] = useState({})
    const [voteName, setVoteName] = useState("")
    const [voteField1, setVoteField1] = useState("")
    const [voteField2, setVoteField2] = useState("")
    const [clickableCreateButton, setClickableCreateButton] = useState(false)
    const createVotes = async () => {
        if (clickableCreateButton){
            const input = document.getElementsByClassName("voteNameInput")[0].value
            const field1 = document.getElementsByClassName("Field1")[0].value
            const field2 = document.getElementsByClassName("Field2")[0].value
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
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "voteId",
                            "type": "uint256"
                        },
                        {
                            "internalType": "address",
                            "name": "user",
                            "type": "address"
                        }
                    ],
                    "name": "getUserStatus",
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
            const contract = new web3.eth.Contract(abi, props.Dao)

            console.log(input)
            const id = await contract.methods.getCountVotes().call()
            console.log(id)
            localStorage.setItem('votes', JSON.stringify([...props.votes, {
                voteName: input,
                field1: field1,
                field2: field2,
                id: id
            }]))
            console.log(await contract.methods.getOwner().call())
            console.log(await contract.methods.getCountVotes().call())
            console.log(await contract.methods.createVote().send({
                    from: localStorage.getItem("address"),
                    gas: '20000000'
                }
            ))
            props.setVotes([...props.votes, {
                voteName: input,
                field1: field1,
                field2: field2,
                id: id
            }])
        }
    }
    useEffect(() => {
        if (voteName.length && voteField1.length && voteField2.length){
            document.getElementsByClassName("CreateVoteButton")[0].style.backgroundColor = 'hotpink'
            setClickableCreateButton(true)
        } else {
            document.getElementsByClassName("CreateVoteButton")[0].style.backgroundColor = 'gray'
            setClickableCreateButton(false)
        }
    }, [voteName, voteField1, voteField2])
    const checkFilled = (e) => {
        const newKey = e.target.placeholder
        const item = e.target.value
        if (newKey === "Vote name") {
            setVoteName(item)
        } else if (newKey === "First option") {
            setVoteField1(item)
        } else if (newKey === "Second option") {
            setVoteField2(item)
        }
        console.log(newKey, item)
    }
    return (
        <div>
            <div>
                <input onChange={checkFilled} className="voteNameInput" placeholder="Vote name"/>
                <div>
                    <input className="Field1" onChange={checkFilled} placeholder="First option"/>
                    <input className="Field2" onChange={checkFilled} placeholder="Second option"/>
                </div>
            </div>
            <button onClick={createVotes} className="CreateVoteButton">Create Vote</button>
        </div>
    );
};

export default CreateVote;