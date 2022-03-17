import React, {useEffect, useState} from 'react';

import Web3 from "web3";
import Auth from "./Authed";

const DaoPage = (props) => {
    console.log(props.match.params.address)
    const address = props.match.params.address
    const [isDao, setIsDao] = useState(false)
    const [loading, setLoading] = useState(true)
    const isDaoContract = () => {
        const web3 = new Web3(Web3.givenProvider)
        const abi = [{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"getAirdropStatusByAddress","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"}]
        try {
            const contract = new web3.eth.Contract(abi, address)
            contract.methods.getAirdropStatusByAddress("0xdD2FD4581271e230360230F9337D5c0430Bf44C0").call().then(r => {
                    console.log(r)
                    setIsDao(true)
                }
            )
        } catch {
            setIsDao(false)
        }
    }
    useEffect(() => {
        if (loading) {
            isDaoContract()
            setLoading(false)
        }
    }, [loading])
    return (
        <div>
            {
                address.length === 42 && address.slice(0, 2) === "0x"?
                    isDao ?
                        <Auth DAOAddress={address}/>
                            :
                        (<div style={{backgroundColor: "white"}}>You are not in DAO</div>)

                    // (<p style={{backgroundColor: "white"}} onClick={isDaoContract}>ok</p>)
                    :
                    (<p>ne ok</p>)
            }
        </div>
    );
};

export default DaoPage;