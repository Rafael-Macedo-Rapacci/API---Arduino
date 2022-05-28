const express = require("express");
const { ArduinoData } = require("./serial");
const router = express.Router();
const {getConnAzure} = require('./connection');

router.get("/", (request, response, next) => {
  let sum = ArduinoData.List.reduce((a, b) => a + b, 0);
  let average = (sum / ArduinoData.List.length).toFixed(2);

  response.json({
    data: ArduinoData.List,
    total: ArduinoData.List.length,
    average: isNaN(average) ? 0 : average,
  });
});

router.post("/sendData", (request, response) => {
  let temperatura = ArduinoData.List[ArduinoData.List.length - 1];

  temperatura = temperatura.toFixed(1)

  var sql = `Insert INTO Dados(Temperatura, fkSensor, fkAreaSensor, fkAreaEmpresaSensor) VALUES
  ('${temperatura}', 1, 4, 1),
  ('${Number(temperatura) + 2}', 2, 5, 1);
  `;

  getConnAzure(sql).then(val=>console.log(val))

  response.sendStatus(200);
});

module.exports = router;
