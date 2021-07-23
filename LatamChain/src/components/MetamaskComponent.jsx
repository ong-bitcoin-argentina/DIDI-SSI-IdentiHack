import React, { useEffect, useState }  from 'react';
import { useMetaMask } from "metamask-react";
import Typography from '@material-ui/core/Typography';
import { ContactSupportOutlined } from '@material-ui/icons';
import {isCorrectChainId} from '../utils/chain';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';

const CORRECT_NET = '648529';

const MetamaskComponent = () => {
    const { status, connect, account, ethereum, subscribeToChainChanged } = useMetaMask();
    const [goodNet, setGoodNet] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const nodeRef = React.useRef(null);

    const inital = async () => {

        const isGoodChain = await isCorrectChainId(ethereum);
        setGoodNet(isGoodChain);

        // console.log(subscribeToChainChanged)

        // TODO: 
        // Eteh
        // window.ethereum.on('accountsChanged', function (accounts) {
        //     if (accounts.length>0) 
        //         document.getElementById("mmImg").innerHTML = gt(accounts[0],42,8, false);
        //     else 
        //         document.getElementById("mmImg").innerHTML = "Conectarse"; 
        // });
        // window.ethereum.on('chainChanged', (chainId) => {
        //       document.getElementById("mmNet").innerHTML = getRedShort(ethereum.networkVersion); 
        //       window.location.reload();
        // });
    }
    
    const generateSmallAccountDir = account => {
        const start = account.slice(0, 5);
        const end = account.slice(account.length - 4, account.length);
        return `${start}...${end}`;
    }

    const onClick = (e) => {
        e.preventDefault();
        navigator.clipboard.writeText(account);
        setShowTooltip(true);
        setTimeout(() =>{
            setShowTooltip(false);
        }, 1500)
    }

    useEffect(()=>{
        inital();
    }, [])

    if (!goodNet)
        return <Button disabled style={{color: 'white'}}>Bad Network (connectarse a Lacchain) :(</Button>

    if (status === "initializing")
        return <div>Synchronisation with MetaMask ongoing...</div>;

    if (status === "unavailable") return <div>MetaMask not available :(</div>;

    if (status === "notConnected")
        return <Button variant="outlined" size="small" style={{color: 'white', border: '1px solid white'}} onClick={connect}>
          Connect to MetaMask
        </Button>;

    if (status === "connecting") return <Button style={{color: 'white'}}>Connecting...</Button>;

    if (status === "connected") return (
        <Tooltip
          ref={nodeRef}
          // PopperProps={{
          //     disablePortal: true,
          // }}
          // open={showTooltip} 
          title={ showTooltip ? "Copiado" : "Click para Copiar" }
          // onOpen={() => setShowTooltip(true)}
          // onClose={() => setShowTooltip(false)}
          // disableFocusListener
          // disableHoverListener
          // disableTouchListener
        >
            <div className="metamask-connected-indicator">
                <a onClick={onClick}>
                    Conectado: {generateSmallAccountDir(account)}
                </a>
            </div>
        </Tooltip>
    );

    return (
        <Typography variant="caption">
            DIDI Card Generator
        </Typography>
    )
}

export default MetamaskComponent;