import React from 'react';
import axios from "axios";

const CompileButton = (props) => {
    const sendToCompile = () => {
        props.setCompiled(false)
        const code = document.getElementsByClassName("CodeForm")[0].getElementsByTagName("textarea")[0].value
        axios.post("http://localhost:8082/", {contract: code}).then(r => {
            localStorage.setItem("abis", JSON.stringify(r.data.list_abi))
            localStorage.setItem("response", JSON.stringify(r.data.response))
            props.setCompiled(true)
        }).catch(e => {
            console.log(e)
        })

    }
    return (
        <button onClick={sendToCompile} className="CompileButton">
            Compile
        </button>
    );
};

export default CompileButton;