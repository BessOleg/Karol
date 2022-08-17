var timeset = 0, timestep = 100, timeflag = false;

$("#gocode").click(function () {
    let iterfase =$("#interface")[0]
    iterfase.style.pointerEvents="none";

    timeflag = true;
    var code = $("textarea")[0].value;

    try {
        eval(code);
    } catch (e) {
        alert("Error:" + e);
    }
    setTimeout(()=>iterfase.style.pointerEvents="",timeset);
    timeflag = false;
    timeset = 0;

})

