var cron = require('node-cron');
const fecha = new Date();
console.log('dia: '+fecha.getDay())
console.log('fecha: '+fecha.getDate())
console.log('Dando hora')
fecha.setMinutes(fecha.getMinutes());
console.log('hora: '+fecha.getHours());
console.log('minutos: '+fecha.getMinutes())
console.log(fecha.toLocaleTimeString())
