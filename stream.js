//steam 流

//readable可读流

//writable可写流

//readableStream.pipe(destnaion,option) 可读流写入可写流

//可读流 data事件会自动触发流式读取，readable事件并不会，需要事件内部显示调用read()方法来读取数据
//readable事件内部无法调用pause()方法来暂停读取,data事件内部可以
//highwatermark 设置可读流或者可写流的水位，比如可读流水位4，那么每次读取4个字节
//stream.write()方法返回值为false时，表明写入的数据多了，大于hwk,
const fs = require('fs');

const rs = fs.createReadStream('./package.json',{
    highWaterMark:4  //设置每次读取的最大字节数
})

const ws = fs.createWriteStream('./stream-pipe-package.json',{
    highWaterMark:2
});




// rs.on('data',(chunk)=>{
//     console.log(`chunk = ${chunk}`);
//     rs.pause();
//     console.log(`暂停一秒`);
//     console.log(rs.readableHighWaterMark)
//     setTimeout(function(){
//         rs.resume();
//     },1000)

// })
//如果存在 'readable' 事件监听器，则 readable.pause() 方法不起作用。data事件的时候，pause()才起作用
rs.setEncoding('utf8')
rs.on('readable',()=>{
    let chunk; 
    //read每次读取数据，如果不传递参数，每次读取数据量由highwatermark决定
    //如果传递参数n,0 < n < hwm 
    while((chunk = rs.read()) !== null){ 
      let isFull = ws.write(chunk)
    } 
})


rs.on('close',(chunk)=>{
    console.log(`rs close`);
})

rs.on('end',(chunk)=>{
    console.log(`rs end`);
})

rs.on('pause',(chunk)=>{
    console.log(`rs pause`);
})

ws.on('close',()=>{
      console.log(`ws close`)
})


ws.on('finish',()=>{
    console.log(`ws finish`)
})

