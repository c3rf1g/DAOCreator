import React, {useEffect, useState} from 'react';
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import Prism from "prismjs"
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";
import {ERC20Template} from "./ContractTemplates/ERC20Template"; //Example style, you can use another
import {ERC721Template} from "./ContractTemplates/ERC721Template"
import DeployedInfoBlock from "./DeployedInfoBlock";
const SmartContract = (props) => {
    const [code, setCode] = React.useState(
        `function add(a, b) {\n  return a + b;\n}`
    );
    const [templateSetted, setTemplateSetted] = useState(false)
    useEffect(() => {
        props.setWantToSetTemplate(false)
        setTemplateSetted(false)
    }, [code])

    if (props.whichContractSelected !== -1 && props.wantToSetTemplate && !templateSetted) {
        console.log(props.whichContractSelected, props.wantToSetTemplate)
        if (props.whichContractSelected === 0)
            setCode(ERC20Template)
        if (props.whichContractSelected === 1)
            setCode(ERC721Template)
        setTemplateSetted(true)

    }
    return (
        <div className="CodeField">
            <div className="CodeForm">
                <Editor
                    value={code}
                    onValueChange={(code) => {props.setEdited(false); setCode(code)}}
                    highlight={(code) => highlight(code, Prism.languages.javascript, 'sol')}
                    padding={10}
                    style={{
                        fontFamily: '"Fira code", "Fira Mono", monospace',
                        fontSize: 12,
                    }}
                />
            </div>
            <DeployedInfoBlock deployedList={props.deployedList}/>
        </div>
    );
};

export default SmartContract;