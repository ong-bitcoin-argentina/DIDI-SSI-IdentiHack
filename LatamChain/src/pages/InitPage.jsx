import React, { Fragment } from 'react'
import clsx from 'clsx';
import 'fontsource-roboto';
import Typography from '@material-ui/core/Typography';
import { Grid, Link, Container } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import {Link as LinkRoute} from 'react-router-dom'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StarIcon from '@material-ui/icons/Star';
import { useMetaMask } from "metamask-react";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: '110ch',
    padding: theme.spacing(3),
    minHeight: '80ch',
    margin: '40px auto !important'
  },
  margin: {
    padding: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(1),
    },
  },
  title: {
    textAlign: 'center',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  card: {
    padding: 28,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  }, 
  document: {
    color: 'gray',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
    fontSize: 18,
  },
  gridBtn: {
    textAlign: 'center',
    bottom: 0,
    alignSelf: 'flex-end',
    flex: '1 0 0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    width: '100%',
  }
}));

const InitPage = () => {

  const classes = useStyles();
  const { status } = useMetaMask();

  return (
    <Container fixed={true} maxWidth="md">
        <Card className={clsx(classes.margin, classes.root, classes.card)}>
            <Grid container>
                <Grid item md={12}>
                    <Typography variant="h5" component="h5" className={clsx(classes.title)}>
                    LA BILLETERA RURAL
                    </Typography>
                </Grid>
                {/* Columns */}
                <Grid item md={12} lg={6} style={{ width: '100%' }} >
                    <div className="principal_btn_container">
                    { (status === "connected") ? 
                        <Button 
                            variant="contained" 
                            size="large" 
                            color="primary" 
                            component={LinkRoute}
                            to="/form"
                        >Generar Tarjeta</Button>
                        :
                        <span>Por Favor conectarse a Metamask</span>
                      } 
                    </div>
                </Grid>

                {/* Columns */}
                <Grid item md={12} lg={6}>
                    <Typography component="p" className={classes.document}>
                        La tarjeta CRIPTOCARD gestionada por DIDI permitirá al titular:
                    </Typography>

                    
                    
                    
                    <List component="nav" aria-label="contacts">
                        <ListItem>
                            <ListItemIcon>
                                <StarIcon />
                            </ListItemIcon>
                            <ListItemText primary="Identificarse para reclamar ante cualquier emisor sus credenciales verificables que le otorgue puntaje en su rating crediticio, producción responsable, conservación ecológica o de responsabilidad social." />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <StarIcon />
                            </ListItemIcon>
                            <ListItemText primary="Recibir orden de pagos (tokens) para ser canjeados en las entidades financieras afiliadas." />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <StarIcon />
                            </ListItemIcon>
                            <ListItemText primary="Realizar pruebas de conocimiento cero para transferir tokens a una entidad financiera." />
                        </ListItem>

                        </List>
                </Grid>

            </Grid>
              <Typography variant="body2" component="p" className={clsx(classes.title)}>
                CON CAPACIDAD DE TRANSPORTAR DINERO Y CREDENCIALES VERIFICABLES
            </Typography>
        </Card>
    </Container>
  )
}
export default InitPage