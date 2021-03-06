import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
  },
  connected: {
    textTransform: 'capitalize',
  }
}));

const Copyright = () => {
  const classes = useStyles()
  const connected = process.env.REACT_APP_DCRTIME_NETWORK || 'mainnet'
  return (
    <Typography variant="body2" color="textSecondary" align="center" className={classes.root}>
      {'Copyright © '}
      <Link color="inherit" href="https://hyperhack.io/">
        DIDI HYPERHACK
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}
export default Copyright