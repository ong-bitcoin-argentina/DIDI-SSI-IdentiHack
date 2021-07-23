import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField, FormControl } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// import FolderIcon from '@material-ui/core/FolderIcon';

import CircularProgress from '@material-ui/core/CircularProgress';
import CropFreeIcon from '@material-ui/icons/CropFree';
import DoneIcon from '@material-ui/icons/Done';
import {generateSmartContract} from '../utils/smart';
import { setConfig } from '../service/createTransaction';
import { useMetaMask } from "metamask-react";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'block',
  },
  margin: {
    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(3),
    },
  },
  title: {
    display: 'block',
    textAlign: 'center',
    color: 'gray',
    paddingBottom: theme.spacing(5),
  },
  parraf: {
    paddingBottom: theme.spacing(2),
  },
  secondary: {
      color: 'red'
  }
}));

const Panel_0 = ({data, updateForm}) => {
    const classes = useStyles();
    const classesText = useStylesText();
    // STATUS CONTRATO 'pausa' 'iniciando', 'creado', 'error'
    const [creandoContrato, setCreandoContrato] = React.useState('pausa');
    const { status, connect, account, ethereum, subscribeToChainChanged } = useMetaMask();
    
    // STATUS PARA LLAMAR EL METODO SET CONFIG DEL NUEVO CONTRATO
    // 'stop' 'running' 'error' 'finish'
    const onChange = e => { updateForm({ [e.target.name]: e.target.value }); }

    const generateContract = async () => {
        // Check errors
        const {recorderDID, financialDID } = data;
        if (!financialDID || !recorderDID) {
          alert('Los valores no pueden estar vacios');
          return;
        }
        if (recorderDID?.length < 60 || recorderDID?.length > 80) {
            alert('No es correcto el recorderDID');
            return;
        }

        if (financialDID?.length < 60 || financialDID?.length > 80) {
            alert('No es correcto el financialDID');
            return;
        }

        console.log('financialDID: ', financialDID)

        
        // Creacion del contrato
        setCreandoContrato('iniciando');
        const contractData = await generateSmartContract();
        const {contract,  data: {transactionHash, blockNumber}} = JSON.parse(contractData);

        // Update global data
        updateForm({contract, recorderDID, financialDID, transactionHash, blockNumber});
        console.log('UPDATED EL GLOBAL: ', recorderDID)

        // await new Promise(r => setTimeout(r, 1000));
        setCreandoContrato('creado');
        // -- Fin de creacion del contrato

        // Call contract remote method setConfig
        updateForm({ statusCall: 'running'});

        const response = await setConfig(contract, recorderDID, financialDID, account);
        // console.log('El response es!!!! ', response);
        // await new Promise(r => setTimeout(r, 1000));
        
        updateForm({ statusCall: 'finish', page_0_next: true});
        // -- Fin Call contract remote method setConfig

    }




  return (
    <Grid container direction="column" alignItems="center" justify="center" >
      <Grid item className={clsx(classes.root, classes.margin)}>
          <Typography variant="h4" component="h3" className={classes.title}>
              {(creandoContrato) 
              ?
              <span>Generando Smart Contract</span>
              :
              <span>Smart Contract Generado</span>
              }
          </Typography>
          <Typography variant="subtitle1" className={classes.parraf}>
            Llene este formulario para activar un grupo de tarjetas, que serán entregadas a la cooperativa.
          </Typography>
        <Grid item xs={12}>
            
            <FormControl className={clsx(classesText.textField)}>
                <TextField
                    variant="outlined"
                    label="Dirección Ethereum de la Cooperativa"
                    // helperText="recorderDID"
                    autoComplete="off"
                    name="recorderDID"
                    value={data.recorderDID}
                    onChange={ onChange }
                />
            </FormControl>
            <div><br /></div>
            <FormControl className={clsx(classesText.textField)}>
                <TextField
                    variant="outlined"
                    label="Dirección Ethereum de la Entidad Financiera"
                    // helperText="recorderDID"
                    autoComplete="off"
                    name="financialDID"
                    value={data.financialDID}
                    onChange={ onChange }
                />
            </FormControl>
            <div><br /></div>

            <List dense={false}>
                {/* Generate Contrato */}
                {(creandoContrato !== 'pausa') &&
                <ListItem>
                  <ListItemIcon>
                      {(creandoContrato === 'iniciando') ?
                        <CircularProgress size={30} />
                        :
                        <DoneIcon />
                      }
                  </ListItemIcon>
                  <ListItemText
                    primary="Creando contrato"
                    secondary={(creandoContrato === 'iniciando') ? 'Loading...' : 'Hecho'}
                  />
                </ListItem>
                }

              {(creandoContrato !== 'pausa') &&
                <ListItem button component="a"  target="__blank" 
                  href={`https://resolver.lacchain.net/${data.recorderDID}`}>
                  <ListItemIcon>
                      {(creandoContrato === 'iniciando') ?
                        <CircularProgress size={30} />
                        :
                        <DoneIcon />
                      }
                  </ListItemIcon>
                  <ListItemText
                    primary="Resolviendo DID de Cooperativa"
                    secondary={(creandoContrato === 'iniciando') ? 'Resolviendo...' : 'Hecho'}
                  />
                </ListItem>
                }

            {(creandoContrato !== 'pausa') &&
                <ListItem button component="a"  target="__blank" 
                  href={`https://resolver.lacchain.net/${data.financialDID}`}>
                  <ListItemIcon>
                      {(creandoContrato === 'iniciando') ?
                        <CircularProgress size={30} />
                        :
                        <DoneIcon />
                      }
                  </ListItemIcon>
                  <ListItemText
                    primary="Resolviendo DID de Financiera"
                    secondary={(creandoContrato === 'iniciando') ? 'Resolviendo...' : 'Hecho'}
                  />
                </ListItem>
                }

                {/* Contrato */}
                {(!!data?.contract) &&
                    <ListItem button component="a" target="__blank" 
                        href={`https://explorer.lacchain.net/address/${data.contract}`}
                    >
                    <ListItemIcon>
                        <DoneIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary="Revisar Contrato"
                        secondary={'Has click para ir al explorador de bloques'}
                    />
                    </ListItem>
                }
                {/* Transaccion */}
                {(!!data?.transactionHash) &&
                    <ListItem button component="a" target="__blank" 
                        href={`https://explorer.lacchain.net/tx/${data.transactionHash}`}
                    >
                    <ListItemIcon>
                        <DoneIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary="Revisar la Transacción"
                        secondary={'Has click para ir al explorador de bloques'}
                    />
                    </ListItem>
                }
                {/* Numero de Bloque */}
                {(!!data?.blockNumber) &&
                    <ListItem button component="a" target="__blank" 
                        href={`https://explorer.lacchain.net/block/${data.blockNumber}`}
                    >
                    <ListItemIcon>
                        <DoneIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary="Revisar El Numero de Bloque"
                        secondary={'Has click para ir al explorador de bloques'}
                    />
                    </ListItem>
                }


                 {/* Configurando el contrato */}
                 {(data.statusCall === 'running' || data.statusCall === 'finish') &&
                    <ListItem >
                    <ListItemIcon>
                        {(data.statusCall === 'running') ?
                            <CircularProgress size={30} />
                            :
                            <DoneIcon />
                        }
                    </ListItemIcon>
                    <ListItemText
                        primary="Configurando el Contrato"
                        secondary={'Has click para ir al explorador de bloques'}
                        secondary={(data.statusCall === 'running') ? 'Loading...' : 'Hecho'}
                    />
                    </ListItem>
                }
            </List>
        </Grid>
        {(!data.contract) &&
            <Button variant="contained" color="secondary" onClick={generateContract}>Generar Contrato</Button>
        }
      </Grid>

    </Grid>
  )
}

export default Panel_0;

const useStylesText = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      marginBottom: 20
    },
    margin: {
      margin: theme.spacing(2),
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    textField: {
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '90ch',
      }
}}));