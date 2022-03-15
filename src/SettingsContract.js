import React, {useEffect, useState} from 'react';
import Field from "./Field";
import "./settings.css"
import CompileButton from "./CompileButton";
import SetTemplateButton from "./SetTemplateButton";
const SettingsContract = (props) => {
    const [contractSelected, setContractSelected] = useState([false, false])
    useEffect(() => {
        document.getElementsByClassName("SelectContractErc20")[0].checked = contractSelected[0]
        document.getElementsByClassName("SelectContractErc721")[0].checked = contractSelected[1]
        props.setWhichContractSelected(contractSelected[0] ? 0 : contractSelected[1] ? 1 : -1)
    }, [contractSelected])
    return (
        <div className="ContractMainProps">
            <div className="TemplateSetting">
                <div>
                    <label>
                        <input className="SelectContractErc20" type="checkbox" id="erc20" onClick={() => setContractSelected([true, false])}/>
                        ERC20
                    </label>
                    {
                        contractSelected[0] ?
                            <div>
                                <div>
                                    Token name
                                    <input type="text"/>
                                </div>
                                <div>
                                    Amount ERC token
                                    <input placeholder="Amount ERC20 token" type="number" min="1"/>
                                </div>
                            </div>
                        :
                            <div></div>
                    }
                </div>
                <div>
                    <label>
                        <input className="SelectContractErc721" type="checkbox" id="erc721" onClick={() => setContractSelected([false, true])}/>
                        ERC721
                    </label>
                    {
                        contractSelected[1] ?
                            <div>
                                <div>
                                    DAO Token name
                                    <input type="text"/>
                                </div>
                                <div>
                                    Amount DAO's token
                                    <input placeholder="Amount" type="number" min="1"/>
                                </div>
                                <div>
                                    ERC20 token address
                                    <input placeholder="ERC20 token address" type="number" min="1"/>
                                </div>
                            </div>
                            :
                            <div></div>
                    }

                </div>
                <SetTemplateButton setWantToSetTemplate={props.setWantToSetTemplate}/>
            </div>
        </div>
    );
};

export default SettingsContract;