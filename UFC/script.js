const DEDscreen = () => {
    // init() starts stuff
    // refresh() updates the display by running each update function
    // buttonFunctions stores the function of each button


    let displayArray =   ["                        ",
                          "                        ",
                          "                        ",
                          "                        ",
                          "                        "];

    let highlightedCells = [];

    
    let planeData = {
        COM1: 292.30,
        COM2: 5,
        currentSTPT: 1,
        STPTMode: 0,
        IFFCode: 7500,
        currentTACAN: 75,
        currentTACANMode: 0,
        blink: 0,
        currentDEDPage: "main",
        currentDEDtab: 0,
        currentRockerLocation: 0,
        COM1mode: "man",
        COM2mode: "preset",
    }; // this object stores various data


    let planeDataStr = {
        STPTMode: " ",
        IFFModeStr: " 12 4",
        NavMode: "T",
        currentTACAN: "75X",
        timeStr: "00:00:00",
        COM1: "1     ",
        COM2: "6     ",
        currentSTPT: "1 ",
    };


    const pageBuilder = {
        main: () => {
            let rockerValues = [" ", " ", " "];
            rockerValues[planeData.currentRockerLocation % rockerValues.length] = "↕";
            let templateArray = [
               [`UHF${rockerValues[0]}${planeDataStr.COM1}     STPT ${rockerValues[1]}${planeDataStr.currentSTPT}${planeDataStr.STPTMode}`,
                `                        `,
                `VHF${rockerValues[2]}${planeDataStr.COM2}      ${planeDataStr.timeStr}`,
                `                        `,
                `${planeDataStr.IFFModeStr}   ${planeData.IFFCode} TIM   ${planeDataStr.NavMode} ${planeDataStr.currentTACAN}`]
              ];
            return templateArray;
            },
        
        list: () => {return [[`        LIST         ${planeDataStr.currentSTPT}↕`,
                              ` 1DEST 2BNGO 3VIP  RINTG`,
                              ` 4NAV  5MAN  6INS  EDLNK`,
                              ` 7EWS  8MODE 9VRP  0MISC`,
                              `                        `]];
        }
    }; // this array stores the template of each DED page and tab and generate the proper strings


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
        refresh()
    }; // called once at the beginning of the page to create the DED


    const updateDisplayHTML = () => {
        for (i in displayArray) {
            for (j in displayArray[i]) {
                document.getElementById("cell" + i + j).textContent=displayArray[i][j]
                if (highlightedCells.includes(i + j)){
                    console.log("yeeee")
                    document.getElementById("cell" + i + j).setAttribute("class", "highlightedCell");
                } else {
                    document.getElementById("cell" + i + j).setAttribute("class", "cell");
                }
            }
        }
    }; // updates the HTML page
  

    const updatePlaneData = () => {
        planeData.blink++;
    }; // updates planeData


    const updateDisplayArray = (page, tab=0) => {
        let selectedPage = page;
        let displayArrayBuilder = pageBuilder[selectedPage]();
        displayArray = displayArrayBuilder[tab];
        planeData.currentDEDPage = page;
    }; // updates the display array


    function refresh(page=planeData.currentDEDPage, tab=planeData.currentDEDtab) {
        updatePlaneData();
        updatePlaneDataStr();
        updateDisplayArray(page, tab);
        updateHighlightedCells(page, tab);
        updateDisplayHTML();
    } // is supposed to be called every time something changes so that everything is updated nicely


    const buttonFunctions = {
        "fourWayUp": function () {
            planeData.currentRockerLocation++;
            refresh();
        },
        "fourWayDown": function () {
            planeData.currentRockerLocation++;
            refresh();
        },
        "rockerUp": function () {
            switch (planeData.currentDEDPage) {
                case "main":
                    switch(planeData.currentRockerLocation % 3){
                        case 0:
                            planeData.COM1++;
                            break;
                        case 1:
                            if (planeData.currentSTPT === 99){
                                planeData.currentSTPT = 1;
                            }
                            else {
                                planeData.currentSTPT++
                            }
                            break;
                        case 2:
                            planeData.COM2++;
                            break;
                    }
                    break;
            }
            refresh();
        },
        "rockerDown": function () {
            switch (planeData.currentDEDPage) {
                case "main":
                    switch(planeData.currentRockerLocation % 3){
                        case 0:
                            planeData.COM1--;
                            break;
                        case 1:
                            if (planeData.currentSTPT === 1) {
                                planeData.currentSTPT = 99
                            }
                            else{
                            planeData.currentSTPT--;}
                            break;
                        case 2:
                            planeData.COM2--;
                            break;
                    }
                    break;
            }
            refresh();
        },
        "list": function(){
            planeData.currentDEDPage = "list";
            planeData.currentDEDtab = 0;
        },
    }; // stores the function of each ICP button


    function updatePlaneDataStr() {
        if (planeData.STPTMode % 2 === 0){
            planeDataStr.STPTMode = " ";
        }
        else {
            planeDataStr.STPTMode = "A";
        }

        if (planeData.COM1mode === "preset") {
            let c = (planeData.COM1 % 16) + 1;
            if (c >= 10) {
                planeDataStr.COM1 = c + "    ";
            }
            else {
                planeDataStr.COM1 = c + "     "
            }
        }
        else {
            let comStr = planeData.COM1 + "";
            while (comStr.length<6){
                comStr += "0";
            }
            planeDataStr.COM1 = comStr;
            }

        if (planeData.COM2mode === "preset") {
            let c = (planeData.COM2 % 16) + 1;
            if (c >= 10) {
                planeDataStr.COM2 = c + "    ";
            }
            else {
                planeDataStr.COM2 = c + "     "
            }
        }
        else {
            let comStr = planeData.COM2 + "";
            while (comStr.length<6){
                comStr += "0";
            }
            planeDataStr.COM2 = comStr;
            }
        
        if (planeData.currentSTPT >= 10){
            planeDataStr.currentSTPT = planeData.currentSTPT + "";
        }

        else {
            planeDataStr.currentSTPT = planeData.currentSTPT + " ";
        }


        d = new Date();
        timeStr = d.toLocaleTimeString();
        planeDataStr.timeStr = timeStr;
    } // updates the strings that will be fed to pageBuilder()

    function updateHighlightedCells(page, tab) {
        switch(page) {
            case "main":
                highlightedCells = [];
                break;
            case "list":
                highlightedCells = ["11",  "17", "113", "119",
                                    "21",  "27", "213", "219",
                                    "31",  "37", "313", "319"];
                break;
        }
    }

    init();
    return {refresh, buttonFunctions};
}


let DEDScreen1 = DEDscreen();

setInterval(function(){DEDScreen1.refresh()}, 1000);
