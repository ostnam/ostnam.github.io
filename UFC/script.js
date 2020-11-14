const DEDscreen = () => {
    let displayArray =   ["                        ",
                          "                        ",
                          "                        ",
                          "                        ",
                          "                        "];
    // the display is stored in an array of 5 strings (one for each row), there are 24 cells per row
    
    let planeData = {
        COM1: 1,
        COM2: 6,
        currentSTPT: 1,
        STPTMode: " ",
        IFFModeStr: " 12 4",
        IFFCode: 7500,
        NavMode: "T",
        currentTACAN: "75X",
        timeStr: "00:00:00",
        COM1str: "1     ",
        COM2str: "6     ",
        blink: 0,
        currentDEDPage: "main",
        currentDEDtab: 0,
    };


    const pageBuilder = {
        main: () => [
               [`UHF ${planeData.COM1str}     STPT   ${planeData.currentSTPT}${planeData.STPTMode}`,
                `                        `,
                `VHF ${planeData.COM2str}      ${planeData.timeStr}`,
                `                        `,
                `${planeData.IFFModeStr}   ${planeData.IFFCode} TIM   ${planeData.NavMode} ${planeData.currentTACAN}`]
              ],
    };


    const init = () => { // this function is supposed to be called once at the beginning of the page to create the DED
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
        updateDisplayArray(planeData.currentDEDPage)
        updateDisplayHTML()
    };


    const updateDisplayHTML = () => {
        for (i in displayArray) {
            for (j in displayArray[i]) {
                document.getElementById("cell" + i + j).textContent=displayArray[i][j]
            }
        }
    };
  
    const updatePlaneData = () => {
        planeData.blink++;
        d = new Date();
        timeStr = d.toLocaleTimeString();
        planeData.timeStr = timeStr;
    };


    const updateDisplayArray = (page, tab=0) => {
        let selectedPage = page;
        let displayArrayBuilder = pageBuilder[selectedPage]();
        displayArray = displayArrayBuilder[tab];
        planeData.currentDEDPage = page;
    }

    function refresh(page=planeData.currentDEDPage, tab=planeData.currentDEDtab) {
        updatePlaneData();
        updateDisplayArray(page, tab);
        updateDisplayHTML();
    }
    init();
    return {refresh};
}


let DEDscreen1 = DEDscreen();

setInterval(function(){DEDscreen1.refresh()}, 1000);