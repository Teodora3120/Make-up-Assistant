const fs=require('fs')
const fsPromises=require('fs').promises
const os=require('os')
const path=require('path')

const fileOps=async() => {
    try{
        const data=await fsPromises.readFile('../TEXT/text.txt', 'utf8')
        console.log(data)
        await fsPromises.unlink('../TEXT/text.txt')
        await fsPromises.writeFile('../TEXT/promiseWrite.txt', data)
        await fsPromises.appendFile('../TEXT/promiseWrite.txt', '\n\nNice to meet you')
        await fsPromises.rename('../TEXT/promiseWrite.txt', '../TEXT/promiseComplete.txt')
        const newData=await fsPromises.readFile('../TEXT/promiseComplete.txt', 'utf8')
        console.log(newData)
    }catch(err)
    {
        console.error(err)
    }
}

fileOps()
// fs.readFile('../TEXT/text.txt', 'utf8', (err, data)=>{ 
//     if(err) throw err
//     console.log(data)
// })

// fs.writeFile('../TEXT/reply.txt', 'Nice to meet you',(err)=>{ 
//     if(err) throw err
//     console.log('Write Complete')
//     fs.appendFile('../TEXT/reply.txt', '\n\n Nice it is',(err)=>{ 
//         if(err) throw err
//         console.log('Append Complete')
//         fs.rename('../TEXT/reply.txt', '../TEXT/newReply.txt',(err)=>{ 
//             if(err) throw err
//             console.log('Rename Complete')
//         })
//     })
// })



//console.log("Hello...");
//exit on uncaught exception 
 process.on('uncaughtException', err =>{
         console.error(`There was an uncaught error: ${err}` )
         process.exit(1);
 })