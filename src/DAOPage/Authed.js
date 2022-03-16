import React, {useState} from 'react';
import "./DAOPage.css"

function Authed() {
    return null;
}

const Auth = () => {
    const [auth, setAuth] = useState(false)
    const Auth =  () => {
        if (window.ethereum) {
            const ethereum = window.ethereum
            ethereum
                .request({ method: 'eth_requestAccounts' })
                .then((r) => {
                    console.log(r[0])
                    setAuth(true)
                })
                .catch((err) => {
                    if (err.code === 4001) {
                        console.log('Please connect to MetaMask.');
                    } else {
                        console.error(err);
                    }
                });
        } else {
            console.log("Please install Metamask")
        }

    }
    return (
        <div>
            {
                auth ?
                    <Authed/>
                    :
                    <div className="Button">
                        <button className="ConnectWallet" onClick={Auth}>Connect wallet</button>
                    </div>
            }

        </div>
    );
};

export default Auth;