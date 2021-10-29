let sheetDB = [];  // sheet object

for (let i = 0; i < rows; i++) {
    let sheetRow = [];
    for (let j = 0; j < cols; j++) {
        let cellProp = {         // cell ki prop ka object
            bold: false,
            italic: false,
            underline: false,
            alignment: "left",
            fontFamily : "monospace",
            fontSize : "14", 
            value : "",
            formula : "",
            children : []
        }
        sheetRow.push(cellProp);
    }
    sheetDB.push(sheetRow);
}



// selectors for cell property

let bold = document.querySelector(".bold");
let italic = document.querySelector(".italic");
let underline = document.querySelector(".underline");
let fontFamily = document.querySelector(".font-style-select");
let fontSize = document.querySelector(".font-size-select");
let alignment = document.querySelectorAll(".alignment");
let left = alignment[0];
let center = alignment[1];
let right = alignment[2];


let activeCellProp = "#F8EFBA";    // colors to whether selected or not
let inactiveCellProp = "#d6dbe4";

// attach event listeners for the properties

bold.addEventListener("click", e => {
    let address = addBarElem.value;
    let [cell, cellProp] = activeCell(address);

    // modification
    cellProp.bold = !cellProp.bold;  // data change in storage
    cell.style.fontWeight = cellProp.bold ? "bold" : "normal"; // ui change part 1
    bold.style.backgroundColor = cellProp.bold ? activeCellProp : inactiveCellProp; // ui part 2
})

italic.addEventListener("click", e => {
    let address = addBarElem.value;
    let [cell, cellProp] = activeCell(address);

    // modification
    cellProp.italic = !cellProp.italic;  // data change in storage
    cell.style.fontStyle = cellProp.italic ? "italic" : "normal"; // ui change part 1
    italic.style.backgroundColor = cellProp.italic ? activeCellProp : inactiveCellProp;
})


underline.addEventListener("click", e => {
    let address = addBarElem.value;
    let [cell, cellProp] = activeCell(address);

    // modification
    cellProp.underline = !cellProp.underline;  // data change in storage
    cell.style.textDecoration = cellProp.underline ? "underline" : "none"; // ui change part 1
    underline.style.backgroundColor = cellProp.underline ? activeCellProp : inactiveCellProp;
})


fontSize.addEventListener("change", (e) => {
    let address = addBarElem.value;
    let [cell, cellProp] = activeCell(address);
    cellProp.fontSize = fontSize.value;
    cell.style.fontSize = cellProp.fontSize + "px";
    fontSize.value = cellProp.fontSize;
})


fontFamily.addEventListener("change", (e) => {
    let address = addBarElem.value;
    let [cell, cellProp] = activeCell(address);
    cellProp.fontFamily = fontFamily.value;         // data change
    cell.style.fontFamily = cellProp.fontFamily;       // ui 1 change 
    fontFamily.value = cellProp.fontFamily;   // ui 2 change
})
 
alignment.forEach((alignEle) => {           // appl;ying to all alignment class
    alignEle.addEventListener("click", (e) => {
        let address = addBarElem.value;
        let [cell, cellProp] = activeCell(address);

        let alignValue = e.target.classList[0];
        cellProp.alignment = alignValue;  // data change
        cell.style.textAlign = cellProp.alignment; // ui change part 1

        switch (alignValue) {
            case "left":
                left.style.backgroundColor = activeCellProp;
                center.style.backgroundColor = inactiveCellProp;
                right.style.backgroundColor = inactiveCellProp;
                break;
            case "center":
                left.style.backgroundColor = inactiveCellProp;
                center.style.backgroundColor = activeCellProp;
                right.style.backgroundColor = inactiveCellProp;
                break;
            case "right":
                left.style.backgroundColor = inactiveCellProp;
                center.style.backgroundColor = inactiveCellProp;
                right.style.backgroundColor = activeCellProp;
                break;

        }
        
    })
})




let allCells = document.querySelectorAll(".col-cell-count");
for (let i = 0; i < allCells.length; i++) {              // selecting all cells

    attachPropertiesToUIAfterCellChange(allCells[i]);
}

function attachPropertiesToUIAfterCellChange(cell) {         // to change the styling when clicking to another cell and coming back to first cells
    cell.addEventListener("click", (e) => {
        let address = addBarElem.value;
        let [rid, cid] = decodeRCID(address);
        let cellProp = sheetDB[rid][cid];


        // apply cell properties UI part 1

        cell.style.fontWeight = cellProp.bold ? "bold" : "normal";
        cell.style.fontStyle = cellProp.italic ? "italic" : "normal";
        cell.style.textDecoration = cellProp.underline ? "underline" : "none";
        cell.style.fontSize = cellProp.fontSize + "px";
        cell.style.fontFamily = cellProp.fontFamily;
        cell.style.textAlign = cellProp.alignment;


        // console.log(fontFamily);
        // console.log(fontSize);
        // ui part 2

        bold.style.backgroundColor = cellProp.bold ? activeCellProp : inactiveCellProp;
        italic.style.backgroundColor = cellProp.italic ? activeCellProp : inactiveCellProp;
        underline.style.backgroundColor = cellProp.underline ? activeCellProp : inactiveCellProp;
        fontSize.value = cellProp.fontSize;
        fontFamily.value = cellProp.fontFamily;

        switch (cellProp.alignment) {
            case "left":
                left.style.backgroundColor = activeCellProp;
                center.style.backgroundColor = inactiveCellProp;
                right.style.backgroundColor = inactiveCellProp;
                break;
            case "center":
                left.style.backgroundColor = inactiveCellProp;
                center.style.backgroundColor = activeCellProp;
                right.style.backgroundColor = inactiveCellProp;
                break;
            case "right":
                left.style.backgroundColor = inactiveCellProp;
                center.style.backgroundColor = inactiveCellProp;
                right.style.backgroundColor = activeCellProp;
                break;

        }
        let formulaBar = document.querySelector(".formula-bar");
        formulaBar.value = cellProp.formula;
        cell.value = cellProp.value;
    })
}



function activeCell(address) {
    let [rid, cid] = decodeRCID(address);
    // access  the cell and  storage 
    let cell = document.querySelector(`.col-cell-count[rid="${rid}"][cid="${cid}"]`);  // cell access        // col-cell-count is equv to cell
    let cellProp = sheetDB[rid][cid]; // storage matrix
    return [cell, cellProp];
}

function decodeRCID(address) {
    // address = A1 
    let rid = Number(address.slice(1)) - 1; // gives 1
    let cid = Number(address.charCodeAt(0)) - 65;   // gives A
    return [rid, cid];
}