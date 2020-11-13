const DEDscreen = () => {
    let displayArray =   ["                        ",
                          "                        ",
                          "                        ",
                          "                        ",
                          "                        "]
    // the display is stored in an array of 5 strings (one for each row), there are 24 cells per row
    
    let planeData = {
        COM1: 1,
        COM2: 6,
        currentSTPT: 1,
        STPTMode: " ",
        IFFModeStr: "12 4",
        IFFCode: 7500,
        NavMode: "T",
        currentTACAN: "75X",
        TIMESTR: "11:27:44"
    }

    const pageArray = {
        "main": [
               [` UHF ${planeData.COM1}  STPT   ${planeData.currentSTPT} ${planeData.STPTMode}`,
                `                        `,
                ` VHF ${planeData.COM2}     ${planeData.TIMESTR}`,
                `                        `,
                ` ${planeData.IFFModeStr}   ${planeData.IFFCODE} TIM ${planeData.NavMode} ${planeData.currentTACAN}`]
              ],
    }


    const init = () => {
        let DEDcontainer = document.getElementById("DEDcontainer")
        for (i=0; i<5; i++){
            let newRow = document.createElement("div")
            newRow.setAttribute("id", "displayRow" + i)
            newRow.setAttribute("class", "displayRow")
            DEDcontainer.append(newRow)
            let addedRow = DEDcontainer.lastChild

            for (j=0; j<24; j++){
                let cell = document.createElement("div")
                cell.setAttribute("id", "cell"+ i + j)
                cell.setAttribute("class", "cell")
                addedRow.append(cell)
            }
        }
        setPage("main")
        updateDisplay()
    }

    const updateDisplay = () => {
        for (i in displayArray) {
            for (j in displayArray[i]) {
                document.getElementById("cell" + i + j).textContent=displayArray[i][j]
            }
        }
    }
    
    const setPage = (page, tab=0) => {
        let selectedPage = pageArray[page]
        for (i in selectedPage[tab]) {
            displayArray[i] = selectedPage[tab][i]
        }
        updateDisplay()
    }
  
    return {init, updateDisplay, setPage}
}



DEDscreen1 = DEDscreen()
DEDscreen1.init()