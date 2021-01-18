
export function setDragAndDrop(main) {

    document.addEventListener("drag", function (event) {
      }, false);
      
      document.addEventListener("dragstart", function (event) {
        this.dragged = event.target;
        event.target.opacity = 0.5;
      }, false);
      
      document.addEventListener("dragend", function (event) {
        // reset the transparency
        event.target.opacity = "";
      }, false);
      
      /* events fired on the drop targets */
      document.addEventListener("dragover", function (event) {
        // prevent default to allow drop
        event.preventDefault();
      }, false);
      
      document.addEventListener("dragenter", function (event) {
        //console.log("Estoy dentro de un dropzone")
        // highlight potential drop target when the draggable element enters it
        if (event.target.classList.contains("dropzone")) {
          event.target.style.background = "red";
        }
      
      }, false);
      
      document.addEventListener("dragleave", function (event) {
        // reset background of potential drop target when the draggable element leaves it
        if (event.target.classList.contains("dropzone")) {
          event.target.style.background = "";
        }
      }, false);
      
      document.addEventListener("drop", function (event) {
        // prevent default action (open as link for some elements)
        event.preventDefault();
        // move dragged elem to the selected drop target
        if (event.target.classList.contains("dropzone")) {
          event.target.style.background = "";
          this.dragged.parentNode.removeChild(this.dragged);
          event.target.appendChild(this.dragged);
          //PARA CHECKEAR SI ESTA EN POSICION CORRECTA
          if (event.target.id == "posicion_buena") {
            main.mesaTopDown.check_pos_correct()
          }
          else {
            main.mesaTopDown.check_pos_incorrect()
          }
        }
      }, false);

};