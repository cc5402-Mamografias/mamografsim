

export function drawMam() {
        console.log("Draw mamografo")
        let canvas1 = document.getElementById("canvas");
        var ctx = canvas1.getContext('2d');
        let image = new Image();
        image.src = 'img/complete.svg';
        image.onload = function () {
            ctx.drawImage(image, 5, 5);
        };
    }




