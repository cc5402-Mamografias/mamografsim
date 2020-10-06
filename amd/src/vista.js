

define(function() {
    function drawMam() {
        alert("test");
        let canvas = document.getElementById("canvas");
        let image = new Image();
        image.src = 'img/complete.svg';
        image.onload = function () {
            canvas.drawImage(image, 50, 50);
        };

    }

    return {
        init: function(){

            drawMam();
        }

    };
});