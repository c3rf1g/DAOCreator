import React from 'react';
import ERC20Template from './ERC20Template'
const SetTemplateButton = (props) => {

    return (
        <button className="SetTemplateButton" onClick={() => props.setWantToSetTemplate(true)}>
            Set template
        </button>
    );
};

export default SetTemplateButton;