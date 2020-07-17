const net=require('net');



const client=net.createConnection({
    host:'172.17.0.2',
    port:3306
},()=>{
    console.log(`connect`)
})

var isLogin = false;




client.setKeepAlive(true)


client.on('error', (error) => {
    console.log(`error:${error}`);
  });

client.on('data', (data) => {

    console.log(`data:${data}`);

    if(!isLogin){

       client.write(`mysql -u root`,()=>{
             console.log(`write login`);
             isLogin = true;  
        })  
     }
    
  });


client.on('close', () => {
    console.log('close');
  });


 client.on('end', () => {
    console.log('已从服务器断开');
  });
