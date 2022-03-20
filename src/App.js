import Web3 from 'web3';
import SettingsContract from "./Settings/SettingsContract";
import SmartContract from "./SmartContract"
import AdditionSettingsContract from "./Settings/AdditionSettingsContract";
import DeployButton from "./Settings/DeployButton";
import CompileButton from "./Settings/CompileButton";
import React, {useEffect, useState} from "react";
import {Routes, Route, BrowserRouter as Router, Switch} from 'react-router-dom'
import DaoPage from "./DAOPage/DAOPage";
import DeployedInfoBlock from "./DeployedInfoBlock";
import AirDropPage from "./AirdropPage/AirDropPage";
function App() {
    const [compiled, setCompiled] = useState(false)
    const [edited, setEdited] = useState(false)
    const [compiledAndSelected, setCompiledAndSelected] = useState(false)
    const [wantToSetTemplate, setWantToSetTemplate] = useState(false)
    const [whichContractSelected, setWhichContractSelected] = useState("")
    const [deployed, setDeployed] = useState(false)
    const [deployedList, setDeployedList] = useState([])
    document.getElementsByTagName("body")[0].style.backgroundColor = "black"

    useEffect(() => {
        if (edited === true) {
            setCompiled(false)
        }
    }, [edited])
    useEffect(() => {
        if (deployed){
            setDeployedList(JSON.parse(localStorage.getItem("deployedList")))
            setDeployed(false)
        } else {
            setDeployedList(JSON.parse(localStorage.getItem("deployedList")))
        }
    }, [deployed])
  return (
        <div className="App">
            <div className="LeftPanel">
                <SettingsContract setWantToSetTemplate={setWantToSetTemplate}
                                  setWhichContractSelected={setWhichContractSelected}
                                  setCompiledAndSelected={setCompiledAndSelected}
                />
                <AdditionSettingsContract setCompiled={setCompiled} compiled={compiled}
                                          setCompiledAndSelected={setCompiledAndSelected}
                                          compiledAndSelected={compiledAndSelected}
                                          wantToSetTemplate={wantToSetTemplate}
                >
                    <CompileButton setCompiled={setCompiled}/>
                    {
                        compiledAndSelected?
                            <div>
                                <DeployButton setDeployed={setDeployed}/>
                            </div>
                            :
                            <div></div>
                    }
                </AdditionSettingsContract>
            </div>
            <SmartContract setEdited={setCompiled} wantToSetTemplate={wantToSetTemplate}
                           whichContractSelected={whichContractSelected}
                           setWantToSetTemplate={setWantToSetTemplate}
                           deployedList={deployedList}
            />
        </div>
  );
}

export default App;
