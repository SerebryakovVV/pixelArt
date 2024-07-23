let MAIN_COLOR = "#000000";
let drawing = false;
const size = document.getElementById('size');
const generateFieldBtn = document.getElementById('generateFieldBtn');
const colorPicker = document.getElementById('colorPicker');
const savedColors = document.querySelectorAll(".color");
const field = document.getElementById('field');
const main = document.getElementById('main');

main.addEventListener('mousedown', ()=>drawing=true);
main.addEventListener('mouseup', ()=>drawing=false);

size.addEventListener('focusout', (e) => {
    let num = e.target;
    if (num.value < 8) {
        num.value = 8;
    }
    if (num.value > 64) {
        num.value = 64;
    }
})

colorPicker.addEventListener("input", () => MAIN_COLOR = colorPicker.value);

function componentToHex(comp) {
    let hex = comp.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(rgb) {
    const nums = rgb.slice(4, -1).split(', ').map((x)=>parseInt(x));
    return '#' + componentToHex(nums[0]) + componentToHex(nums[1]) + componentToHex(nums[2]);
}

for (let i = 0; i < savedColors.length; i++) {
    savedColors[i].style.backgroundColor = '#ffffff';
	savedColors[i].addEventListener("click", () => {
        savedColors[i].style.backgroundColor = MAIN_COLOR;
    })
    savedColors[i].addEventListener("contextmenu", (e) => {
        e.preventDefault();
        MAIN_COLOR = savedColors[i].style.backgroundColor;
        colorPicker.value = rgbToHex(MAIN_COLOR);

    })   
}


generateFieldBtn.addEventListener('click', () => {
    generateField(size.value);
})

function generateField(size) {
    if (size == '') {
        size = 8;
    }
    field.innerHTML = '';
    for (let i = 0; i < size; i++) {
        let row = document.createElement("div");
        row.className = "row";
        field.appendChild(row);
        for (let j = 0; j < size; j++) {
            let pixel = document.createElement("div");
            pixel.className = "pixel";
            pixel.addEventListener("click", (e) => {
                e.target.style.backgroundColor = MAIN_COLOR;
            });
            pixel.addEventListener('mouseenter', (e)=>{
                if (drawing==true){
                    e.target.style.backgroundColor = MAIN_COLOR;
                }
            })
            row.appendChild(pixel);
        }
    }
}

generateField(16);
