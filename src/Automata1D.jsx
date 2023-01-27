import { useEffect, useState } from "react";
import Cell from "./Cell";

/**
 * 
 * @param {{initialState: bool, ruleState: bool, currentStep: int, board: bool[]}} props 
 * @returns 
 */
export default function Automata1D(props) {
  const [realCells, setRealCells] = useState([]);

  useEffect(() => {
    setRealCells([]);
    showCells();
  }, [props.currentStep])

  const showCells = () => {
    let cells = [];

    if (!props.ruleState) {
      if (props.board != null) {
        for (let i = 0; i < 100; i++) {
          cells.push(
            <Cell id={i} initial={false} is_alive={props.board[i]} currentStep={props.currentStep} />
          )
        }
        console.log("Board getted", props.board);
      } else {
        for (let i = 0; i < 100; i++) {
          cells.push(<Cell id={i} initial={props.initialState} is_alive={false} currentStep={props.currentStep} />)
        }
      }
    } else {
      cells.push(<Cell id={0} initial={!props.initialState} rule={props.ruleState} currentStep={props.currentStep} is_alive={!props.initialState} />)
      cells.push(<Cell id={1} initial={!props.initialState} inmutable={props.ruleState} rule={props.ruleState} currentStep={props.currentStep} is_alive={!props.initialState} />)
      cells.push(<Cell id={2} initial={!props.initialState} rule={props.ruleState} currentStep={props.currentStep} is_alive={!props.initialState} />)
    }

    setRealCells(cells);
  }

  return (
    <>
      {realCells}
    </>
  )
}