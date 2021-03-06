import React, { useState} from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import HomeIcon from '@material-ui/icons/Home';
import Tooltip from '@material-ui/core/Tooltip';
import { useHistory } from "react-router-dom";
import {Link} from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import MetamaskComponent from './MetamaskComponent';
import { useMetaMask } from "metamask-react";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    color: theme.palette.common.white,
    textDecoration: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingIcon: {
    padding: theme.spacing(1),
    color: theme.palette.common.white,
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '70ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  }
}));

export default function PrimarySearchAppBar() {

  const classes = useStyles();
  const history = useHistory();
  const { status } = useMetaMask();

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const redirectPage = (digest) => {
    history.push(`/check/${digest}`)
  }

  const keyPress = e => {
    const digest = e.target.value
    if(e.keyCode === 13){
      redirectPage(digest)
    }
  }

  const onPaste = e => {
    const digest = e.clipboardData.getData('Text')
    redirectPage(digest)
  }

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem component={Link} to='/'>
        <IconButton aria-label="inicio" color="inherit" >  
          <HomeIcon />
        </IconButton>
        <p>Inicio</p>
      </MenuItem>
      <MenuItem component={Link} to='/form'>
        <IconButton aria-label="firmar archivos" color="inherit" >
          <BorderColorIcon />
        </IconButton>
        <p>Firmar archivos</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap component={Link} to="/">
            DIDI Billetera Rural
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              {/* {(loading) ?
                <CircularProgress color="secondary" className={classes.loadingIcon} />
                :
                <SearchIcon />
              } */}
            </div>
            {/* <InputBase
              placeholder="Verifica tu hash"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onKeyDown={keyPress}
              onPaste={onPaste}
            /> */}
          </div>

          <div className={classes.grow} />

          {/* Desktop section */}
          <div className={classes.sectionDesktop}>
            <MetamaskComponent />
            <Tooltip title="Inicio">
              <IconButton aria-label="home" color="inherit" component={Link} to='/'>
                <HomeIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Generar">
              
              <IconButton disabled={status !== "connected" } aria-label="firmar archivos" color="inherit" component={Link} to='/form'>
                <BorderColorIcon />
              </IconButton>
            </Tooltip>
          </div>

          {/* Mobil Section */}
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </div>
  );
}