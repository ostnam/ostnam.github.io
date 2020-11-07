let INIT = false // init flag, will be true when the game has been initialized
let TERMINATE = false // end the game flag, will be true when the game can be finished
let rows = [0, 1, 2, 3, 4, 5] // array containing every possible rows
let rowcount = 0
let gameframe = document.getElementById("gameframe")
let gamearray = []
let currentPlay = 1
let floor = [0, 0, 0, 0, 0, 0, 0]
let minscope = 0
let maxscope = 0

function createrow() { // this function creates a single row in the DOM
    let row = document.createElement("div") // row is a div with the id row
    row.setAttribute("id", "row")
    gameframe.prepend(row) // adds the row to the html file
    let currentrow = gameframe.firstChild
    let rowNumberCell = document.createElement("div")
    rowNumberCell.setAttribute("id", "rowNumberCell")
    rowNumberCell.textContent = rowcount + 1
    currentrow.append(rowNumberCell)
    for (let i = 0; i < 7; i++) {
        let cell = document.createElement("div")  // cell is a div with the id cell
        cell.setAttribute("id", "cell" + rowcount + i) // each cell will have its own id
        cell.setAttribute("class", "cell")
        cell.setAttribute("onclick", "playerinput(id)")
        cell.setAttribute("onmouseover", "hover(id)")
        cell.setAttribute("onmouseleave", "unhover(id)")
        currentrow.append(cell)
    }
    rowcount++
    gamearray.push(["x", "x", "x", "x", "x", "x", "x"])
}


function init() {
    for (let i = 0; i < rows.length; i++) {
        createrow() // create row
    }
    INIT = true
}


function playerinput(id) {
    let newId = id.replace("cell", "")
    let playedColumn = newId[(newId.length - 1)]
    // let playedRow = newId.slice(0, -1)
    let finalRow = floor[playedColumn]
    floor[playedColumn]++
    gamearray[finalRow][playedColumn] = currentPlay % 2 + ""
    let playedCellId = "cell" + finalRow + playedColumn 
    let playedCell = document.getElementById(playedCellId)
    playedCell.setAttribute("class", "cellplay" + (currentPlay % 2))
    checkwin(finalRow, playedColumn)
    currentPlay++
}

function hover(id) {
    // Identify the cell that has to be highlighted
    let newId = id.replace("cell", "")
    let hoveredColumn = newId[(newId.length - 1)]
        // let hoveredRow = newId.slice(0, -1)
    let finalRow = floor[hoveredColumn]
    // Highlight the cell
    let hoveredCellId = "cell" + finalRow + hoveredColumn
    let hoveredCell = document.getElementById(hoveredCellId)
    hoveredCell.setAttribute("class", "cellhover" + (currentPlay % 2))
}


function unhover(id) {
    // Identify the cell that has to be highlighted
    let newId = id.replace("cell", "")
    let hoveredColumn = newId[(newId.length - 1)]
        // let hoveredRow = newId.slice(0, -1)
    let finalRow = floor[hoveredColumn]
    // Highlight the cell
    let hoveredCellId = "cell" + finalRow + hoveredColumn
    let hoveredCell = document.getElementById(hoveredCellId)
    hoveredCell.setAttribute("class", "cell")
}


function checkwin(finalRow, cellColumn){
    let playedrow = gamearray[finalRow]
    let rowString = playedrow.join("")
    if (rowString.includes("1111") || rowString.includes("0000")) {
        victory(currentPlay % 2)
    }
    if (finalRow >=3) {
        let playedColumn = [gamearray[finalRow-3][cellColumn],
                            gamearray[finalRow-2][cellColumn],
                            gamearray[finalRow-1][cellColumn],
                            gamearray[finalRow][cellColumn]]
        let columnString = playedColumn.join("")
        if (columnString.includes("1111") || columnString.includes("0000")) {
            victory(currentPlay % 2)
        }
    }

    let workingDiag = []
    let diagString = ""
    for (i = -3; i <4; i++) { // we will take the value of cells with a maximum offset of 3 from the current cell
        let workingRowNumber = finalRow + i
        if (workingRowNumber >= 0 && workingRowNumber < gamearray.length){ // checking that the  working row exists
            let workingColumnNumber = parseInt(cellColumn) + i
            if (0 <= workingColumnNumber && workingColumnNumber <= 6) {
                let workingCell = gamearray[workingRowNumber][workingColumnNumber]
                workingDiag.push(workingCell)            
            }
        }
    }
    diagString += workingDiag.join("")

    let workingDiag2 = []
    for (i = -3; i <4; i++) { // we will take the value of cells with a maximum offset of 3 from the current cell
        let workingRowNumber = finalRow + i
        if (workingRowNumber >= 0 && workingRowNumber < gamearray.length){ // checking that the  working row exists
            let workingColumnNumber = parseInt(cellColumn) - i
            if (0 <= workingColumnNumber && workingColumnNumber <= 6) {
                let workingCell = gamearray[workingRowNumber][workingColumnNumber]
                workingDiag2.push(workingCell)            
               }
            }
        }
    

    diagString += ","
    diagString += workingDiag2.join("")
    console.log(diagString)
    if (diagString.includes("1111") || diagString.includes("0000")) {
        victory(currentPlay % 2)}
    }


function victory(player) {
    if (player === 1){
        alert("Orange won!")}
    else {
        alert("Purple won!")
    }
}

if (INIT === false) {
    init()
    }
