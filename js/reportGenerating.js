var monthChar = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
var caseStatus = ["C", "P", "V"];
var yValueGreen = Array.apply(null, Array(monthChar.length)).map(Number.prototype.valueOf,0);
var yValueRed = Array.apply(null, Array(monthChar.length)).map(Number.prototype.valueOf,0);
var yValueGray = Array.apply(null, Array(monthChar.length)).map(Number.prototype.valueOf,0);
var clickedNumber = 0;
var clickedMonth = 0;
var tempData = [];
//Sales Chart data and chart
const salesData = {
  labels: monthChar,
  datasets: [
    {
      label: 'Expenses',
      data: yValueGreen,
      backgroundColor: "#48C9B0",
      hoverBorderWidth: 2,
      hoverBorderColor: 'yellow',
    },
    {
      label: 'Net Profit',
      data: yValueRed,
      backgroundColor: "#EC7063",
      hoverBorderWidth: 2,
      hoverBorderColor: 'yellow',
    },
    {
      label: 'Void',
      data: yValueGray,
      backgroundColor: "#808080",
      hoverBorderWidth: 2,
      hoverBorderColor: 'yellow',
    }
  ]
};

const chart_config = {
  data: salesData,
  type: "bar",
  options: {
    legend: {display: false},
    title: {
      display: false,
      text: "Report"
    },
    responsive: true,
    scales:{
      xAxes:[{
        stacked: true
      }],
      yAxes:[{ 
        beginAtZero: true,
        stacked: true
      }]
    }
  }
}

function changeForm(){
  $('#formContain').remove(); 
  $('#formContainer').append('<div class="form-group form-inline" id="formContain"><button type="button" class="btn" onclick="recoverForm()"><svg href="./Icon/arrow-left-short.svg" width="20" height="20" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"/></svg></button><span style="text-align: center;"><span id="formTitle" style="font-weight: bold;" onclick="backToMonth()"> '+yearTxt.value+' '+monthChar[clickedNumber]+' </span></span></div>');
}

function recoverForm(){
  var tempYear = yearTxt.value;
  $('#formContain').remove(); 
  $('#formContainer').append('<div class="form-group form-inline" id="formContain"><label for="inputYear"><b>Year: </b></label><select onchange="getYear(this.value)" class="form-control ml-auto" id="inputYear"></select></div>');
  getYear(tempYear);
}

function clickHandler(click){
  const points = salesChart.getElementsAtEventForMode(click, 'nearest', {intersect:true}, true)
  if(points.length){
    const firstPoint = points[0];
    clickedNumber = firstPoint._index;
    clickedMonth = clickedNumber;
    changeForm();
    loadData(yearTxt.value, firstPoint._index);
  }
}

var yearTxt = document.getElementById("inputYear");
getYear();
const salesChart = new Chart(document.getElementById("salesChart"), chart_config);

function getYear(yearSelected){
  $.ajax({
    type: 'post',
    url: './php/reportGenerating.php',
    data: {action: "getYear"},
    dataType: "json",
    success: function(data) {
        var invoicedata = data;
        var year = [];
        var tempYear, str;
        for (let i = 0; i < data.length; i++) {
          tempYear = invoicedata[i]['billdatetime'];
          str = tempYear.split('-')[0];
          year[year.length] = str;
        }
        year = year.filter(onlyUnique); 
        str = "";
        for(i=0; i<year.length; i++){
          str += "<option"+(((i+1)==year.length && yearSelected==null)||(yearSelected!=null&&year[i]==yearSelected)? " selected>":">")+year[i]+"</option>";
        }
        document.getElementById("inputYear").innerHTML = str;
        yearTxt = document.getElementById("inputYear");
        loadData(yearTxt.value, -1);
    },
    error: function(ajaxContext) {
        alert("Fail to get year");
    }
  });
}

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

