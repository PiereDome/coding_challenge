/*
* i3logix Code Challenge
* 
* Please refer to the README.md for challenge questions and complete your challenge below.
* 
* Steps:
*
* 1. Write your challenge code below.
* 2. Export a higher order function that will accept arguments for testing
*/

const getNeighbourCount = (gameboard, x, y, height, width) => {
    
    let neighbourCount = 0;
    // Get neightbor above left
    if(y > 0 && x > 0)                      neighbourCount += gameboard[y-1][x-1];
    // Get neightbor above center
    if(y > 0)                               neighbourCount += gameboard[y-1][x];
    // Get neightbor above right
    if(y > 0 && x < width - 1)              neighbourCount += gameboard[y-1][x+1];
    // Get neighbor to left
    if(x > 0)                               neighbourCount += gameboard[y][x-1];
    // Get neighbor to right
    if(x < width - 1)                       neighbourCount += gameboard[y][x+1];
    // Get neighbors below left
    if(y < height - 1 && x > 0)             neighbourCount += gameboard[y+1][x-1];
    // Get neighbors below center
    if(y < height - 1)                      neighbourCount += gameboard[y+1][x];
    // Get neighbors below right
    if(y < height - 1 && x < width - 1)     neighbourCount += gameboard[y+1][x+1];
    return neighbourCount;
};

const getNextGeneration = (gameboard) => {
    const gameHeight = gameboard.length;
    const gameWidth = gameboard[0].length;
    // First map gets each row
    gameboard.map((row, rowIndex, gameboard) => 
        // Second map gets each cell in the row
        row.map((cell, cellIndex, row) => {
            const neighbourCount = getNeighbourCount(gameboard, cellIndex, rowIndex, gameHeight, gameWidth);
            if(cell === 1){
                // underpopulation
                if(neighbourCount < 2) return 0;
                // survival
                if(neighbourCount === 2 || neighbourCount === 3) return 1;
                // overcrowding
                if(neighbourCount > 3) return 0;
            } else {
                // reproduction
                if(neighbourCount === 3) return 1;
                return 0;
            }
        })
    )
}

const reduceRow = (row) => {
    // Return a string of each cell separated by a space
    return row.reduce((rowString, cell, index, rowArray) => {
        rowString += `${cell}`;
        // Add space after cell unless last cell in row
        if(index < rowArray.length -1) rowString += ' ';
        return rowString;
    },'');
}

// export your function for testing
module.exports = function higherOrderFunction(gameboard) {
    const nextGeneration = getNextGeneration(gameboard);
    // Return string formatted for displaying state of next generation gameboard
    return gameboard.reduce((string, row, index, gameArray) => {
        string +=  reduceRow(row)
        // Add newline after row unless last row on the gameboard
        if(index < gameArray.length - 1) string += '\n';
        return string;
    }, '');
}