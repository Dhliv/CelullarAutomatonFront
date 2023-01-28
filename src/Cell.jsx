import { useState } from "react";
import Card from '@mui/material/Card';
import { Grid } from "@mui/material";

const colors = ["FFFFFF", "23A500", "D10000", "096FE2"];
const INMUTABLE = 3
const DEAD = 2
const ALIVE = 1
/**
 * 
 * @param {{is_alive: bool, initial: bool, inmutable: bool, rule: bool, id: int, currentStep: int}} props 
 * @returns 
 */
export default function Cell(props) {
  const [hover, setHover] = useState(false);
  const [steps, setSteps] = useState(0);

  const showColor = () => {
    if (props.inmutable) return colors[INMUTABLE];
    if (props.initial && hover) {
      return "838383"
    }
    if (props.initial) return colors[steps];
    if (props.is_alive) return colors[ALIVE];
    return colors[DEAD];
  }

  const handleClick = (e) => {
    if (!props.initial || props.inmutable) return;
    setSteps((steps + 1) % (colors.length - 1));
    let id = e.target.id;
    sessionStorage.setItem(id, `${(steps + 1) % (colors.length - 1)}`);
  }

  const getCellSize = () => {
    if(props.rule) return "70px";
    let dimension = localStorage.getItem("dimension");
    if(dimension === "1D") return "8px";
    return "16px";
  }

  return (
    <>
      <Card key={`Cell_${props.id}`} style={{ backgroundColor: `#${showColor()}` }}
        onMouseEnter={() => { setHover(true) }}
        onMouseLeave={() => { setHover(false) }}
        onClick={handleClick}>
        <Grid key={`Cell_grid_${props.id}`} id={props.id}
          style={{ padding: `${getCellSize()}` }} />
      </Card>
    </>
  )
}