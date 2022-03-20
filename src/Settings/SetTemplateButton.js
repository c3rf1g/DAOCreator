import React from 'react';
const SetTemplateButton = (props) => {

    return (
        <button className="SetTemplateButton" onClick={() => { props.setCompiledAndSelected(false); props.setWantToSetTemplate(true)}}>
            Set template
        </button>
    );
};

export default SetTemplateButton;