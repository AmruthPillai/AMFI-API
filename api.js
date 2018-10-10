var express = require('express')
var router = express.Router()

const request = require('request')

const fundData = [];
const apiEndpoint = 'http://portal.amfiindia.com/DownloadNAVHistoryReport_Po.aspx?mf=3&tp=1&frmdt=01-Oct-2018&todt=10-Oct-2018';

router.get('/', function (req, res) {
  request(apiEndpoint, function (error, response, body) {
    if (error) console.error(error)

    bodyClean = body.replace(/\r?\n/g, "\n");
    bodyArr = bodyClean.split("\n");
    funds = bodyArr.map((str) => {
      return str.split(";");
    });

    headers = funds[0];

    for (let i = 1; i < funds.length; i++) {
      if (funds[i].length === 6 && !funds[i][1].includes("Direct") && funds[i]) {
        let obj = {};
        for (let j = 0; j < 6; j++)
          obj[headers[j]] = funds[i][j];
        fundData.push(obj);
      }
    }

    res.json(fundData);
  })
})

router.get('/:schemeCode', function (req, res) {
  console.log(req.params.schemeCode);

  request(apiEndpoint, function (error, response, body) {
    if (error) console.error(error)

    bodyClean = body.replace(/\r?\n/g, "\n");
    bodyArr = bodyClean.split("\n");
    funds = bodyArr.map((str) => {
      return str.split(";");
    });

    headers = funds[0];

    for (let i = 1; i < funds.length; i++) {
      if (funds[i].length === 6 && !funds[i][1].includes("Direct") && funds[i]) {
        let obj = {};
        for (let j = 0; j < 6; j++)
          obj[headers[j]] = funds[i][j];
        fundData.push(obj);
      }
    }

    let resData = fundData.filter((fund) => {
      return fund['Scheme Code'] === req.params.schemeCode;
    })

    res.json(resData);
  })
})

module.exports = router