$("#gocode").click(function (){
   // console.log($("textarea")[0].value)
    var code = $("textarea")[0].value;
   // console.log(code)
    try{
        eval(code);
    }catch (e) {
      //  console.log(e)
        alert("Error:" + e);
    }
})