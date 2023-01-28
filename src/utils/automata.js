import axios from 'axios'
import {AUTOMATON} from "./../constants/urls"

async function firstPetitionAutomaton1D(board, pattern) {

  const body = {
    Board: board,
    Pattern: pattern
  }

  let data;
  try {
    const response = await axios.post(`${AUTOMATON}init_automaton1D`, body)
    // data = String2boolArray(
    data = response.data
      // );
  } catch (e) {
    data = null;
    console.log(e);
  }
  return data;
}

async function firstPetitionAutomaton2D(board, pattern) {

  const body = {
    Board: board,
    Pattern: pattern
  }

  let data;

  try {
    const response = await axios.post(`${AUTOMATON}init_automaton2D`, body);
    data = response.data;
  } catch (e) {
    console.log(e);
    data = null;
  }

  return data;
}

async function NextState() {
  let data = null;
  try {
    const response = await axios.get(`${AUTOMATON}next`);
    data = response.data;
  } catch (e) {
    console.log(e);
  }

  return data;
}

async function PreviousState() {
  let data = null;
  try {
    const response = await axios.get(`${AUTOMATON}previous`);
    data = response.data;
  } catch (e) {
    console.log(e);
  }

  return data
}

export { firstPetitionAutomaton1D, firstPetitionAutomaton2D, NextState, PreviousState }