// storage -> 2D matrix basic need
let graphComponentMatrix = [];
for(let i = 0; i < rows; i++)
{
    let row = [];
    for(let j = 0; j < cols; j++)
    {
        // array is used bcz there are more than one dependency
         row.push([]);
    }
    graphComponentMatrix.push(row);
}

// return true or false
function isGraphCyclic(graphComponentMatrix)
{
    // depedency -> visited, dfsVisited 2D array
    let visited = []; // node visit trace
    let dfsVisited = []; // stack visit trace

    for(let i = 0; i < rows; i++)
    {
        let visitedRow = [];
        let dfsVisitedRow = [];
        for(let j = 0; j < cols; j++)
        {
            visitedRow.push(false);
            dfsVisitedRow.push(false);
        }

        visited.push(visitedRow);
        dfsVisited.push(dfsVisitedRow);
    }

    for(let i = 0; i < rows; i++)
    {
        for(let j = 0; j < cols; j++)
        {
             let response = dfsCycleDetection(graphComponentMatrix, i, j, visited, dfsVisited);
             if(response === true)
             {
                 return [i,j];
             }
        }
    }
   return null;
}

/*
start >> visited-- true dfsvisited-- true
end >> dfsvisited >> false
cycle detection condition >> 
if (visited[i][j] == true) && dfsvisited[i][j] == true so return true
if true then it is cyclic otherwise not cyclic
*/



function dfsCycleDetection(graphComponentMatrix, srcr, srcc, visited, dfsVisited)
{
    visited[srcr][srcc] = true;
    dfsVisited[srcr][srcc] = true;

    for(let children = 0;  children < graphComponentMatrix[srcr][srcc].length; children++)
    {
        let [nbrr, nbrc] = graphComponentMatrix[srcr][srcc][children];
        if(visited[nbrr][nbrc] === false)
        {
            let response = dfsCycleDetection(graphComponentMatrix, nbrr, nbrc, visited, dfsVisited);
            if(response === true)
            {
                return true; // found cycle so return, no need to check other 
            }
        }
        else if(dfsVisited[nbrr][nbrc] === true)
        {
            return true;
        }
    }
    dfsVisited[srcr][srcc] = false;
    return false;
}