
function getRules1D() {
  let pattern = {
    "Cells": []
  };

  let rule = sessionStorage.getItem("0");
  if (rule !== undefined && rule !== null) {
    let letter = rule[rule.length - 1];
    pattern.Cells.push({
      "State": letter === "1" ? true : false,
      "Position": {
        "position": -1
      }
    })
  }

  rule = sessionStorage.getItem("2");
  if (rule !== undefined && rule !== null) {
    let letter = rule[rule.length - 1];
    pattern.Cells.push({
      "State": letter === "1" ? true : false,
      "Position": {
        "position": 1
      }
    })
  }

  return pattern;
}

function getBoard1D() {
  let board = []

  for (let i = 0; i < 100; i++) {
    let cell = sessionStorage.getItem(`${i}`);
    if (cell === undefined || cell === null) {
      board.push(false);
      continue;
    }

    let state = cell[cell.length - 1] === "1";
    board.push(state);
  }

  return board;
}

function getBoard2D() {
  let board = []

  for (let i = 0; i < 10; i++) {
    let row = [];
    for (let j = 0; j < 10; j++) {
      let cell = sessionStorage.getItem(`${i*10 + j}`);
      if (cell === undefined || cell === null) {
        row.push(false);
        continue;
      }

      let state = cell[cell.length - 1] === "1";
      row.push(state);
    }
    board.push(row);
  }

  console.log("Board: \n", board, "\n\n")

  return board;
}

function getRules2D() {
  let pattern = {
    "Cells": []
  };
  let rule;

  for (let i = 0; i < 9; i++) {
    rule = sessionStorage.getItem(`${i}`);
    if (rule === undefined || rule === null) continue;

    let state = rule[rule.length - 1] === "1" ? true : false;
    let row = Math.trunc(i / 3);
    let col = i % 3;

    pattern.Cells.push({
      "State": state,
      "Position": {
        "row": row === 0 ? -1 : row === 2 ? 1 : 0,
        "col": col === 0 ? -1 : col === 2 ? 1 : 0
      }
    })
  }

  return pattern;
}

export { getRules1D, getRules2D, getBoard1D, getBoard2D }