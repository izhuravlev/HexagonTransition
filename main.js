let totalNOfElements = 90
let nOfElemenetsInARow = 0
let rows = []

document.body.onload = prefillGrid;
document.body.onresize = gridResized;

const button1 = document.getElementById("button1");

button1.addEventListener("click", function () {
    animateHor();
})

function outerWidthMargin(el) {
    var width = el.offsetWidth;
    var style = getComputedStyle(el);
  
    width += parseInt(style.marginLeft) + parseInt(style.marginRight);
    return width;
}
  
  // http://youmightnotneedjquery.com/?ref=codebldr#get_width
function width (el) {
    return parseFloat(getComputedStyle(el, null).width.replace("px", ""))
}
  
function computeFirstRowItems() {
    const gr = document.getElementById("grid")
    const cl = document.getElementById("cell")

    return Math.floor(width(gr) / outerWidthMargin(cl));
}

function gridResized() {
    nOfElemenetsInARow = computeFirstRowItems()
    rows = [[nOfElemenetsInARow]]
}

function prefillGrid() {
    
    let arrLength = totalNOfElements
    let grid = document.getElementById("grid")
    for (var i = 0; i < arrLength; i++) {
        let shell = document.createElement("div")
        shell.className = "cell"
        shell.classList.add("preSpin")
        shell.id = "cell"
        //const newContent = document.createTextNode("");
        //shell.appendChild(newContent)
        grid.appendChild(shell);
    }
    gridResized()
}

async function animateHor() {
    let shells = document.getElementsByClassName("cell")
    
    for (let i = 0; i < nOfElemenetsInARow; i++) {
        let currentRow = []
        let count = i
        do {
            currentRow.push(shells[count]);
            count += nOfElemenetsInARow;
        } while (count < shells.length)
        rows[i] = currentRow
    } 
    for (let i = 0; i < nOfElemenetsInARow; i++) {
        animateRow(rows[i])
        await sleep(100) // wait before next wave
    }
}

async function animateRow(arr) {
    arr.forEach((el, idx) => {
        console.log("Animating " + idx)
        el.classList.add("spin1")
        if (el.classList.contains("preSpin")) {
            el.classList.remove("preSpin");
            el.classList.add("spinDone")
        } else {
            el.classList.remove("spinDone");
            el.classList.add("preSpin")
        }
    })
    await sleep(500); // wait for animation
    arr.forEach((el, idx) => {
        console.log("UnAnimating " + idx)
        el.classList.remove("spin1")
        
    })
}

// sleep function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
