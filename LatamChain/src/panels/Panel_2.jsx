import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField, FormControl } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import factory from '../service/campaignfactory';
import {createTransaction} from '../service/createTransaction';
import { digestMessage } from '../helpers/utils-keys'
import { generateDate } from '../helpers/utils-time';

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
  }
}));

const Panel_2 = ({data, updateForm}) => {
  const classes = useStyles();
  const classesText = useStylesText()

  const [dataForm, setDataForm] = React.useState({
    recorderDID: '', financialDID: '', serialFrom: 1, serialTo: 4,
    validFrom: generateDate(), validTo: generateDate(1)
  }); 

    const getAbs = async () => {
        const url = 'https://ipfs.io/ipfs/QmUeyGZLp7xmmNVW8Y5pRe5ZkcqXFJEzYUNcXzC1tVkEUf';
        const response = await fetch(url)
        const text = await response.text();
        const abs = JSON.parse(text);
        console.log('El abs es; ', abs);
        const { output: { abi } } = abs;
        return abi;
    }

    const generateTransaccionV = async (recorderDID, financialDID, serialFrom, serialTo, validFrom, validTo) => {
        const abi = await getAbs();
        const erc20controlContract = await factory(data.contract, abi);
        // console.log('factory: ', erc20controlContract);
        
        const hashSerialCard = await digestMessage(new Date().toString());
        console.log('hashSerialCard: ', hashSerialCard)
        const signature = hashSerialCard;
        const financialDIDClean = financialDID.replace('did:ethr:lacchain:', '');
        const recorderDIDClean = recorderDID.replace('did:ethr:lacchain:', '');

        const dataSend = erc20controlContract
            .methods["enrollSerialCard"](recorderDIDClean, financialDIDClean, serialFrom, serialTo, validFrom, validTo, `0x${hashSerialCard}`, `0x${signature}`)
            .encodeABI();
        

        createTransaction(data.contract, dataSend);
        // TODO: QUE DEVUELVE
    }


    const onSubmit = e => {
        e.preventDefault();
        const { serialFrom, serialTo, validFrom, validTo } = dataForm;

        if (!serialFrom || !serialTo || (parseInt(serialFrom) > parseInt(serialTo))) {
            alert('ERROR: EL Serial From debe ser mayor o igual que el Serial To');
            return;
        }

        const dif = parseInt(serialTo) - parseInt(serialFrom);
        if (dif >= 4) {
            alert('Por favor esto es un demo use una diferencia de 4 o menor');
            return;
        }

        // Convert ISO
        const convertValidFrom = new Date(validFrom).toISOString() ;
        const convertValidTo =  new Date(validTo).toISOString();

        const monthTo = new Date(validTo).getUTCMonth() + 1;
        const yearTo = new Date(validTo).getFullYear().toString().slice(2);
        // Guardamos en el data
        updateForm({
            serialFrom, serialTo, convertValidFrom, convertValidTo,
            validFrom, validTo, monthTo, yearTo, page_final_next: true
        })
    }

    const onChangeForm = (e) => {
        console.log(e.target.value)
        //updateForm({[e.target.name]: e.target.value });
        setDataForm(prevData =>({...prevData, [e.target.name]: e.target.value }));
    }


    
    React.useEffect(()=>{
        // init();
    }, [])

  return (
    <Grid container direction="column" alignItems="center" justify="center" >
      <Grid item className={clsx(classes.root, classes.margin)}>
          <Typography variant="h4" component="h3" className={classes.title}>
            Activación de Serial Card
          </Typography>
          <Typography variant="subtitle1" className={classes.parraf}>
            Llene este formulario para activar un grupo de tarjetas, que serán entregadas a la cooperativa.
          </Typography>
        
        <form onSubmit={onSubmit}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                <Grid item md={5}>
                    <FormControl className={clsx(classesText.textField, classesText.inline)}>
                        <TextField
                            variant="outlined"
                            label="serialFrom"
                            // helperText="serialFrom"
                            autoComplete="off"
                            name="serialFrom"
                            value={dataForm.serialFrom}
                            onChange={ onChangeForm }
                            classes={{root: classesText.rootBtn}}
                            type="number"
                        />
                    </FormControl>
                </Grid>
                <Grid item md={5}>
                    <FormControl className={clsx(classesText.textField, classesText.inline)}>
                        <TextField
                            variant="outlined"
                            label="serialTo"
                            // helperText="serialTo"
                            autoComplete="off"
                            name="serialTo"
                            value={dataForm.serialTo}
                            onChange={ onChangeForm }
                            classes={{root: classesText.rootBtn}}
                            type="number"
                        />
                    </FormControl>
                </Grid>
            </div>
            

            <div><br /></div>
            <div><br /></div>
            <FormControl className={clsx(classesText.textField)}>
                <TextField
                    id="validFrom"
                    variant="outlined"
                    type="date"
                    label="validFrom"
                    autoComplete="off"
                    name="validFrom"
                    value={dataForm.validFrom}
                    onChange={ onChangeForm }
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </FormControl>
            <div><br /></div>

            <FormControl className={clsx(classesText.textField)}>
                <TextField
                    id="validTo"
                    variant="outlined"
                    type="date"
                    label="validTo"
                    autoComplete="off"
                    name="validTo"
                    value={dataForm.validTo}
                    onChange={ onChangeForm }
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </FormControl>
            <div><br /></div>

            <FormControl className={clsx(classesText.textField)}>
                <Button  
                  type="submit" 
                  variant="contained" 
                  disabled={!!data.page_final_next}
                  color="secondary">Guardar</Button>
            </FormControl> 
        </form>
        <div><br /></div>
      </Grid>
    </Grid>
  )
}

export default Panel_2;


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
        width: '100%',
        }
    },
    inline: {
        display: 'inline-block',
        width: '100%'
    },
    rootBtn: {
        width: '100%'
    }
}));