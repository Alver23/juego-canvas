var canvas = document.querySelector('#lienzo')
var ctx = canvas.getContext('2d')

//Cielo
var grd = ctx.createLinearGradient(0, 0, 0, 500)
grd.addColorStop(0, 'blue')
grd.addColorStop(1, 'white')
ctx.fillStyle = grd
ctx.fillRect(0, 0, 1000, 500)
