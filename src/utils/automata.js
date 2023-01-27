import axios from 'axios'
const PROD_URL = ""
const DEV_URL = "http://localhost:8080/"

const HOST_URL = DEV_URL

const AUTOMATON = HOST_URL + "automaton/"

async function firstPetitionAutomaton1D(board, pattern) {

  const body = {
    Board: board,
    Pattern: pattern
  }

  let data;
  try {
    const response = await axios.post(`${AUTOMATON}init_automaton1D`, body)
    data = response.data;
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

  return null;
}

async function PreviousState() {
  let data = null;
  try {
    const response = await axios.get(`${AUTOMATON}previous`);
    data = response.data;
  } catch (e) {
    console.log(e);
  }
}

export { firstPetitionAutomaton1D, firstPetitionAutomaton2D, NextState, PreviousState }