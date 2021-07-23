import React, { useState, useEffect, Fragment } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Button } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import Card from '../components/Card';
import IndicatorCreatingJson from '../components/IndicatorCreatingJson';


const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('md')]: {
      maxWidth: '120ch',
    },
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  instruction: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  title: {
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    paddingTop: 30,
    paddingBottom: 20,
  },
  card: {
    padding: 4,
    marginBottom: 10,
    wordWrap: 'break-word'
  },
  margins: {
    marginTop: 20,
    outline: 'none',
  }
}));

const PanelFinish = ({data}) => {
  const classes = useStyles()
  console.log('DATA: ', data)

  return (
    <Grid container direction="column" alignItems="center" justify="center">
      <Grid item className={clsx(classes.instruction, classes.root)}>
        <Typography variant="h4" color="textSecondary" component="h4" className={classes.title}>
          Tarjetas Generadas
        </Typography>

        <Typography variant="body2" color="textSecondary" component="p" className={classes.subtitle}>
          Se recomienda imprimir en plástico las tarjetas. Las información en las tarjetas puede tener una duración indefinida. Favor de adjuntar con un folleto explicativo.
        </Typography>
        {(data.generatingJson) ? 
            <IndicatorCreatingJson />
            :
            <React.Fragment>
                <div><br /></div>
                <div><br /></div>
                <div style={{textAlign: 'center'}}>
                  {data.cards.map((v)=>(
                      <div key={v.id} style={{ paddingBottom: 50}}>
                          <Card 
                              iter={v.id + 10000}
                              month={v.monthTo}
                              year={v.yearTo}
                              IpfsHash={v.IpfsHash}
                              serial={v.serial}
                              serialDigest={v.serialDigest}
                          />

                          <a 
                              style={{ display: 'block', marginTop: 10, fontSize: 18}}
                              href={`https://ipfs.io/ipfs/${v.IpfsHash}`}
                              target="_blank"
                          >
                              {`did:cid:ipfs:${v.IpfsHash}`}
                          </a>
                          <a 
                              style={{ display: 'block', marginTop: 10, fontSize: 18}}
                              href={ `https://resolver.lacchain.net/did:ethr:lacchain:${v.credentialSubjectID.replace('did:ethr:lachain:', '')}` }
                              target="_blank"
                          >
                              {v.credentialSubjectID}
                          </a>
                      </div>
                  ))}
                </div>
            </React.Fragment>
        }

        {(!!data.mail) &&
          <Typography variant="body1" color="textSecondary" component="p">
            Email: {data.email}
          </Typography>
        }

        
        <div><br /></div>
      </Grid>
    </Grid>
  )
}

export default PanelFinish