let totalNOfElements = 0
let elInRow = 0
let nOfRows = 0
let rows = []
let sh = screen.height
let sw = screen.width * 1.1

document.body.onload = prefillGrid;
// document.body.onresize = prefillGrid;

const button1 = document.getElementById("button1");
const button2 = document.getElementById("button2");

button1.addEventListener("click", function () {
    animateHor();
})

button2.addEventListener("click", function () {
    animateVerticalFromTop();
})

// // calculation functions
// function outerWidthMargin(el) {
//     var width = el.offsetWidth;
//     var style = getComputedStyle(el);
  
//     width += parseInt(style.marginLeft) + parseInt(style.marginRight);
//     return width;
// }
  
// function width(el) {
//     return parseFloat(getComputedStyle(el, null).width.replace("px", ""))
// }
  
// function computeFirstRowItems() {
//     const gr = document.getElementById("grid")
//     const cl = document.getElementById("cell")

//     return Math.floor(width(gr) / outerWidthMargin(cl));
// }

// fill the grid with cells
function prefillGrid() {
    elInRow = Math.floor(sw/ 150);
    nOfRows = Math.floor(sh / (150 * 1.1547));
    let elsToAdd = 0;
    totalNOfElements = elInRow * nOfRows
    elsToAdd = rows.length === 0 ? totalNOfElements : totalNOfElements - rows.length
    if (rows.length === 0) {
        elsToAdd = totalNOfElements;
        rows = [[nOfRows]]
    } else {
        elsToAdd = totalNOfElements - rows.length
    }
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
    console.log("Shells: " + shells)

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

// async function animateDiagonalTopRight() {
//     let shells = document.getElementsByClassName("cell")
//     let startCell = shells[elInRow - 1]
    
//     for (let i = elInRow - 1; i >= 0; i--) {
//         let currentRow = []
//         let count = nOfRows - i * 
//         let centerCell = shells[count]
//         let vertMove = elInRow
//         let horMove = 1
//         currentRow.push(centerCell)
//         while (count - vertMove > 0) {
//             currentRow.push(shells[count - vertMove])
//             vertMove += elInRow
//         }
//         while ((count + horMove) % elInRow < elInRow - 1) {
//             currentRow.push(shells[count + horMove])
//             horMove += 1
//         }
//         currentRow.push(shells[count]);
//         rows[i] = currentRow
//     } 
//     for (let i = 0; i < elInRow; i++) {
//         animateRow(rows[i])
//         await sleep(100) // wait before next wave
//     }
// }

// animate one row
async function animateRow(arr, className) {
    arr.forEach((el) => {
        el.classList.add(className)
        toggleColor(el)
    })
    await sleep(500); // wait for animation
    arr.forEach((el) => {
        el.classList.remove(className)
    })
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
