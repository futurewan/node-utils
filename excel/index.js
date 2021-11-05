let xlsx = require('xlsx');
let fs = require('fs')

const input = 'docs/枫叶汽车授权服务网点录入新官网信息.xlsx'
// const output = '80v.json'
// const sheetIndex = 0
const output = '30x.json'
const sheetIndex = 1
const jsonHeader = ['id','province','city','service_site','address','mobile','time','car_type']

// 存放数据项的value值为[]
const outData = {
  "ret": 0,
  "result": {
      "style": "api",
      "version": "",
      "json": [],
      "auto_interval": 3600,
      "maunal_update": "no",
      "maunal_interval": 2000
  },
  "msg": "",
  "toast": "",
  "timestamp": 1629776157
}


let workbook = xlsx.readFile(input); //workbook就是xls文档对象
let sheetNames = workbook.SheetNames; //获取表明
// console.log('workbook',workbook)
 //通过表名得到表对象
let sheet = workbook.Sheets[sheetNames[sheetIndex]];
var sheetJson = xlsx.utils.sheet_to_json(sheet,{
  defval:'',
  header:jsonHeader
}); //通过工具将表对象的数据读出来并转成json


function setData(data){
  if(typeof data!== 'object'){
    return {}
  }
  for(let key in data){
    // 对key值为'[]' 赋值
    if(JSON.stringify(data[key]) === '[]'){
      data[key] = sheetJson
    } else if(Object.prototype.toString.call(data[key]) === '[object Object]'){
      setData(data[key])
    }
  }
  return data
}
const res = JSON.stringify(setData(outData))
fs.writeFile(output, res, () => {});
console.log('导出成功')