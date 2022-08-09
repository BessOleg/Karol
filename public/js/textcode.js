var timeset = 0, timestep=100, timeflag = false;
$("#gocode").click(function () {
    //timeset +=timeset;
    timeflag = true;
    // console.log($("textarea")[0].value)
    var code = $("textarea")[0].value;
    // console.log(code)

    try {
        eval(code);
    } catch (e) {
        //  console.log(e)
        alert("Error:" + e);
    }
    timeflag = false;
    timeset = 0;
})