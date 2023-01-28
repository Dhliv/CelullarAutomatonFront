import { useEffect, useState } from "react";
import Cell from "../../Cell";

/**
 * 
 * @param {{initialState: bool, ruleState: bool, currentStep: int, board: bool[]}} props 
 * @returns 
 */
export default function Automata1D(props) {

  const [Board, SetBoard] = useState(props.board)
  useEffect(() => {
    SetBoard(props.board)
  }, [props.board])

  const ShowRuleState = () => {
    return [
      <Cell id={0}
        key={`cell_rule_0`}
        initial={!props.initialState}
        rule={props.ruleState}
        currentStep={props.currentStep}
        is_alive={!props.initialState} />,

      <Cell id={1}
        key={`cell_rule_1`}
        initial={!props.initialState}
        inmutable={props.ruleState}
        rule={props.ruleState}
        currentStep={props.currentStep}
        is_alive={!props.initialState} />,
      <Cell id={2}
        key={`cell_rule_2`}
        initial={!props.initialState}
        rule={props.ruleState}
        currentStep={props.currentStep}
        is_alive={!props.initialState} />
    ]
  }

  const ShowInitialAutomaton = () => {
    let cells = []
    for (let i = 0; i < 100; i++) {
      cells.push(
        <Cell id={i}
          initial={props.initialState}
          is_alive={false}
          currentStep={props.currentStep} />)
    }
    const allCells = cells
    return allCells
  }

  const ShowAutomaton = () => {
    let cells = []

    for (let i = 0; i < 100; i++) {
      cells.push(
        <Cell id={0}
          key={`cell_rule_${i}_board`}
          initial={false}
          rule={false}
          inmutable={false}
          currentStep={props.currentStep}
          is_alive={Board[i]} />
      )
    }

    const allCells = cells
    return allCells
  }

  return (
    props.ruleState ? <ShowRuleState /> :
      props.board == null ? <ShowInitialAutomaton />
        : <ShowAutomaton />

  )
}