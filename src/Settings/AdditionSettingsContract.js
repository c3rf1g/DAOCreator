import React, {useState} from 'react';

const AdditionSettingsContract = (props) => {

    const [args, setArg] = useState({})
    const [inputs, setInputs] = useState([])
    const [init, setInit] = useState(false)
    const [abis, setAbis] = useState([])
    const [response, setResponse] = useState([])
    const [selectedContract, setSelectedContract] = useState("")
    const [indexConstructor, setIndexConstructor] = useState(0)
    if (!props.compiled && init)
        setInit(false)
    if (props.compiled && !init){
        setResponse(JSON.parse(localStorage.getItem("response")))
        setAbis(JSON.parse(localStorage.getItem('abis')))
        setSelectedContract(Object.entries(JSON.parse(localStorage.getItem('abis')))[0][0])
        setInit(true)
    }

    const checkFill = (e) => {
        console.log(e.target.placeholder)
        var copyArgs = args
        if (e.target.value === ""){
            delete copyArgs[e.target.id]
        } else {
            copyArgs[e.target.id] = e.target.value
            console.log(copyArgs)
        }
        if (Object.entries(copyArgs).length === abis[selectedContract][indexConstructor]['inputs'].length){
            localStorage.setItem('contractDeploying', selectedContract)
            var args_list = []
            for (let i = 0; i < abis[selectedContract][indexConstructor]['inputs'].length; i++){
                try {
                    args_list.push(JSON.parse(copyArgs[abis[selectedContract][indexConstructor]['inputs'][i]['name']]))
                } catch (e) {
                    args_list.push(copyArgs[abis[selectedContract][indexConstructor]['inputs'][i]['name']])

                    console.log(e)
                }
            }
            console.log(args_list)
            // console.log((new Function("return " + JSON.stringify(args_list)+ ";")()))
            localStorage.setItem('args', JSON.stringify(args_list))
            props.setCompiledAndSelected(true)
        }
        else props.setCompiledAndSelected(false)
        setArg(copyArgs)
    }
    return (
        <div className="AdditionSettingsContract">
            {
                props.compiled ?
                    <select className="contractSelector" defaultValue="-" onChange={(e) => {
                        console.log(e.target.value)

                        for (let i = 0; i < abis[e.target.value].length; i++){
                            // console.log(Object.entries(abis)[0][1][i])
                            if (abis[e.target.value][i]['type'] === "constructor"){
                                console.log(abis[e.target.value][i])
                                setIndexConstructor(i)
                                setInputs(abis[e.target.value][i]['inputs'])
                            }
                        }
                        setSelectedContract(e.target.value)
                        setArg({})
                        if (props.compiledAndSelected)
                            props.setCompiledAndSelected(false)
                    }
                    }   >
                        {
                            Object.entries(response).map(item =>
                                (<option  key={item[0]}>
                                    {item[0]}
                                </option>)
                            )
                        }
                    </select>
                    :
                    <div></div>
            }
            <div className="DeployArguments">
                {
                    props.compiled && selectedContract !== ""?
                        abis[selectedContract][indexConstructor] ?
                            abis[selectedContract][indexConstructor]['inputs'].map(item => (
                                <div key={JSON.stringify(item)}>{item['name']}
                                    <input id={item['name']} onChange={(e) => checkFill(e)} placeholder={item['internalType']}/>
                                </div>
                                )
                            )
                            :
                            <div></div>
                        :
                        (<div></div>)
                }
            </div>
            {
                props.children
            }
        </div>
    );
};

export default AdditionSettingsContract;