function loadData(yea,mon){
  $.ajax({
    type: 'post',
    url: './php/reportGenerating.php',
    data: { action: "requestData", year:yea, month:mon},
    dataType: "json",
    success: function(data) {
        var invoicedata = data;
        tempData = invoicedata;
        var cases = Array.apply(null, Array(caseStatus.length)).map(Number.prototype.valueOf,0);
        var totalAmount = [0,0];
        if(mon == -1){
          yValueGreen = Array.apply(null, Array(monthChar.length)).map(Number.prototype.valueOf,0);
          yValueRed = Array.apply(null, Array(monthChar.length)).map(Number.prototype.valueOf,0);
          yValueGray = Array.apply(null, Array(monthChar.length)).map(Number.prototype.valueOf,0);
          for(let i=0; i<invoicedata.length; ++i){
            var tempMonth = invoicedata[i]['billdatetime'];
            var str = tempMonth.split('-')[1];
            if(invoicedata[i]['status']=='V'){
              yValueGray[parseInt(str)-1] += parseFloat(invoicedata[i]['amount']);
            }
            else{
              if(invoicedata[i]['status']=='C'){
                totalAmount[0]+=parseFloat(invoicedata[i]['amount']);
              }
              else{
                totalAmount[1]+=parseFloat(invoicedata[i]['amount']);
              }
              yValueGreen[parseInt(str)-1] += parseFloat(invoicedata[i]['actualamount']);
              yValueRed[parseInt(str)-1] += (parseFloat(invoicedata[i]['amount'])-parseFloat(invoicedata[i]['actualamount']));
            }
            cases[caseStatus.indexOf(invoicedata[i]['status'])] += 1;
          }
          salesData.labels = monthChar;
          salesData.datasets[0].data = yValueGreen;
          salesData.datasets[1].data = yValueRed;
          salesData.datasets[2].data = yValueGray;
          chart_config.data = salesData;
          salesChart.update();
          document.getElementById("salesChart").onclick = clickHandler;
        }
        else{
          var d = new Date(yearTxt.value, mon + 1, 0);
          var dayName = Array.from({length: d.getDate()}, (_, index) => index + 1);
          yValueGreen = Array.apply(null, Array(dayName.length)).map(Number.prototype.valueOf,0);
          yValueRed = Array.apply(null, Array(dayName.length)).map(Number.prototype.valueOf,0);
          yValueGray = Array.apply(null, Array(dayName.length)).map(Number.prototype.valueOf,0);
          for(let i=0; i<invoicedata.length; ++i){
            var tempDay = invoicedata[i]['billdatetime'];
            var str = tempDay.split('-')[2];
            if(invoicedata[i]['status']=='V'){
              yValueGray[parseInt(str)-1] += parseFloat(invoicedata[i]['amount']);
            }
            else{
              if(invoicedata[i]['status']=='C'){
                totalAmount[0]+=parseFloat(invoicedata[i]['amount']);
              }
              else{
                totalAmount[1]+=parseFloat(invoicedata[i]['amount']);
              }
              yValueGreen[parseInt(str)-1] += parseFloat(invoicedata[i]['actualamount']);
              yValueRed[parseInt(str)-1] += (parseFloat(invoicedata[i]['amount'])-parseFloat(invoicedata[i]['actualamount']));
            }
            cases[caseStatus.indexOf(invoicedata[i]['status'])] += 1;
          }
          salesData.labels = dayName;
          salesData.datasets[0].data = yValueGreen;
          salesData.datasets[1].data = yValueRed;
          salesData.datasets[2].data = yValueGray;
          chart_config.data = salesData;
          salesChart.update();
          document.getElementById("salesChart").onclick = dayClick;
        }
        var totalExpenses = 0.00;
        var totalSales = 0.00;
        var netProfit = 0.00;
        var totalVoid = 0.00;
        for(let i=0; i<yValueGreen.length;++i){
          totalSales += (yValueGreen[i]+yValueRed[i]+yValueGray[i]);
          totalExpenses += yValueGreen[i];
          totalVoid += yValueGray[i];
          netProfit += yValueRed[i];
        }
        var totalCases = 0;
        for(let i=0; i<cases.length; ++i){
          totalCases += cases[i];
        }
        document.getElementById('totalSales').innerHTML = totalSales.toFixed(2);
        document.getElementById('netProfit').innerHTML = netProfit.toFixed(2);
        document.getElementById('totalExpenses').innerHTML = totalExpenses.toFixed(2);
        document.getElementById('voidAmount').innerHTML = totalVoid.toFixed(2);
        document.getElementById('totalCases').innerHTML = totalCases;
        document.getElementById('pendingAmount').innerHTML = totalAmount[1];
        document.getElementById('completeAmount').innerHTML = totalAmount[0];
        document.getElementById('totalCompleted').innerHTML = cases[caseStatus.indexOf('C')];
        document.getElementById('totalPending').innerHTML = cases[caseStatus.indexOf('P')];
        document.getElementById('totalVoid').innerHTML = cases[caseStatus.indexOf('V')];
    },
    error: function(ajaxContext) {
        alert("Fail to load the chart.");
    }
});
}

