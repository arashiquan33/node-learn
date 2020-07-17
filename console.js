

const { Console } = require('console');
const fs = require('fs');
let obj= {
     name:1,
     child:{
          name:2,
          list:[1,2,3],
          child:{
              name:3,
              list:[3,4,5]
          }
     }
}
console.dir(obj)
console.dir(obj,{
    depth:5
})




console.time('start');
const output = fs.createWriteStream('./stdout.log');
const errorOutput = fs.createWriteStream('./stderr.log');
// 自定义的简单记录器111。
const logger = new Console({ stdout: output, stderr: errorOutput });
// 像控制台一样使用它。把输出流输出到文件中
const count = 5;
const getTimeStamp = function(){
      return new Date().toTimeString()
}
logger.log(getTimeStamp()+':访问1111');

logger.error(new Error(`错误信息`))

logger.log(getTimeStamp()+':访问1111');

logger.warn(`警告！！！！！`)

console.timeEnd('start');
