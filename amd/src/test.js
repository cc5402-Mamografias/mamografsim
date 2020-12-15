import jQuery from "jquery";

window.$ = window.jQuery = $ = jQuery;
class Test{
   constructor(){
       console.log("test");
   }
}

export{
    Test
};