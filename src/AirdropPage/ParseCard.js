import React, {useState} from 'react';
import Web3 from "web3";
import {Box, CircularProgress} from "@mui/material";
import {erc721} from "../ABIs/erc721"
const ParseCard = () => {
    const parse_accounts = async (CONTRACT_ACCOUNT, startBlock) => {
        const web3 = new Web3(Web3.givenProvider)
        console.log(web3)

        const latestBlock = (await web3.eth.getBlock("latest")).number
        console.log(latestBlock)
        const contract = new web3.eth.Contract(erc721, CONTRACT_ACCOUNT);
        var tokensInfo = {}
        var total_events_dict = {}
        console.log(Math.floor((latestBlock - startBlock)/ 20_000))
        var indexed_array = []
        for (let i = 0; i < Math.floor((latestBlock - startBlock)/ 20_000) + 1; i++) {
            indexed_array.push(i)
        }

        await Promise.all(indexed_array.map(async (index) => {
            const fromBlock = startBlock + index * 20000;
            // console.log(index)
            const toBlock = index ===  Math.floor((latestBlock - startBlock)/ 20_000) - 1 ? latestBlock : startBlock  + (index + 1) * 20000;
            total_events_dict[index] = [...(await contract.getPastEvents('Transfer', {fromBlock: fromBlock, toBlock: toBlock}))]
        }))
        var total_events = []
        indexed_array.map(index => {
            total_events = [...total_events, ...total_events_dict[index]]
        })
        console.log(total_events.length)
        console.log(total_events)
        await Promise.all(total_events.map(async (event) => {
            const balance = await contract.methods.balanceOf(event["returnValues"]['to']).call()
            if (balance > 0 && tokensInfo[event["returnValues"]['to']] !== "undefined")
                tokensInfo[event["returnValues"]['to']] = balance
        }))
        return tokensInfo
    }
    const [parsing, setParsing] = useState(false)
    const parseAddresses = () => {
        setParsing(true)
        const contract_account = document.getElementById("contractAddress").value
        const startBlock = parseInt(document.getElementById("startBlock").value, 10)
        console.log(startBlock)
        parse_accounts(contract_account, startBlock).then(r => {
            var list = []
            console.log(Object.entries(r))
            Object.entries(r).map(item => list.push(item[0]))
            console.log(document.getElementById("AirdropList"))
            document.getElementById("AirdropList").value = JSON.stringify(list)
            document.getElementById("parsedNum").innerHTML = "Parsed " + list.length + " addresses"
            setParsing(false)
        })
    }
    return (
        <div className="ParseCard">
            <div>
                <input id="contractAddress" placeholder="Contract address"/>
            </div>
            <div>
                <input id="startBlock" placeholder="Start parse from block"/>
            </div>
            <button className="parseButton" onClick={ () => {parseAddresses()}}>
                {
                    parsing ?
                        <Box sx={{ display: 'flex', justifyContent: "center"}}>
                            <CircularProgress color="secondary"/>
                        </Box>
                        :
                        (<div>Parse</div>)
                }
            </button>
            <div id="parsedNum"></div>
        </div>
    );
};

export default ParseCard;
