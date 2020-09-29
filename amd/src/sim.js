define(['jquery'], function($) {
    var x = 0;
    var c = document.getElementById("canv");
    var ctx = c.getContext("2d");

    var alrt = function() {
      alert("!");
    };

    return {
        init: function() {

            // Put whatever you like here. $ is available
            // to you as normal.
            $("#canv").on("mousedown", function() {
                ctx.moveTo(x, 50);
                ctx.lineTo(x+5, 100);
                ctx.stroke();
                x += 20;
            });
            ctx.font = "14px Arial";
            ctx.fillStyle = "gray";
            ctx.fillText("Mamógrafo",0,14);
            let res = document.getElementById("canvRes");
            let resctx = res.getContext("2d");
            resctx.font = "14px Arial";
            resctx.fillStyle = "gray";
            resctx.fillText("Resultados",0,14);

            $(".herram_button").click(alrt);
        }
    };
});

/*var main = (function () {
    var module = {};
    var simarea = {};

    module.start = function (canvasid) {
      simarea.canvas = document.getElementById(canvasid);

      simarea.canvas.width = 480;
      simarea.canvas.height = 300;
      simarea.context = simarea.canvas.getContext("2d");

      window.addEventListener("mousedown", function (e) {
        simarea.x = e.pageX;
        simarea.y = e.pageY;
      });
      window.addEventListener("mouseup", function (e) {
        simarea.x = false;
        simarea.y = false;
      });
      window.addEventListener("touchstart", function (e) {
        simarea.x = e.pageX;
        simarea.y = e.pageY;
      });
      window.addEventListener("touchend", function (e) {
        simarea.x = false;
        simarea.y = false;
      });

      simarea.interval = setInterval(this.update, 20);
    };

    module.update = function () {
      simarea.clear();
      mammographer.update();
    };

    simarea.clear = function () {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };

    var mammographer = {
      compressorPosY: 100,
      compressorPosX: 240,
      compressorVelY: 2,
      compressorHBY: 10,
      compressorHBX: 40,
      compressorMaxPosY: 200,
      compressorMinPosY: 0,

      pedalsY: 240,
      pedalDownX: 220, //izquierda
      pedalUpX: 260, // derecha
      pedalsHBX: 20,
      pedalsHBY: 40,
      pedalDownClicked: false,
      pedalUpClicked: false,
      drawStructure: function () {
        ctx = simarea.context;
        ctx.fillStyle = "black";
        ctx.fillRect(
          this.compressorPosX,
          this.compressorPosY,
          this.compressorHBX,
          this.compressorHBY
        );
      },
      drawPedals: function () {
        ctx = simarea.context;

        ctx.fillStyle = "blue";
        if (this.pedalDownClicked) {
          ctx.fillStyle = "red";
        }
        ctx.fillRect(
          this.pedalDownX - this.pedalsHBX / 2,
          this.pedalsY - this.pedalsHBY / 2,
          this.pedalsHBX,
          this.pedalsHBY
        );

        if (this.pedalUpClicked) {
          ctx.fillStyle = "red";
        } else {
          ctx.fillStyle = "blue";
        }
        ctx.fillRect(
          this.pedalUpX - this.pedalsHBX / 2,
          this.pedalsY - this.pedalsHBY / 2,
          this.pedalsHBX,
          this.pedalsHBY
        );
      },

      update: function () {
        this.pedalDownClicked = false;
        this.pedalUpClicked = false;
        if (simarea.x && simarea.y) {
          // check if down pedal clicked
          if (
            !(
              simarea.x < this.pedalDownX - this.pedalsHBX / 2 ||
              simarea.x > this.pedalDownX + this.pedalsHBX / 2 ||
              simarea.y < this.pedalsY - this.pedalsHBY / 2 ||
              simarea.y > this.pedalsY + this.pedalsHBY / 2
            )
          ) {
            this.pedalDownClicked = true;
            this.compressorPosY = Math.max(
              this.compressorMinPosY,
              this.compressorPosY - this.compressorVelY
            );
          }

          if (
            !(
              simarea.x < this.pedalUpX - this.pedalsHBX / 2 ||
              simarea.x > this.pedalUpX + this.pedalsHBX / 2 ||
              simarea.y < this.pedalsY - this.pedalsHBY / 2 ||
              simarea.y > this.pedalsY + this.pedalsHBY / 2
            )
          ) {
            this.compressorPosY = Math.min(
              this.compressorMaxPosY,
              this.compressorPosY + this.compressorVelY
            );
            this.pedalUpClicked = true;
          }
        }

        this.drawPedals();
        this.drawStructure();
      },
    };

    return module;
  })();

  console.log("module loaded");
  */