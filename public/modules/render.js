'use strict'
let {
  mapPropertis,
  playrTurn,
  wordlTask
} = require('./storage')

let updateGameArea = (world) => {
  world.clear() // чистим поле
  world.netupdate()// обновляем сетку
  if (mapPropertis.wallMass.length > 0) // обновляем все елементы если они есть
  {
    for (let i in mapPropertis.wallMass) {
      mapPropertis.wallMass[i].update()
    }
  }
  lvltask()
  if (wordlTask.type === 'dispense' && wordlTask.userstep === wordlTask.condition) {
    world.newlvl()
  }
  if (wordlTask.type === 'loot' && wordlTask.userstep === 0) {
    world.newlvl()
  }
  mapPropertis.myScore.text = 'x:' + mapPropertis.myPlayr.x + ' y:' + mapPropertis.myPlayr.y
  turnImeg()
  mapPropertis.myPlayr.update() // обновляем персонажа
  mapPropertis.myScore.update() // обновляем отображение координат перемишения
}

let lvltask = () => {
  let index = 0
  for (let key in mapPropertis.wallMass) {
    if (mapPropertis.wallMass[key].type === 'font') {
      for (let item in mapPropertis.wallMass) {
        if (mapPropertis.wallMass[item].type === 'image') {
          if (mapPropertis.wallMass[key].x === mapPropertis.wallMass[item].x && mapPropertis.wallMass[key].y === mapPropertis.wallMass[item].y) {
            index += 1
          }
        }
      }
    }
  }
  wordlTask.userstep = index
}

let turnImeg = () => {
  if (mapPropertis.levelTurn === 1) mapPropertis.myPlayr.image.src = playrTurn.left
  if (mapPropertis.levelTurn === 2) mapPropertis.myPlayr.image.src = playrTurn.down
  if (mapPropertis.levelTurn === 3) mapPropertis.myPlayr.image.src = playrTurn.right
  if (mapPropertis.levelTurn === 0) mapPropertis.myPlayr.image.src = playrTurn.up
  // mapPropertis.levelTurn = 0;
}

module.exports.render = updateGameArea
