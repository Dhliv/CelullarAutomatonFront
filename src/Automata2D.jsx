import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import Cell from "./Cell";

/**
 * 
 * @param {{initialState: boolean, ruleState: bool, currentStep: int}} props 
 * @returns 
 */
export default function Automata2D(props) {
  const [state, setState] = useState([]);

  const showCells = () => {
    let cells = [];

    if (!props.ruleState) {
      for (let i = 0; i < 10; i++) {
        let row = [];

        for (let j = 0; j < 10; j++) {
          row.push(<Cell id={i * 10 + j} initial={props.initialState} is_alive={i % 2 == 0 ? true : false} currentStep={props.currentStep} />)
        }
        cells.push(<Grid container>
          {row}
        </Grid>)
      }
    } else {

      let row1 = [], row2 = [], row3 = [];
      for (let i = 0; i < 3; i++) {
        row1.push(<Cell id={i} initial={true} rule={true} currentStep={props.currentStep} />)
        row3.push(<Cell id={6 + i} initial={true} rule={true} currentStep={props.currentStep} />)
      }

      row2.push(<Cell id={3} initial={true} rule={true} currentStep={props.currentStep} />)
      row2.push(<Cell id={4} initial={true} inmutable={true} rule={true} currentStep={props.currentStep} />)
      row2.push(<Cell id={5} initial={true} rule={true} currentStep={props.currentStep} />)

      cells.push(<Grid container>{row1}</Grid>)
      cells.push(<Grid container>{row2}</Grid>)
      cells.push(<Grid container>{row3}</Grid>)
    }

    return cells;
  }

  return (
    <Grid justifyContent="center" alignItems="center">
      {showCells()}
    </Grid>
  )
}