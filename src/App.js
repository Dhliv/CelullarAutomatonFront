import './App.css';
import { Button, Card, Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import Automata1D from './Automata1D';

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: "#CACACA",
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#11cb5f',
    },
  },
});

function App() {
  const [selectedAutomata, setSelectedAutomata] = useState("");
  const [initialState, setInitialState] = useState(false);
  const [ruleState, setRuleState] = useState(true);
  const [currenStep, setCurrentStep] = useState(-3);

  const handleAutomata = (e) => {
    if (currenStep == -2) transition();
    setCurrentStep(-1);
    setInitialState(false);
    setRuleState(true);
    let id = e.target.id;
    setSelectedAutomata(id);
  }

  const showAutomata = () => {
    if (selectedAutomata == "1D") {
      return <Automata1D ruleState={ruleState} initialState={initialState} />
    }

    return <></>
  }

  const transition = () => {
    setCurrentStep(currenStep + 1);
  }

  const redoTransition = () => {
    setCurrentStep(currenStep - 1);
  }

  const startAutomata = () => {
    transition();
    setInitialState(false);
  }

  const showButtons = () => {
    if (currenStep == -3) {
      return (<></>)
    }
    if (currenStep == -2) {
      return (<></>)
    }
    if (currenStep == -1) {
      return (
        <>
          <Grid item xs={3} />

          <Grid item xs={6}>
            <Button id="1D" variant='contained' onClick={startAutomata}>
              Iniciar
            </Button>
          </Grid>

          <Grid item xs={3} />
        </>
      )
    }

    return (
      <>
        <Grid item xs={6}>
          <Button id="1D" variant='contained' onClick={redoTransition} disabled={currenStep > 0 ? false : true}>
            Anterior
          </Button>
        </Grid>

        <Grid item xs={6}>
          <Button id="2D" variant='contained' onClick={transition}>
            Siguiente
          </Button>
        </Grid>
      </>
    )
  }

  return (
    <div className="App">
      <header className="App-header">
        <ThemeProvider theme={theme}>
          <Grid container>
            <Grid item xs={6}>
              <Button id="1D" variant='contained' onClick={handleAutomata} disabled={selectedAutomata == "1D" ? true : false}>
                Autómata 1D
              </Button>
            </Grid>

            <Grid item xs={6}>
              <Button id="2D" variant='contained' onClick={handleAutomata} disabled={selectedAutomata == "2D" ? true : false}>
                Autómata 2D
              </Button>
            </Grid>
          </Grid>
        </ThemeProvider>

        <Grid container style={{ padding: '50px' }}>
          {showAutomata()}
        </Grid>

        <Grid container>
          {showButtons()}
        </Grid>
      </header>
    </div>
  );
}

export default App;
