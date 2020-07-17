#!/usr/bin/env node


const argv = process.argv;

const fs = require('fs');

const path =require('path');

const command = argv[2]; //learnBin init > init

const {stdin,stdout,stderr} = process;
console.log(`package.json中定义的config:`)
console.log(`ip:`+process.env.npm_package_config_ip)
console.log(`port`+process.env.npm_package_config_port)

console.log(`命令行中动态设置了aa这个环境变量:`+process.env.aa)

console.log(`命令行中动态设置了npm_config_also这个环境变量:`+process.env.npm_config_also)

console.log(`命令行中动态设置了npm_package_config_dns这个环境变量:`+process.env.npm_package_config_dns)

async function writeOut(message){
       return new Promise((resolve,reject)=>{
               setTimeout(function(){
                stdout.write(message);
                resolve();
               },100) 
       })
}



async function handleCommand(){

    if (command == 'init'){

        let outMessage = '正在为您初始化...\n';

        let currentField = null;

        let obj = {
                 name:'',
                 version:''
        }

        let fields = Object.keys(obj);

        let fieldsPointerIndex = 0;
    
        for(let i=0; i < outMessage.length ;i++){
            let chunk = outMessage[i];
            await writeOut(chunk)
        }

        currentField = fields[fieldsPointerIndex];

        stdout.write(currentField+':');

        stdin.setEncoding('utf-8');

        stdin.on('data',(chunk)=>{
         
             if(currentField){
                obj[currentField] = chunk.trim();
                fieldsPointerIndex ++ ;
                if(fieldsPointerIndex == fields.length){
                    stdout.write(`初始化完成,正在生成learn-bin.package.json文件...`);  
                    stdout.write('\x1b[36m%s\x1b[0m', 'I am cyan')
                    let file = path.resolve(__dirname+'/learn-bin.package.json');
                    fs.writeFile(file,JSON.stringify(obj,null,'\t'),(err)=>{
                        if(err) throw err;
                        stdout.write(`json文件已经生成,谢谢使用，再见`)
                        process.exit(0)
                    })
                   
                }else{
                    currentField = fields[fieldsPointerIndex];
                    stdout.write(currentField+':');
                }
                
             }
            
        })
        

    }
}

handleCommand();




