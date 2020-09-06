const fs = require('fs');
const path = require('path');

const MESSAGES_FILE = path.resolve(__dirname, 'messages.json');

const loadMessagesFile = () => {
  try {
    const content = fs.readFileSync(MESSAGES_FILE);
    const data = JSON.parse(content); 
    return data;
  } catch(err) {
    console.error(`Error loading messages file: ${err.message}`);
  }
}

const saveMessages = (messages) => {
  try {
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages));
  } catch(err) {
    console.error(`Error saving messages file: ${err.message}`);
  }
}

const createMessage = (message) => {
  let messages = loadMessagesFile();
  const id = messages[messages.length - 1].id + 1;
  let newMessage = {
    id: id,
    tags: message.tags,
    text: message.text
  }
  messages.push(newMessage);
  saveMessages(messages);
  return id;
}

module.exports = {
  createMessage
}