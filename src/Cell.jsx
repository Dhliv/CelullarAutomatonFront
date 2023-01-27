import { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import { Button, Grid } from "@mui/material";

const colors = ["FFFFFF", "23A500", "D10000", "096FE2"];

/**
 * 
 * @param {{is_alive: bool, initial: bool, inmutable: bool, rule: bool}} props 
 * @returns 
 */
export default function Cell(props) {
  const [state, setState] = useState(props.is_alive);
  const [hover, setHover] = useState(false);
  const [steps, setSteps] = useState(0);
  const [color, setColor] = useState(null);

  useEffect(() => {
    if (props.inmutable) setColor(colors[3]);
    else setColor(props.initial ? colors[0] : showColor());
  }, [])

  useEffect(() => {
    if (!props.initial || props.inmutable) return;
    if (hover) setColor("838383");
    else setColor(showColor());
  }, [hover])

  useEffect(() => {
    if (props.inmutable) return;
    setColor(colors[steps]);
  }, [steps])

  const showColor = () => {
    if (props.inmutable) return colors[3];
    if (props.initial) return colors[steps];
    if (state) return colors[1];
    return colors[2];
  }

  const handleClick = () => {
    if (!props.initial || props.inmutable) return;
    setSteps((steps + 1) % 3);
  }

  return (
    <Card style={{ backgroundColor: `#${color}` }} onMouseEnter={() => { setHover(true) }} onMouseLeave={() => { setHover(false) }} onClick={handleClick}>
      <Grid style={{ padding: `${props.rule ? '70px' : '10px'}` }} />
    </Card>
  )
}