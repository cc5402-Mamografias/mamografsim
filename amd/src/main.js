define([
  "jquery"
], function ($) {
  // var toolOnClick = (tool) => {
  //   console.log(tool);
  //   const i = this.active_tools.indexOf(tool);
  //   if (i > -1) {
  //     this.active_tools.splice(i, 1);
  //   } else {
  //     this.active_tools.push(tool);
  //   }
  // };

  return {
    active_tools: [],
    available_tools: ["Balanza", "Electrometro", "Termometro"],

    init: function () {
      console.log("Aqui estamoss");
      // var toolClick = this.bind(toolOnClick);

      this.available_tools.forEach((tool) => {
        var r = $('<button title= "AD." class="herrams-boton" onclick="draw_tool();"></button>');
        r.append($('<img src="https://static.reol.cl/reol.png" width=64> <br>)')).append(tool);
        r.appendTo("#herramientas-express");
        console.log('append tool');
      });
    },

    draw: function () {
      this.active_tools.forEach((tool) => tool.draw());
    },

    loop: function () {},
  };
});
