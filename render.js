// colorMap = {
//     "-1": "#FFFFFF",
//     "0": "#000012",
//     // "0": "#FFFFFF",
//     "1": "#FFADAD",
//     "2": "#FFD6A5",
//     "3": "#FDFEB6",
//     "4": "#CAFFBF",
//     "5": "#9BF6FF",
//     "6": "#A0C4FF",
//     "7": "#BDB2FF",
//     "8": "#FFC6FF",
//     "U": "#FFFFFF",
// }
document.addEventListener("DOMContentLoaded", function () {
    document.body.addEventListener("click", (cell) => {
        click(width, height, cell);
    });
    document.body.addEventListener("contextmenu", (cell) => {
        rightClick(width, height, cell);
    });
});

timerValue = 0;

function incrementTimer() {
    timer = document.getElementById("timer-digits");
    if (gameState == 1) {
        timerValue++;
    }
    let paddedTimer = String(timerValue).padStart(3, "0");

    timer.innerHTML = paddedTimer;

    if (gameState == 1) {
        setTimeout(incrementTimer, 1000);
    }
}

function updateMines(minesValue) {
    mines = document.getElementById("mines");
    digits = mines.children;

    ones = Math.floor(minesValue / 1) % 10;
    tens = Math.floor(minesValue / 10) % 10;

    //console.log(`${minesValue}, ${ones}, ${tens}`);

    digits[0].style.transform = `translate(0, ${ones * -5.9}rem)`;
    digits[1].style.transform = `translate(0, ${tens * -5.9}rem)`;
}

function updateGrid(width, height, mask, flags, values) {
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const cell = document.getElementById(x + ";" + y);
            let tileType = mask[y][x] & 1 ? values[y][x] : "U";
            tileType = flags[y][x] & 1 ? "F" : tileType;
            cell.style.backgroundImage = `url(Sprites/${tileType}.png)`;
            // cell.innerHTML = cell.tileType
            // cell.style.color = colorMap[cell.inn erHTML];
        }
    }
}

// Create Minesweeper Grid
function createGrid(width, height, mines) {

    // Set grid aspect ratio
    const grid = document.getElementById("grid");
    grid.innerHTML = "";
    grid.style.aspectRatio = width + "/" + height;

    // Create grid
    for (let y = 0; y < height; y++) {
        const row = document.createElement("div");
        row.className = "row";
        grid.appendChild(row);

        for (let x = 0; x < width; x++) {
            const cell = document.createElement("div");

            cell.className = "cell";
            cell.id = x + ";" + y;

            console.log(`${100 / width}%`);
            cell.style.width = `${100 / width}%`;
            cell.style.fontSize = 100 / width + "px";
            if ((x + y) % 2 == 0) {
                cell.style.opacity = 0.93;
            }
            row.appendChild(cell);
        }
    }
}
