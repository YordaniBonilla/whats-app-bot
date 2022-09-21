const { Client, LocalAuth, MessageMedia} = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const SESSION_FILE_PATH = './session.json';
const fs = require('fs');
// Load the session data if it has been previously saved
let sessionData;
if(fs.existsSync(SESSION_FILE_PATH)) {
    sessionData = require(SESSION_FILE_PATH);
}

const client = new Client({
    authStrategy: new LocalAuth()
});
 
client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    qrcode.generate(qr, {small: true});
});


 

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message',async msg => {
    
     const chat = await msg.getChat()
     const time = new Date()
     const hour = time.getHours()
     
     if( hour >= 22 || hour <= 7 && !chat.isGroup) {
         const media =  await MessageMedia.fromFilePath('./Sleeping Cat.jpg')
          await client.sendMessage(msg.from, media, 'image/jpg')
          client.sendMessage(msg.from, '\n' + 'Tiempo de dormir 10pm - 7am')
          client.sendMessage(msg.from, '\n' + 'Emergencias : 55-8438-5926')
        
        
     }
    
});

client.initialize();





