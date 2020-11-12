//HAY QUE BUSCAR LA FORMA DE IMPORTAR FUNCIONES ADDEVENTLISTENER

document.addEventListener("drag", function (event) {
    console.log("pick");
}, false);

document.addEventListener("dragstart", function (event) {
    console.log("dragstart");
    // store a ref. on the dragged elem
    this.dragged = event.target;
    // make it half transparent
    event.target.opacity = 0.5;
}, false);

document.addEventListener("dragend", function (event) {
    console.log("reseteo transparencia");
    // reset the transparency
    event.target.opacity = "";
}, false);

/* events fired on the drop targets */
document.addEventListener("dragover", function (event) {
    // prevent default to allow drop
    event.preventDefault();
}, false);

document.addEventListener("dragenter", function (event) {
    console.log("Estoy dentro de un dropzone")
    // highlight potential drop target when the draggable element enters it
    if (event.target.className == "dropzone") {
        event.target.style.background = "red";
    }

}, false);

document.addEventListener("dragleave", function (event) {
    console.log("salgo de mi posicion original");
    // reset background of potential drop target when the draggable element leaves it
    if (event.target.className == "dropzone") {
        event.target.style.background = "";
    }

}, false);

document.addEventListener("drop", function (event) {
    // prevent default action (open as link for some elements)
    event.preventDefault();
    // move dragged elem to the selected drop target
    if (event.target.className == "dropzone") {
        event.target.style.background = "";
        this.dragged.parentNode.removeChild(this.dragged);
        event.target.appendChild(this.dragged);
    }

}, false);