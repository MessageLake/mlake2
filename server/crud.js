const fs = require('fs');
const path = require('path');

const MESSAGES_FILE = path.resolve(__dirname, 'data/messages.json');
const FEEDS_FILE = path.resolve(__dirname, 'data/feeds.json');

const loadMessages = () => {
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
  let messages = loadMessages();
  const id = messages[messages.length - 1].id + 1;
  let newMessage = {
    id: id,
    tags: message.tags.split(','),
    text: message.text
  }
  messages.push(newMessage);
  saveMessages(messages);
  return id;
}

// Keep load methods separate because even though they are identical now,
//    reading from DB will not be
const loadFeeds = () => {
  try {
    const content = fs.readFileSync(FEEDS_FILE);
    const data = JSON.parse(content);
    return data;
  } catch(err) {
    console.error(`Error loading feeds file: ${err.message}`);
  }
}

// Get all feeds for the user (single tenant for now)
const allFeeds = () => {
  // iterate through feeds
  const feeds = loadFeeds();
  let feedsWithMessages = [];
  feeds.forEach((feed) => {
    feedsWithMessages.push({
      id: feed.id,
      tags: feed.tags,
      messages: relevantMessages(feed.tags)
    });
  });
  return feedsWithMessages;
}

// Collect messages for given tags
const relevantMessages = (tags) => {
  // get relevant messages
  const messages = loadMessages();
  return messages.filter((message) => {
    // get messages that include given tags
    for (let i = 0; i < tags.length; i++) {
      if (message.tags.includes(tags[i])) {
        return true;
      }
    }
    return false;
  });
}

// Keep save methods separate because even though they are identical now,
//    reading from DB will not be
const saveFeeds = (feeds) => {
  try {
    fs.writeFileSync(FEEDS_FILE, JSON.stringify(feeds));
  } catch(err) {
    console.error(`Error saving feeds file: ${err.message}`);
  }
}

const createFeed = (feed) => {
  let feeds = loadFeeds();  
  const id = feeds[feeds.length - 1].id + 1;
  feeds.push({
    id: id,
    tags: feed.tags.split(',')
  });
  saveFeeds(feeds);
  return id;
}

const updateFeed = (feed) => {
  let feeds = loadFeeds();
  for (let i = 0; i < feeds.length; i++) {
    if (feeds[i].id === feed.id) {
      feeds[i].tags = feed.tags;
      saveFeeds(feeds);
      return relevantMessages(feed.tags);
    }
  }
}

module.exports = {
  createMessage,
  createFeed,
  updateFeed,
  allFeeds
}