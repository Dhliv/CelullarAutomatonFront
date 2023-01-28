import './App.css';
import { Button, Grid, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import Automata1D from './views/automatas/Automata1D';
import Automata2D from './views/automatas/Automata2D';
import { getRules1D, getRules2D, getBoard1D, getBoard2D } from './utils/utils.js';
import { firstPetitionAutomaton1D, firstPetitionAutomaton2D, NextState, PreviousState } from './utils/automata';

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
  const [ruleState, setRuleState] = useState(false);
  const [currenStep, setCurrentStep] = useState(-3);
  const [pattern, setPattern] = useState(null);
  const [board, setBoard] = useState(null);

  useEffect(() => {
    setInitialState(false);
    setRuleState(true);
    setCurrentStep(-3);
    sessionStorage.clear();
  }, [])

  const handleAutomata = (e) => {
    if (selectedAutomata !== "") {
      sessionStorage.clear();
      setCurrentStep(-2);
      setInitialState(false);
      setRuleState(true);
      setBoard(null);
    } else transition();

    let id = e.target.id;
    setSelectedAutomata(id);
    localStorage.setItem("dimension", `${id}`);
  }

  const ShowAutomata = () => {
    if (selectedAutomata === "1D")
      return <Automata1D
        ruleState={ruleState}
        initialState={initialState}
        currentStep={currenStep}
        board={board} />

    if (selectedAutomata === "2D")
      return <Automata2D
        ruleState={ruleState}
        initialState={initialState}
        currentStep={currenStep}
        board={board} />

    return <></>
  }

  const transition = async () => {
    setCurrentStep(currenStep + 1);

    if(currenStep >= 0){
      const board = await NextState()
      setBoard(board)
    }
  }

  const redoTransition = async () => {
    setCurrentStep(currenStep - 1);
    if(currenStep >= 0){
      const board = await PreviousState()
      setBoard(board)
    }
  }

  const startAutomata = async () => {
    setInitialState(false);

    let ultimateBoard = null;
    if (selectedAutomata === "1D") ultimateBoard = await firstPetitionAutomaton1D(getBoard1D(), pattern);
    else ultimateBoard = await firstPetitionAutomaton2D(getBoard2D(), pattern);
    setBoard(ultimateBoard);
    transition();
  }

  const establishRule = () => {
    transition();
    setRuleState(false);
    setInitialState(true);
    
    if (selectedAutomata === "1D") setPattern(getRules1D());
    else setPattern(getRules2D());
    sessionStorage.clear();
  }

  const ShowButtons = () => {
    if (currenStep === -3) {
      return (<></>)
    }
    if (currenStep === -2) {
      return (<>
        <Grid item xs={3} />

        <Grid item xs={6}>
          <Button id="1D" variant='contained' onClick={establishRule}>
            Establecer regla de transición
          </Button>
        </Grid>

        <Grid item xs={3} />
      </>)
    }
    if (currenStep === -1) {
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

  const ShowText = () => {
    if (currenStep === -3) {
      return (
        <Grid>
          <Typography variant="h4" gutterBottom>
            Elija un tipo de autómata celular
          </Typography>
        </Grid>
      )
    }
    if (ruleState) {
      return (
        <Grid>
          <Typography variant="h4" gutterBottom>
            Establezca la regla
          </Typography>

          <Typography variant="h5" gutterBottom>
            Celda en blanco es indiferente. Celda verde exije que esté viva la celda. Celda roja exije que esté muerta la celda.
          </Typography>
        </Grid>
      )
    }

    if (initialState) {
      return (
        <Grid>
          <Typography variant="h4" gutterBottom>
            Establezca el estado inicial
          </Typography>

          <Typography variant="h5" gutterBottom>
            Celda en blanco es indiferente. Celda verde implica que está viva la celda. Celda roja implica que está muerta la celda.
          </Typography>
        </Grid>
      )
    }

    return <></>
  }

  return (
    <div className="App">
      <header className="App-header">
        <ThemeProvider theme={theme}>
          <Grid container>
            <Grid item xs={6}>
              <Button id="1D"
                variant='contained'
                onClick={handleAutomata}
                disabled={selectedAutomata === "1D"}
              >
                Autómata 1D
              </Button>
            </Grid>

            <Grid item xs={6}>
              <Button id="2D"
                variant='contained'
                onClick={handleAutomata}
                disabled={selectedAutomata === "2D"}>
                Autómata 2D
              </Button>
            </Grid>
          </Grid>
        </ThemeProvider>

        <Grid container
          style={{ padding: '50px' }}
          justifyContent="center"
          alignItems="center">
          {<ShowText />}
        </Grid>

        <Grid container
          style={{ padding: '50px' }}
          justifyContent="center"
          alignItems="center">
          {<ShowAutomata />}
        </Grid>

        <Grid container>
          {<ShowButtons />}
        </Grid>
      </header>
    </div>
  );
}

export default App;
