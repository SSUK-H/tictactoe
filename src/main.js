const tictactoe = document.getElementById("tictactoe");
const $table = document.createElement("table");
const rows = [];
const cells = [];
let turn = "X";
const result = document.createElement("div");

function checkResult(row, cell) {
  // 한줄 다 채워졌는지
  let marking = false;
  // 연속된 두개가 있는지..? (중급버전 다음 기회에..)
  if (
    cells[row][0].textContent === turn &&
    cells[row][1].textContent === turn &&
    cells[row][2].textContent === turn
  ) {
    marking = true;
  }
  // 가로 검사
  if (
    cells[row][0].textContent === turn &&
    cells[row][1].textContent === turn &&
    cells[row][2].textContent === turn
  ) {
    marking = true;
  }
  // 세로 검사
  if (
    cells[0][cell].textContent === turn &&
    cells[1][cell].textContent === turn &&
    cells[2][cell].textContent === turn
  ) {
    marking = true;
  }
  // 대각선 검사
  if (
    cells[0][0].textContent === turn &&
    cells[1][1].textContent === turn &&
    cells[2][2].textContent === turn
  ) {
    marking = true;
  }
  if (
    cells[0][2].textContent === turn &&
    cells[1][1].textContent === turn &&
    cells[2][0].textContent === turn
  ) {
    marking = true;
  }
  return marking;
}

// 초기화
function reset(draw) {
  if (draw) {
    result.textContent = turn + " 무승부";
    result.className = "result";
  } else {
    result.textContent = turn + " 승리!";
    result.className = "result";
  }
  setTimeout(function () {
    result.textContent = "";
    result.className = "";
    cells.forEach(($tr) => {
      $tr.forEach(($td) => {
        $td.textContent = "";
      });
    });
    turn = "X";
  }, 2000);
}

// td 선택했을 때 마크하기
const turnback = (e) => {
  if (true === "O") {
    return; // 컴퓨터 턴일 때 선택 X
  }
  
  console.log("click", e.target);
  const row = rows.indexOf(e.target.parentNode);
  console.log(row + 1 + "번째 줄");
  const cell = cells[row].indexOf(e.target);
  console.log(cell + 1 + "번째 칸");

  if (cells[row][cell].textContent !== "") {
    // 칸이 이미 선택되어 있는가
    console.log("빈칸이아닙니다.");
  } else {
    console.log("빈칸입니다.");
    cells[row][cell].textContent = turn; // 'X'

    let marking = checkResult(row, cell);
    // 모든 칸이 체크 됐는지 검사
    let cellbackup = [];
    cells.forEach(function ($tr) {
      $tr.forEach(function ($td) {
        cellbackup.push($td);
      });
    });
    cellbackup = cellbackup.filter(function (cell) {
      return !cell.textContent; // cell.textContent = ''; -> false인 경우 찾아서 반환
    });

    if (marking) {
      // 세칸 체크 완료
      reset(false);
    } else if (cellbackup.length === 0) {
      // 무승부
      reset(true);
    } else {
      if (turn === "X") {
        turn = "O";
      }
      // 컴퓨터 턴
      setTimeout(function () {
        console.log("컴퓨터의 턴입니다.");

        // 빈칸 중 하나를 고름
        const selectcell =
          cellbackup[Math.floor(Math.random() * cellbackup.length)];
        selectcell.textContent = turn;
        console.log(selectcell);
        // 컴퓨터 승리 확인
        const row = rows.indexOf(selectcell.parentNode);
        const cell = cells[row].indexOf(selectcell);
        let marking = checkResult(row, cell);
        // 한줄 완료 시
        if (marking) {
          reset();
        }
        // 턴을 넘김
        turn = "X";
      }, 1000);
    }
  }
};

// 3 x 3 칸 만들기
for (let i = 0; i < 3; i++) {
  // table 안에 3개 tr
  const $tr = document.createElement("tr");
  rows.push($tr);
  cells.push([]);
  for (let j = 0; j < 3; j++) {
    // tr 안네 3개 td
    const $td = document.createElement("td");
    $td.addEventListener("click", turnback);
    cells[i].push($td);
    $tr.append($td);
  }
  $table.append($tr);
}
tictactoe.append($table);
tictactoe.append(result);
console.log("줄들", rows);
console.log("칸들", cells);
