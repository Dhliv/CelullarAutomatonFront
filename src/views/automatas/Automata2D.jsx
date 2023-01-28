import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import Cell from "../../Cell";

/**
 * 
 * @param {{initialState: boolean, ruleState: bool, currentStep: int, board: bool[][]}} props 
 * @returns 
 */
export default function Automata2D(props) {
  const [Board, SetBoard] = useState(props.board)
  useEffect(() => {
    SetBoard(props.board)
  }, [props.board])

  const ShowRuleState = () => {
    let cells = [];
    let row1 = [], row2 = [], row3 = [];
    for (let i = 0; i < 3; i++) {
      row1.push(<Cell key={`automaton2D_${i}`} id={i} initial={true} rule={true} currentStep={props.currentStep} />)
      row3.push(<Cell key={`automaton2D_${6 + i}`} id={6 + i} initial={true} rule={true} currentStep={props.currentStep} />)
    }

    row2.push(<Cell key={`automaton2D_3`} id={3} initial={true} rule={true} currentStep={props.currentStep} />)
    row2.push(<Cell key={`automaton2D_4`} id={4} initial={true} inmutable={true} rule={true} currentStep={props.currentStep} />)
    row2.push(<Cell key={`automaton2D_5`} id={5} initial={true} rule={true} currentStep={props.currentStep} />)

    cells.push(<Grid key={`automaton2D_grid_1`} container>{row1}</Grid>)
    cells.push(<Grid key={`automaton2D_grid_2`} container>{row2}</Grid>)
    cells.push(<Grid key={`automaton2D_grid_3`} container>{row3}</Grid>)

    return cells
  }

  const ShowInitialAutomaton = () => {
    let cells = [];

    for (let i = 0; i < 10; i++) {
      let row = [];

      for (let j = 0; j < 10; j++) {
        row.push(<Cell key={`cell_${i},${j}`} id={i * 10 + j} initial={props.initialState} is_alive={false} currentStep={props.currentStep} />)
      }

      cells.push(<Grid key={`grid_${i}`} container>
        {row}
      </Grid>)
    }

    return cells;
  }

  const ShowAutomaton = () => {
    let cells = [];
    for (let i = 0; i < 10; i++) {
      let row = [];

      for (let j = 0; j < 10; j++) {
        row.push(<Cell id={i * 10 + j} initial={props.initialState} is_alive={Board[i][j]} currentStep={props.currentStep} />)
      }

      cells.push(<Grid container>
        {row}
      </Grid>)
    }

    return cells;
  }

  return (
    <Grid justifyContent="center" alignItems="center">
      {props.ruleState ? <ShowRuleState /> :
        props.board == null ? <ShowInitialAutomaton />
          : <ShowAutomaton />
      }
    </Grid>
  )
}