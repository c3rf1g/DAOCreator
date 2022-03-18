import React, {useEffect, useState} from 'react';
import Web3 from "web3";
import LinearProgress from '@mui/material/LinearProgress';
const Vote = (props) => {
    const [selectedButton, setSelectedButton] = useState(0)
    const [voted, setVoted] = useState(false)
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
    const [firstAmount, setFirstAmount] = useState(0)
    const [secondAmount, setSecondAmount] = useState(0)
    const [totalSupply, setTotalSupply] = useState(0)
    const [statusVote, setStatusVote] = useState("")
    console.log(props.Dao)
    const contract = new web3.eth.Contract(abi, props.Dao)
    useEffect(() => {
        console.log(statusVote)
    }, [statusVote])
    useEffect(() => {
        contract.methods.getUserStatus(props.vote.id, localStorage.getItem("address")).call().then(r => {
            console.log(r)
            console.log(localStorage.getItem("address"))
            setVoted(r)
        })
        contract.methods.getInfoAboutVote(props.vote.id, "field1").call().then(r => {
            console.log(r)
            setFirstAmount(r)
        })
        contract.methods.getInfoAboutVote(props.vote.id, "field2").call().then(r => {
            console.log(r)
            setSecondAmount(r)
        })
        contract.methods.getTotalSupply().call().then(r => {
            setTotalSupply(r)
        })
        contract.methods.getInfoAboutVote(props.vote.id, "status").call().then(res => {
            console.log(res)
            if (res === "1") {
                console.log(res)
                setStatusVote("field 1 win")
            } else {
                if (res === "2"){
                    setStatusVote("field 2 win")
                } else if (res === "3" ){
                    setStatusVote("nichiya")
                }
            }
            }
        )
    }, [voted])

    const sendVote =  () => {
        console.log("SAD")
        contract.methods.setVote(props.vote.id, selectedButton).send({
            from: localStorage.getItem('address'),
            to: props.Dao,
            gas: "20000000"
        }).then( r =>  {
            contract.methods.getInfoAboutVote(props.vote.id, "status").call().then(res => {
                if (res === 1) {
                    setStatusVote("field 1 win")
                } else {
                    if (res === 2){
                        setStatusVote("field 2 win")
                    } else if (res ===3 ){
                        setStatusVote("nichiya")
                    }
                }
                }
            )
            console.log(r)

            contract.methods.getInfoAboutVote(props.vote.id, "field1").call().then(r => {
                console.log(props.vote.id)
                console.log(r)
                 setFirstAmount(r)
            })
            contract.methods.getInfoAboutVote(props.vote.id, "field2").call().then(r => {
                console.log(r)
                 setSecondAmount(r)
            })
            contract.methods.getTotalSupply().call().then(r => {
                 setTotalSupply(r)
            })

            setVoted(true)
        })

    }
    useEffect(() => {
        const el = document.getElementsByClassName(props.vote.voteName + props.index)[0]
        if (!voted) {
            if (selectedButton === 1) {
                el.getElementsByClassName("FirstOption")[0].style.backgroundColor = "orange"
            } else {
                el.getElementsByClassName("FirstOption")[0].style.backgroundColor = "white"
            }
            if (selectedButton === 2) {
                el.getElementsByClassName("SecondOption")[0].style.backgroundColor = "orange"
            } else {
                el.getElementsByClassName("SecondOption")[0].style.backgroundColor = "white"
            }
        }
    }, [selectedButton])
    return (
        <div className={"obertka " + props.vote.voteName + props.index}>
            <div className="VotingCard">
                {
                    !voted ?
                        <div>
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
                                <button onClick={sendVote} className="OptionButton SendButton">Send vote!</button>
                            </div>
                        </div>
                        :
                        <div>
                            <div style={{color: "green"}}>{statusVote}</div>
                            <div>Total supply {totalSupply}</div>
                            <div>First field <LinearProgress variant="determinate" value={Math.round(firstAmount * 10000 / totalSupply) / 100  }/>{Math.round(firstAmount * 10000 / totalSupply) / 100  } % </div>
                            <div>Second field <LinearProgress variant="determinate" value={Math.round(secondAmount * 10000 / totalSupply) /100 }/>{Math.round(secondAmount * 10000 / totalSupply) /100 } %</div>
                        </div>
                }
            </div>
        </div>
    );
};

export default Vote;