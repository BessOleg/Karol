// let {myGameArea} = require("./worldCanvas")
'use strict'
var $ = require("jquery")
//jquery add
let {KarelCodeManag, mapPropertis,tool} = require('./storage')
let {crashWith} = require('./Crash')

function component(width, height, color, x, y, type) {
    this.type = type
    this.width = width
    this.height = height
    this.speedX = 0
    this.speedY = 0
    this.x = x
    this.y = y

    if (this.type === 'image') {
        this.image = new Image()
        this.image.src = color
    }
    this.update = () => {
        let ctx = tool.ctx
        ctx.beginPath()
        ctx.globalAlpha = 1 // прозрачность
        if (this.type === 'text') {
            ctx.globalAlpha = 0.3
            ctx.font = this.width + ' ' + this.height
            ctx.fillStyle = color
            ctx.fillText(this.text, this.x, this.y)
        }
        if (this.type === 'cube') {
            ctx.fillStyle = color
            ctx.fillRect(this.x, this.y, this.width, this.height)
        }
        if (this.type === 'font') {
            ctx.fillStyle = color
            ctx.fillRect(this.x, this.y, this.width, this.height)
        }
        if (type === 'image') {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
        }
    }
    this.newPos = () => {
        //console.log(this);
        if (mapPropertis.wallMass.length > 0) {
            if (this.speedX !== 0) {
                //console.log("crashX")
                this.x += crashWith()
            }
            if (this.speedY !== 0) {
                //  console.log("crashY")
                // Controls.crashWith();
                this.y += crashWith()
            }
        } else {
            this.x += this.speedX
            this.y += this.speedY
        }
        if (this.x < 0) this.x = 0
        if (this.x + this.width > tool.canvas.width) this.x = tool.canvas.width - this.width
        if (this.y < 0) this.y = 0
        if (this.y + this.height > tool.canvas.height) this.y = tool.canvas.height - this.height
        if (KarelCodeManag.timeflag) {
            KarelCodeManag.stepKerrol.push({
                x: this.x, y: this.y
            })
        }
    }
}

module.exports = {'component': component}