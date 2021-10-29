for(let i = 0; i < rows; i++)  // access all cells and add event listner blur
{
    for(let j = 0; j < cols; j++)
    {
        let cell = document.querySelector(`.col-cell-count[rid="${i}"][cid="${j}"]`);
        cell.addEventListener("blur", (e) => {
            let address = addBarElem.value;
            let [activecell, cellProp] = activeCell(address);

            let enteredData = activecell.innerText;
            
            if(enteredData === cellProp.value) return;   // if value is same don't do anything

            cellProp.value = enteredData;

            // if the value is modifiyed: remove parent child relation, empty the formula in db and update child with new hardcoded that is modifiyed value
            removeChildFromParent(cellProp.formula);
            cellProp.formula = "";
            updateChildrenCell(address);

            console.log(cellProp);
        }) 
    }
}

let formulaBar = document.querySelector(".formula-bar");
formulaBar.addEventListener("keydown", (e) => {
    let inputFormula = formulaBar.value;
    if(e.key === "Enter" && inputFormula)
    {
        let address = addBarElem.value;
        let [cell, cellProp] = activeCell(address);
        if(inputFormula !== cellProp.formula)   // agar value different hogi means formula is edited so first remove the child from parent and then evaluate and then after add to parent children
        {
            removeChildFromParent(cellProp.formula);      // for removing
        }
        
        let evaluatedValue =  evaluateFormula(inputFormula);
        
        addChildToParent(inputFormula);

        
        cellUIAndCellProp(evaluatedValue, inputFormula, address); // to set cell and cell prop's ui
        updateChildrenCell(address);
        console.log(sheetDB);
    }
})

function addChildToParent(inputFormula)
{
    let childAddress = addBarElem.value;
    let encodedFormula = inputFormula.split(" ");
    for(let i = 0; i < encodedFormula.length; i++)
    {
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if(asciiValue >= 65 && asciiValue <= 90)
        {
            let [parentCell, parentCellProp] = activeCell(encodedFormula[i]);
            parentCellProp.children.push(childAddress);
        }
    }
    
}


function removeChildFromParent(inputFormula)
{
    let childAddress = addBarElem.value;
    let encodedFormula = inputFormula.split(" ");
    for(let i = 0; i < encodedFormula.length; i++)
    {
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if(asciiValue >= 65 && asciiValue <= 90)
        {
            let [parentCell, parentCellProp] = activeCell(encodedFormula[i]);
            let idx = parentCellProp.children.indexOf(childAddress);
            parentCellProp.children.splice(idx , 1);
        }
    }
    
}



function updateChildrenCell(parentAddress)   // recursive function
{
     let [parentCell, parentCellProp] = activeCell(parentAddress);
     let children = parentCellProp.children;
     for(let i = 0; i < children.length; i++)
     {
          let childrenAddress = children[i];
          let [childreCell, childrenCellProp] = activeCell(childrenAddress);
          let childrenFormula = childrenCellProp.formula;
          let evaluatedValue = evaluateFormula(childrenFormula);
          cellUIAndCellProp(evaluatedValue, childrenFormula, childrenAddress)
          updateChildrenCell(childrenAddress);
     }
}


function evaluateFormula(inputFormula)       // decode the formula 
{
    let encodedFormula = inputFormula.split(" ");
    for(let i = 0; i < encodedFormula.length; i++)
    {
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if(asciiValue >= 65 && asciiValue <= 90)
        {
            let [cell, cellProp] = activeCell(encodedFormula[i]);
            encodedFormula[i] = cellProp.value;
        }
    }
    let decodedFormula = encodedFormula.join(" ");
    return eval(decodedFormula);
}

function cellUIAndCellProp(evaluatedValue, inputFormula, address)
{
    
    let [cell, cellProp] = activeCell(address);
    cell.innerText = evaluatedValue;
    cellProp.value = evaluatedValue;  // db change 

    cellProp.formula = inputFormula;   // formula value change 
}