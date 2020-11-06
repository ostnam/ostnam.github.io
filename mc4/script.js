let INIT = false // init flag, will be true when the game has been initialized
let TERMINATE = false // end the game flag, will be true when the game can be finished
let rows = [0, 1, 2, 3, 4, 5] // array containing every possible rows
let rowcount = 0
let gameframe = document.getElementById("gameframe")
let gamearray = []
let currentPlay = 1
let floor = [0, 0, 0, 0, 0, 0, 0]

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
    gamearray.push([null, null, null, null, null, null, null])
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
    gamearray[finalRow][playedColumn] = currentPlay % 2
    let playedCellId = "cell" + finalRow + playedColumn 
    let playedCell = document.getElementById(playedCellId)
    playedCell.setAttribute("class", "cellplay" + (currentPlay % 2))
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

if (INIT === false) {
    init()
    }
