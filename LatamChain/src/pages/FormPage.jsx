import React from 'react'
import clsx from 'clsx';
import { Grid } from '@material-ui/core';
import 'fontsource-roboto';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import HeaderStep from '../components/HeaderStep';
import { digestMessage, arrayBufferToBase64 } from '../helpers/utils-keys';
import jsonGenerator from '../service/jsonGenerator';
import { executeSignCredential } from '../service/firma';
import { uuid } from 'uuidv4';
import { useMetaMask } from "metamask-react";

import { generateSerialCard } from '../helpers/serial-card';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: '110ch',
    padding: theme.spacing(3),
    minHeight: '80ch',
  },
  margin: {
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(3),
    },
  },
}));

/*
address recorderDID,
address financialDID,
uint256 serialFrom,
uint256 serialTo,
-- DATE
uint256 validFrom,
uint256 validTo,
-- SE CALCULAN
bytes32  hashSerialCard,
bytes calldata signature

*/

/**
 CARDS:
    {
        id: 1, 2, 3
    }
 */

// statusCall: 'stop' 'running' 'error' 'finish'

// Global state
const initialState = {
    statusCall: 'stop',
    page_0_next: false,
    page_1_next: true,
    page_2_next: false,
    page_final_next: false,
    financialDID: 'did:ethr:lacchain:0xdc10b04254b5e74ebff158652af419347dd9b757',
    recorderDID: 'did:ethr:lacchain:0x5Ed4a09BAa906883c74889B7d242637ed6F8510c',
    serialFrom: '',
    serialTo: '',
    validFrom: null,
    validTo: null,
    generatingJson: false,
    cards: []
}


const FirmPage = () => {
  const classes = useStyles();
  const [data, setData] = React.useState(initialState);
  const { status, connect, account, ethereum, subscribeToChainChanged } = useMetaMask();

  const updateForm = newData => {
    console.log('newData: ', newData)
    setData(prevData => ({ ...prevData, ...newData }))
  }



  // Generate CARDS
  const onLastStep = async () => {
    setData(prevData => ({ ...prevData, generatingJson: true }));
    
    // Generate  card json
    let newCards = []
    for (let i = data.serialFrom; i <= data.serialTo; i++) {
        const serial = generateSerialCard(i, data.monthTo, data.yearTo);

        // sha256
        const serialDigest = await digestMessage(serial);

        // Get public Key
        const url = 'https://cuenta.stamping.io';
        const response = await fetch(url);
        const { publicKey } = await response.json(); 
      

        const {generated, json} = await jsonGenerator(
            uuid(),
            data.convertValidFrom,
            data.convertValidTo,
            data.contract,
            serialDigest,
            account,
            publicKey,
        ); 
        
        const { IpfsHash } = generated;

        const signature = await executeSignCredential(
          json, account, publicKey,
          data.convertValidFrom, data.convertValidTo
        );
        
        const { credentialSubject: { id } } = json;
        
        newCards.push({
            id: i, monthTo: data.monthTo, yearTo: data.yearTo,
            serial: serial, serialDigest: serialDigest,
            IpfsHash: IpfsHash, credentialSubjectID: id
        });
    }
    // End
    setData(prevData => ({ ...prevData, cards: newCards, generatingJson: false }));
    
  }


  const resetData = () => {
    setData(initialState)
  }


  return (
    <React.Fragment>
      <Grid container justify="center">
        <Card className={clsx(classes.margin)}>
          <HeaderStep 
            data={data} 
            updateForm={updateForm} 
            onLastStep={onLastStep}
            resetData={resetData}
          />
        </Card>
      </Grid>
    </React.Fragment>
  )
}
export default FirmPage