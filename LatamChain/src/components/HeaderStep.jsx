import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';

import Panel_0 from '../panels/Panel_0'
import Panel_1 from '../panels/Panel_1'
import Panel_2 from '../panels/Panel_2'
import PanelFinish from '../panels/Finish'


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(2),
  },
  buttonDiv: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
    textAlign: 'right',
    paddingRight: 30,
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    width: '100%',
    minHeight: '70ch',
    [theme.breakpoints.up('md')]: {
      width: '100ch',
    }
  },
}));

function getSteps() {
  return ['Generar contrato', 'Creación de Anexo 1', 'Generación de Tarjetas'];
}

const PAGE_CONTRACT = 0;
const PAGE_ANEXO = 1;
const PAGE_TARJETA = 2;

const HeaderStep = ({data, updateForm, onLastStep, resetData}) => {
 
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const [loading, setLoading] = React.useState(false);


  const handleNext = async () => {

    // Is last step
    if (isLastStep()){
      setLoading(true)
      await onLastStep()
      setLoading(false)
    }

    // Go to new page
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    // setLoading(false)
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    resetData();
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <Panel_0 data={data} updateForm={updateForm}/>;
      case 1:
        return <Panel_1 data={data} updateForm={updateForm} />;
      case 2:
        // generateSha256();
        return <Panel_2 data={data} updateForm={updateForm} />;
      default:
        return 'Ha ocurrido un error';
    }
  }

  const isLastStep = () => (activeStep === steps.length - 1)

  const isDisabledBtn = () => {
    if (activeStep === PAGE_CONTRACT) {
      return !data.page_0_next;
    } else if (activeStep === PAGE_ANEXO) {
      return false;
    } else if (activeStep === PAGE_TARJETA) {
      return !data.page_final_next;
    }
    return true;
  }

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <PanelFinish data={data} />
            <Button onClick={handleReset} className={classes.button} variant="contained" color="primary" disableElevation>
              Crear otro grupo de Tarjetas
            </Button>
          </div>
        ) : (
          <div>
            <div className={classes.instructions}>{getStepContent(activeStep)}</div>

            <div className={classes.buttonDiv}>
              <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                Atrás
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                disabled={isDisabledBtn() || loading}
                className={classes.button}
              >
                {isLastStep() ? 'Terminar' : 'Siguiente'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HeaderStep