function backToMonth(){
  document.getElementById('buttonBack').innerHTML = "";
  document.getElementById('dayLabel').innerHTML = "";
  var invoicedata = tempData;
  var totalExpenses = 0.00;
  var totalSales = 0.00;
  var netProfit = 0.00;
  var totalVoid = 0.00;
  var totalAmount = [0,0];
  var cases = Array.apply(null, Array(caseStatus.length)).map(Number.prototype.valueOf,0);
  for(let i=0; i<invoicedata.length; ++i){
    if(invoicedata[i]['status']=='V'){
      totalVoid += parseFloat(invoicedata[i]['amount']);
    }
    else{
      if(invoicedata[i]['status']=='C'){
        totalAmount[0]+=parseFloat(invoicedata[i]['amount']);
      }
      else{
        totalAmount[1]+=parseFloat(invoicedata[i]['amount']);
      }
      totalExpenses += parseFloat(invoicedata[i]['actualamount']);
      netProfit += (parseFloat(invoicedata[i]['amount'])-parseFloat(invoicedata[i]['actualamount']));
    }
    cases[caseStatus.indexOf(invoicedata[i]['status'])] += 1;
  }
  totalSales = totalVoid+totalExpenses+netProfit;
  var totalCases = 0;
  for(let i=0; i<cases.length; ++i){
    totalCases += cases[i];
  }
  document.getElementById('totalSales').innerHTML = totalSales.toFixed(2);
  document.getElementById('netProfit').innerHTML = netProfit.toFixed(2);
  document.getElementById('totalExpenses').innerHTML = totalExpenses.toFixed(2);
  document.getElementById('voidAmount').innerHTML = totalVoid.toFixed(2);
  document.getElementById('totalCases').innerHTML = totalCases;
  document.getElementById('pendingAmount').innerHTML = totalAmount[1];
  document.getElementById('completeAmount').innerHTML = totalAmount[0];
  document.getElementById('totalCompleted').innerHTML = cases[caseStatus.indexOf('C')];
  document.getElementById('totalPending').innerHTML = cases[caseStatus.indexOf('P')];
  document.getElementById('totalVoid').innerHTML = cases[caseStatus.indexOf('V')];
}

function dayClick(click){
  const points = salesChart.getElementsAtEventForMode(click, 'nearest', {intersect:true}, true);
  if(points.length){
    var totalExpenses = 0.00;
    var totalSales = 0.00;
    var netProfit = 0.00;
    var totalVoid = 0.00;
    var totalAmount = [0,0];
    var cases = Array.apply(null, Array(caseStatus.length)).map(Number.prototype.valueOf,0);
    firstPoint = points[0];
    clickedNumber = firstPoint._index;
    var invoicedata = tempData;
    document.getElementById('dayLabel').innerHTML = ' on' + document.getElementById('formTitle').innerHTML + ' ' + (clickedNumber+1);
    for(let i=0; i<invoicedata.length; ++i){
      var tempMonth = invoicedata[i]['billdatetime'];
      var str = tempMonth.split(' ')[0];
      strDay = str.split('-')[2];
      if(strDay==(clickedNumber+1)){
        if(invoicedata[i]['status']=='V'){
          totalVoid += parseFloat(invoicedata[i]['amount']);
        }
        else{
          if(invoicedata[i]['status']=='C'){
            totalAmount[0]+=parseFloat(invoicedata[i]['amount']);
          }
          else{
            totalAmount[1]+=parseFloat(invoicedata[i]['amount']);
          }
          totalExpenses += parseFloat(invoicedata[i]['actualamount']);
          netProfit += (parseFloat(invoicedata[i]['amount'])-parseFloat(invoicedata[i]['actualamount']));
        }
        cases[caseStatus.indexOf(invoicedata[i]['status'])] += 1;
      }
    }
    totalSales = totalVoid+totalExpenses+netProfit;
    var totalCases = 0;
    for(let i=0; i<cases.length; ++i){
      totalCases += cases[i];
    }
    document.getElementById('totalSales').innerHTML = totalSales.toFixed(2);
    document.getElementById('netProfit').innerHTML = netProfit.toFixed(2);
    document.getElementById('totalExpenses').innerHTML = totalExpenses.toFixed(2);
    document.getElementById('voidAmount').innerHTML = totalVoid.toFixed(2);
    document.getElementById('totalCases').innerHTML = totalCases;
    document.getElementById('pendingAmount').innerHTML = totalAmount[1];
    document.getElementById('completeAmount').innerHTML = totalAmount[0];
    document.getElementById('totalCompleted').innerHTML = cases[caseStatus.indexOf('C')];
    document.getElementById('totalPending').innerHTML = cases[caseStatus.indexOf('P')];
    document.getElementById('totalVoid').innerHTML = cases[caseStatus.indexOf('V')];

  }
}