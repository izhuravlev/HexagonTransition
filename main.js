let totalNOfElements = 0
let elInRow = 0
let nOfRows = 0
let rows = []
let limiterDiv = document.getElementById("limiter")
let limitPos = limiterDiv.getBoundingClientRect();
let gridDiv = document.getElementById("grid")
let gridPos = gridDiv.getBoundingClientRect();
let sh = gridPos.height
let sw = gridPos.width

let elSize = sw / 10
let bgScrollPos = limitPos.height * 1.5
let scrollDown = false

document.body.onload = prefillGrid;

document.addEventListener("scroll", function () {
    lastKnownScrollPosition = window.scrollY;

    if (lastKnownScrollPosition + sh * 0.5 > bgScrollPos) {
        if (!scrollDown) {
            scrollDown = true
            animateVerticalFromTop()
        }
    } else {
        if (scrollDown) {
            scrollDown = false
            animateVerticalFromBot()
        }
    } 
})

// fill the grid with cells
function prefillGrid() {
    elInRow = Math.floor(sw / elSize);
    nOfRows = 8
    // Math.floor(sh / (elSize * 1.1547));
    let elsToAdd = 0;
    totalNOfElements = elInRow * nOfRows
    elsToAdd = totalNOfElements;
    rows = [[nOfRows]]
    console.log("cols: " + elInRow + ", rows: " + nOfRows)
    
    let grid = document.getElementById("grid")
    for (var i = 0; i < elsToAdd; i++) {
        let shell = document.createElement("div")
        shell.className = "cell"
        shell.classList.add("base")
        shell.id = "cell"
        grid.appendChild(shell);
    }
}

// animate horizontally
async function animateHor() {
    let shells = document.getElementsByClassName("cell")
    
    for (let i = 0; i < elInRow; i++) {
        let currentRow = []
        let count = i
        do {
            currentRow.push(shells[count]);
            count += elInRow;
        } while (count < totalNOfElements)
        rows[i] = currentRow
    } 
    for (let i = 0; i < elInRow; i++) {
        animateRow(rows[i], "spin1")
        await sleep(100) // wait before next wave
    }
}

async function animateVerticalFromTop() {
    let shells = document.getElementsByClassName("cell")

    for (let i = 0; i < nOfRows; i++) {
        let currentRow = []
        let startIdx = 0 + i * elInRow
        let endIdx = elInRow - 1 + i * elInRow
        for (let j = startIdx; j <= endIdx; j++) {
            currentRow.push(shells[j])
        }
        rows[i] = currentRow
    }

    for (let i = 0; i < nOfRows; i++) {
        animateRow(rows[i], "spin2")
        await sleep(100) // wait before next wave
    }
}

async function animateVerticalFromBot() {
    let shells = document.getElementsByClassName("cell")

    for (let i = 0; i < nOfRows; i++) {
        let currentRow = []
        let startIdx = 0 + i * elInRow
        let endIdx = elInRow - 1 + i * elInRow
        for (let j = startIdx; j <= endIdx; j++) {
            currentRow.push(shells[j])
        }
        rows[i] = currentRow
    }

    for (let i = nOfRows - 1; i >= 0; i--) {
        animateRow(rows[i], "spin3")
        await sleep(100) // wait before next wave
    }
}


// animate one row
async function animateRow(arr, className) {
    arr.forEach((el) => {
        el.classList.add(className)
        toggleColor2(el)
    })
    await sleep(500); // wait for animation
    arr.forEach((el) => {
        el.classList.remove(className)
    })
}

function toggleColor2(el) {
    if (el.classList.contains("base")) {
        el.classList.remove("base")
        el.classList.add("purple")
    } else {
        el.classList.remove("purple")
        el.classList.add("base")
    }
}

// toggle colors
function toggleColor(el) {
    if (el.classList.contains("color1")) {
        el.classList.remove("color1");
        el.classList.add("color2")
    } else if (el.classList.contains("color2")) {
        el.classList.remove("color2");
        el.classList.add("color3")
    } else if (el.classList.contains("color3")) {
        el.classList.remove("color3");
        el.classList.add("color4")
    } else if (el.classList.contains("color4")) {
        el.classList.remove("color4");
        el.classList.add("color5")
    } else if (el.classList.contains("color5")) {
        el.classList.remove("color5");
        el.classList.add("color6")
    } else if (el.classList.contains("color6")) {
        el.classList.remove("color6");
        el.classList.add("color7")
    } else if (el.classList.contains("color7")){
        el.classList.remove("color7");
        el.classList.add("color1")
    } else {
        el.classList.remove("base");
        el.classList.add("color1")
    }
}

// sleep function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
