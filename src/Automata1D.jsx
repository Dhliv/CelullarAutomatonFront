import { useState } from "react";
import Cell from "./Cell";

/**
 * 
 * @param {{initialState: boolean, ruleState: bool}} props 
 * @returns 
 */
export default function Automata1D(props) {
  const [state, setState] = useState([]);

  const showCells = () => {
    let cells = []

    if (!props.ruleState) {
      for (let i = 0; i < 100; i++) {
        cells.push(<Cell initial={props.initialState} is_alive={i % 2 == 0 ? true : false} />)
      }
    } else {
      cells.push(<Cell initial={true} rule={true} />)
      cells.push(<Cell initial={true} inmutable={true} rule={true} />)
      cells.push(<Cell initial={true} rule={true} />)
    }

    return cells;
  }

  return (
    <>
      {showCells()}
    </>
  )
}