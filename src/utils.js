
function getRules1D() {
  let pattern = {
    "Cells": []
  };

  let rule = sessionStorage.getItem("0");
  if (rule != undefined) {
    let letter = rule[rule.length - 1];
    pattern.Cells.push({
      "State": letter == "1" ? true : false,
      "Position": {
        "position": -1
      }
    })
  }

  rule = sessionStorage.getItem("2");
  if (rule != undefined) {
    let letter = rule[rule.length - 1];
    pattern.Cells.push({
      "State": letter == "1" ? true : false,
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
    if (cell == undefined) {
      board.push(false);
      continue;
    }

    let state = cell[cell.length - 1] == "1" ? true : false;
    board.push(state);
  }

  return board;
}

function getBoard2D() {
  let board = []

  for (let i = 0; i < 10; i++) {
    let row = [];
    for (let j = 0; j < 10; j++) {
      let cell = sessionStorage.getItem(`${i}`);
      if (cell == undefined) {
        row.push(false);
        continue;
      }

      let state = cell[cell.length - 1] == "1" ? true : false;
      row.push(state);
    }
    board.push(row);
  }

  return board;
}

function getRules2D() {
  let pattern = {
    "Cells": []
  };
  let rule;

  for (let i = 0; i < 9; i++) {
    rule = sessionStorage.getItem(`${i}`);
    if (rule == undefined) continue;

    let state = rule[rule.length - 1] == "1" ? true : false;
    let number = rule[0].charCodeAt(0) - "0".charCodeAt(0);
    let row = Math.trunc(number / 3)
    let col = number % 3

    pattern.Cells.push({
      "State": state,
      "Position": {
        "row": row,
        "col": col
      }
    })
  }

  return pattern;
}

export { getRules1D, getRules2D, getBoard1D, getBoard2D }