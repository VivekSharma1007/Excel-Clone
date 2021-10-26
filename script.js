let rows = 100;
let cols = 26;
console.log("hello")
let rowAddCont = document.querySelector(".address-row-cont");
let colAddCont = document.querySelector(".address-col-cont");

let addBarElem = document.querySelector(".formula-address-bar");

for(let i = 0; i < rows; i++)
{
    let colDivEle = document.createElement("div");
    colDivEle.setAttribute("class", "rows-name-number");
    colDivEle.innerText = i + 1;
    rowAddCont.appendChild(colDivEle);
}


for(let i = 0; i < cols; i++)
{
    let colAlphaDivEle = document.createElement("div");
    colAlphaDivEle.setAttribute("class", "col-name-alpha");
    colAlphaDivEle.innerText = String.fromCharCode( 65 + i);
    colAddCont.appendChild(colAlphaDivEle);
}


let gridCont = document.querySelector(".cell-grid-cont");
for(let i = 0; i < rows; i++)
{
    let rowCount = document.createElement("div");
    rowCount.setAttribute("class", "row-count")
    for(let j = 0; j < cols; j++)
    {
         let colCount = document.createElement("div");
         colCount.setAttribute("class", "col-cell-count");
         colCount.setAttribute("contenteditable", "true");
         rowCount.appendChild(colCount);

         addEventListenerForAddressBar(colCount,i , j);
    }
    gridCont.appendChild(rowCount);
}

function addEventListenerForAddressBar(colCount, i, j)
{
    colCount.addEventListener("click", (e) => {
        let rowID = i + 1;
        let colID = String.fromCharCode(65 + j);
        addBarElem.value = `${colID}${rowID}`;
    })
}