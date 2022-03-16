import Web3 from 'web3';
import SettingsContract from "./SettingsContract";
import SmartContract from "./SmartContract"
import AdditionSettingsContract from "./AdditionSettingsContract";
import DeployButton from "./DeployButton";
import CompileButton from "./CompileButton";
import React, {useEffect, useState} from "react";
import {Routes, Route, BrowserRouter as Router, Switch} from 'react-router-dom'
import DaoPage from "./DAOPage";
import DeployedInfoBlock from "./DeployedInfoBlock";
function App() {
    const [compiled, setCompiled] = useState(false)
    const [edited, setEdited] = useState(false)
    const [compiledAndSelected, setCompiledAndSelected] = useState(false)
    const [wantToSetTemplate, setWantToSetTemplate] = useState(false)
    const [whichContractSelected, setWhichContractSelected] = useState("")
    const [deployed, setDeployed] = useState(false)
    const [deployedList, setDeployedList] = useState([])
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
            <Router>
                <Switch>
                    <Route exact path="/" render={
                        () => (<div>
                            <div className="LeftPanel">
                                <SettingsContract setWantToSetTemplate={setWantToSetTemplate}
                                                  setWhichContractSelected={setWhichContractSelected}/>
                                <AdditionSettingsContract setCompiled={setCompiled} compiled={compiled}
                                                          setCompiledAndSelected={setCompiledAndSelected}
                                                          compiledAndSelected={compiledAndSelected}>
                                    <CompileButton setCompiled={setCompiled}/>
                                    {
                                        compiledAndSelected ?
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
                        </div>)
                    }/>
                    <Route exact path="/:id" component={DaoPage}/>
                </Switch>

            </Router>
        </div>
  );
}

export default App;
