import React from 'react';

const DeployedInfoBlock = (props) => {

    return (
        <div className="DeployedInfoBlock">
            <h3 style={{textAlign: "center"}}>Deployed list</h3>
            {
                props.deployedList.map(item => (
                    <div className="addressLog" key={item}>{item}</div>
                ))
            }
        </div>
    );
};

export default DeployedInfoBlock;