# AMFI API
<a href="https://heroku.com/deploy">
  <img src="https://www.herokucdn.com/deploy/button.svg" alt="Deploy">
</a>

AMFI is a nodal association of mutual funds across India. AMFI provides useful knowledge and insights regarding mutual funds and investments. For more information, visit https://www.amfiindia.com/.

**Demo:** https://amfi-api.herokuapp.com/

This is a **Node.js + Express** API that tries to scrape what it can out of the AMFI daily text based data sources.  
The endpoints used for the daily NAV values are: https://www.amfiindia.com/spages/NAVAll.txt  
and for the historical NAV values: http://portal.amfiindia.com/DownloadNAVHistoryReport_Po.aspx?tp=1&frmdt=01-Oct-2018&todt=03-Oct-2018

***Please Note:*** There is a check in the code where I leave out all direct plans from the JSON. If you require that as well, please remove the conditional checking `&& !funds[i][3].includes("Direct")` in `line 17` of `api.js`.

## API Endpoints

### `/` - Daily NAV Values of All Mutual Funds
Request: `http://localhost:8081/`  
Response:
```
[
    {
        "Scheme Code": "108272",
        "ISIN Div Payout/ ISIN Growth": "INF209K01LX6",
        "ISIN Div Reinvestment": "INF209KA11Z3",
        "Scheme Name": "Aditya Birla Sun Life Banking & PSU Debt Fund - Regular Plan-Dividend",
        "Net Asset Value": "153.4764",
        "Date": "10-Oct-2018"
    },
    {
        "Scheme Code": "108273",
        "ISIN Div Payout/ ISIN Growth": "INF209K01LV0",
        "ISIN Div Reinvestment": "-",
        "Scheme Name": "Aditya Birla Sun Life Banking & PSU Debt Fund - Regular Plan-Growth",
        "Net Asset Value": "226.6179",
        "Date": "10-Oct-2018"
    },
    {
        "Scheme Code": "110282",
        "ISIN Div Payout/ ISIN Growth": "INF209K01LU2",
        "ISIN Div Reinvestment": "-",
        "Scheme Name": "Aditya Birla Sun Life Banking & PSU Debt Fund - Regular Plan-Monthly Dividend",
        "Net Asset Value": "104.4723",
        "Date": "10-Oct-2018"
    },
    {
        "Scheme Code": "108274",
        "ISIN Div Payout/ ISIN Growth": "INF209K01LN7",
        "ISIN Div Reinvestment": "-",
        "Scheme Name": "Aditya Birla Sun Life Banking & PSU Debt Fund - Regular Plan-Quarterly Dividend",
        "Net Asset Value": "102.0788",
        "Date": "10-Oct-2018"
    },
... 8000+ more objects]
```

--

### `/:schemeCode` - Today's NAV Value of an Individual Mutual Fund
Request: `http://localhost:8081/128953`  
Response:
```
{
    "Scheme Code": "128953",
    "ISIN Div Payout/ ISIN Growth": "INF846K01NG6",
    "ISIN Div Reinvestment": "-",
    "Scheme Name": "Axis Banking & PSU Debt Fund - Bonus Option",
    "Net Asset Value": "1289.4075",
    "Date": "18-May-2015"
}
```

--

### `/:startDate/:endDate` - Historical NAV Values of All Mutual Funds
Request: `http://localhost:8081/01-Oct-2018/10-Oct-2018`  
Response:
```
[
    {
        "Scheme Code": "101181",
        "Scheme Name": "JM Income Fund - Bonus Option - Principal Units",
        "Net Asset Value": "19.5266",
        "Repurchase Price": "",
        "Sale Price": "",
        "Date": "01-Oct-2018"
    },
    {
        "Scheme Code": "101181",
        "Scheme Name": "JM Income Fund - Bonus Option - Principal Units",
        "Net Asset Value": "19.4949",
        "Repurchase Price": "",
        "Sale Price": "",
        "Date": "03-Oct-2018"
    },
    {
        "Scheme Code": "101181",
        "Scheme Name": "JM Income Fund - Bonus Option - Principal Units",
        "Net Asset Value": "19.4780",
        "Repurchase Price": "",
        "Sale Price": "",
        "Date": "04-Oct-2018"
    },
    {
        "Scheme Code": "101181",
        "Scheme Name": "JM Income Fund - Bonus Option - Principal Units",
        "Net Asset Value": "19.5355",
        "Repurchase Price": "",
        "Sale Price": "",
        "Date": "05-Oct-2018"
    },
    {
        "Scheme Code": "101181",
        "Scheme Name": "JM Income Fund - Bonus Option - Principal Units",
        "Net Asset Value": "19.5661",
        "Repurchase Price": "",
        "Sale Price": "",
        "Date": "08-Oct-2018"
    },
    {
        "Scheme Code": "101181",
        "Scheme Name": "JM Income Fund - Bonus Option - Principal Units",
        "Net Asset Value": "19.5315",
        "Repurchase Price": "",
        "Sale Price": "",
        "Date": "09-Oct-2018"
    },
... 6000+ more objects]
```

--

### `/:startDate/:endDate/:schemeCode` - Historical NAV Values of an Individual Mutual Fund
Request: `http://localhost:8081/01-Oct-2018/10-Oct-2018/101181`  
Response:
```
[
    {
        "Scheme Code": "101181",
        "Scheme Name": "JM Income Fund - Bonus Option - Principal Units",
        "Net Asset Value": "19.5266",
        "Repurchase Price": "",
        "Sale Price": "",
        "Date": "01-Oct-2018"
    },
    {
        "Scheme Code": "101181",
        "Scheme Name": "JM Income Fund - Bonus Option - Principal Units",
        "Net Asset Value": "19.4949",
        "Repurchase Price": "",
        "Sale Price": "",
        "Date": "03-Oct-2018"
    },
    {
        "Scheme Code": "101181",
        "Scheme Name": "JM Income Fund - Bonus Option - Principal Units",
        "Net Asset Value": "19.4780",
        "Repurchase Price": "",
        "Sale Price": "",
        "Date": "04-Oct-2018"
    },
    {
        "Scheme Code": "101181",
        "Scheme Name": "JM Income Fund - Bonus Option - Principal Units",
        "Net Asset Value": "19.5355",
        "Repurchase Price": "",
        "Sale Price": "",
        "Date": "05-Oct-2018"
    },
    {
        "Scheme Code": "101181",
        "Scheme Name": "JM Income Fund - Bonus Option - Principal Units",
        "Net Asset Value": "19.5661",
        "Repurchase Price": "",
        "Sale Price": "",
        "Date": "08-Oct-2018"
    },
    {
        "Scheme Code": "101181",
        "Scheme Name": "JM Income Fund - Bonus Option - Principal Units",
        "Net Asset Value": "19.5315",
        "Repurchase Price": "",
        "Sale Price": "",
        "Date": "09-Oct-2018"
    }
]
```
