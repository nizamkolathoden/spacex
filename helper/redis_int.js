const {createClient} = require('redis');

const client = createClient({
    url: 'redis://:@redis:6379'    

})


const strat =async()=>{
    await client.connect();
}
strat()
client.on('connect',()=>{
    console.log('Client connected to Redis')
})

client.on('ready',()=>{

    console.log('client connected to redis and ready to use...');
})

client.on('error',(err)=>{
    console.log(err.message)
})

client.on('end',()=>{
    console.log('client ended the connection');
})

process.on('SIGINT',()=>{
    client.quit()
})

module.exports = client