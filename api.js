var express = require('express')
var router = express.Router()

const request = require('request')

function parseData(body) {
  fundData = []
  bodyClean = body.replace(/\r?\n/g, "\n")
  bodyArr = bodyClean.split("\n")
  funds = bodyArr.map((str) => {
    return str.split(";")
  })

  headers = funds[0]

  for (let i = 1; i < funds.length; i++) {
    if (funds[i].length === 6 && !funds[i][3].includes("Direct")) {
      let obj = {}
      for (let j = 0; j < 6; j++)
        obj[headers[j]] = funds[i][j]
      fundData.push(obj)
    }
  }

  return fundData
}

router.get('/', function (req, res) {
  const url = 'https://www.amfiindia.com/spages/NAVAll.txt'

  request(url, function (error, response, body) {
    const fundData = parseData(body)

    res.json(fundData)
  })
})

router.get('/:schemeCode', function (req, res) {
  const url = 'https://www.amfiindia.com/spages/NAVAll.txt'

  request(url, function (error, response, body) {
    let fundData = parseData(body)

    fundData = fundData.filter((fund) => {
      if (fund['Scheme Code'] == req.params.schemeCode)
        return fund
    })

    res.json(fundData[0])
  })
})

router.get('/:startDate/:endDate', function (req, res) {
  const url = 'http://portal.amfiindia.com/DownloadNAVHistoryReport_Po.aspx?tp=1&frmdt=' + req.params.startDate + '&todt=' + req.params.endDate

  request(url, function (error, response, body) {
    const fundData = parseData(body)

    res.json(fundData)
  })
})

router.get('/:startDate/:endDate/:schemeCode', function (req, res) {
  const url = 'http://portal.amfiindia.com/DownloadNAVHistoryReport_Po.aspx?tp=1&frmdt=' + req.params.startDate + '&todt=' + req.params.endDate

  request(url, function (error, response, body) {
    let fundData = parseData(body)

    fundData = fundData.filter((fund) => {
      if (fund['Scheme Code'] == req.params.schemeCode)
        return fund
    })

    res.json(fundData)
  })
})

module.exports = router