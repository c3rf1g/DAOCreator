import React, {useState} from 'react';
import * as wrapper from 'solc/wrapper';
import Web3 from "web3";

const DeployButton = (props) => {

    const [compileResult, setCompileResult] = useState('');
    const [compiling, setCompiling] = useState(false);

    const deploy = () => {
        const response = localStorage.getItem('response')
        const abi = JSON.parse(localStorage.getItem('abis'))[localStorage.getItem('contractDeploying')]
        const web3 = new Web3(Web3.givenProvider)
        console.log(abi)
        console.log(JSON.parse(localStorage.getItem('args')))
        const contract = new web3.eth.Contract(abi).deploy({
            data: JSON.parse(response)[localStorage.getItem('contractDeploying')],
            arguments: JSON.parse(localStorage.getItem('args'))
        }).send({
            from: "0xdD2FD4581271e230360230F9337D5c0430Bf44C0",
            gas: '20000000'
        }).then(r => {
            console.log(r)
            var deployedList = JSON.parse(localStorage.getItem('deployedList')) || []
            console.log(deployedList)
            console.log(r._address)
            localStorage.setItem('deployedList', JSON.stringify([...deployedList, Date().split('GMT')[0] + " " + r._address]))
            props.setDeployed(true)
        })
        console.log(contract)

    }

    return (
        <button onClick={deploy} className="DeployButton">
            Deploy
        </button>
    );
};

export default DeployButton;