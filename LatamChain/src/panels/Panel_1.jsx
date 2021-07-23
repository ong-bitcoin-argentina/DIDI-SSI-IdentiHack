import React, { Fragment, useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import ErrorIcon from '@material-ui/icons/Error';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DoneIcon from '@material-ui/icons/Done';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'block',
    width: '100%'
  },
  title: {
    color: 'gray',
    marginBottom: 10,
  },
  anexo: {
      fontSize: 30
  },
  rootPaper: {
    padding: 10,
    textAlign: 'center',
    fontSize: 20
  },
  elemnts: {
      marginBottom: 20
  }
}));

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const Panel_1 = ({data, updateForm, errors}) => {
  const classes = useStyles();
  const [random, setRandom] = useState(null);

  useEffect(()=>{
    setRandom(getRandomInt(1111, 9999))
  }, [])



  if (!random) {
    return null;
  }

  return (
    <Grid container direction="column" alignItems="center" justify="center" >
      <Grid item className={clsx(classes.root)}>

        <div className="container-qr-code">
            <img src="https://static-unitag.com/images/help/QRCode/qrcode.png" />
            <Typography variant="subtitle1" className={classes.anexo} component="h2">
                Anexo 1
            </Typography>
        </div>

        <ElementS 
            name="Contrato"
            value={(data.contract?.length > 0) ? data.contract : "0xdc10b04254b5e74ebff158652af41934EXAMPLE"}
        />
        <ElementS
            name="Santo (SHIB)"
            value={random}
            extraComponent={
                <span className="warning-icon-alert">
                    <ErrorIcon />
                    No se debe mostrar solo es un ejemplo para la demo
                </span>
            }
        />


        <Typography variant="subtitle1">Credenciales enviadas a DIDI:</Typography>
        <List dense={false}>
            <ListItemElement 
                title="Financiera transacción"
                tx={'0xdc10b04254b5e74ebff158652af41934EXAMPLE'}
            />
            <ListItemElement 
                title="Cooperativa transacción"
                tx={'0xdc10b04254b5e74ebff158652af41934EXAMPLE'}
            />
        </List>

        {(errors) &&
          <Typography color="error">Debes agregar un fichero para continuar.</Typography>}
      </Grid>
    </Grid>
  )
}

export default Panel_1;

const ListItemElement = ({title, tx}) => {
    return (
        <ListItem>
            <ListItemIcon>
                <DoneIcon />
            </ListItemIcon>
            <ListItemText
                primary={title}
                secondary={tx}
            />
        </ListItem>
    )
}


const ElementS = ({name, value, extraComponent=null}) => {
    const classes = useStyles();
    return (
        <div className={classes.elemnts}>
            <Typography variant="h6" className={classes.title} component="h6">
                {name}:
                {(!!extraComponent) && <Fragment>{extraComponent}</Fragment>}
            </Typography>
            <Paper variant="outlined" className={classes.rootPaper}>
                {value}
            </Paper>
        </div>
    )
}