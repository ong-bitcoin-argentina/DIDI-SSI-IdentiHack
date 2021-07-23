import React from 'react';
import { Grid, Typography, Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

const style = {
    height: 350
}

const IndicatorCreatingJson = () => {
    return(
        <div style={style}>
            <Typography variant="h6" color="textSecondary" component="h6">
                <CircularProgress size={30} />
                {'   '}Subiendo los archivos al IPFS
            </Typography>
        </div>
    )
}

export default IndicatorCreatingJson;