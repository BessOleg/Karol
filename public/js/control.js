
var trn = 0;
function turn(){
  trn++;
  if(trn>3)
      trn=0;
}

function move() {
    switch (trn) {
        case 0: myGamePiece.speedY = -30; // up
            break;
        case 2: myGamePiece.speedY = 30; // down
            break;
        case 1: myGamePiece.speedX = -30; // left
            break;
        case 3: myGamePiece.speedX = 30; // right
            break;
    }
}

function clearmove() {
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
}

function token() {
    var x = myGamePiece.x +( myGamePiece.width/2)
    var y = myGamePiece.y + (myGamePiece.height/2)
    if(coin.height == 0)
    {
        coin.x = myGamePiece.x;
        coin.y = myGamePiece.y;
        coin.height = 30;
        coin.width = 30;

    }
    else if( x >= coin.x && x  <= coin.x + coin.width && y >= coin.y && y <= coin.y + coin.height){

        coin.height = 0;
        coin.width = 0;
    }
    console.log("мелочь а приятно)")
}