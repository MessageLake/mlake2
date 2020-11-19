// CRUD messages and feeds
const path = require('path');
const fs = require('fs').promises;

// File paths
const MESSAGES_FILE = path.resolve(__dirname, 'data/input_buffer');
const SAMPLE_MESSAGES = path.resolve(__dirname, 'data/messages.json');
const FEEDS_FILE = path.resolve(__dirname, 'data/feeds.json');

const formatMessage = (input) => {
  return `${JSON.stringify(input)}\n`;
}

async function saveMessage(input) {
  const message = formatMessage(input);
  console.log(`Saving ${message}`)
  try {
    await fs.appendFile(MESSAGES_FILE, message);
    return true;
  } catch(err) {
    return false;
  }
}

async function loadMessages() {
  try {
    const content = await fs.readFile(SAMPLE_MESSAGES);
    const data = JSON.parse(content); 
    return data;
  } catch(err) {
    console.error(`Error loading messages file: ${err.message}`);
  }
}

// Keep save methods separate because even though they are identical now,
//  reading from DB will not be
async function saveFeeds (feeds) {
  try {
    await fs.writeFile(FEEDS_FILE, JSON.stringify(feeds));
  } catch(err) {
    console.error(`Error saving feeds file: ${err.message}`);
  }
}

// Keep load methods separate because even though they are identical now,
async function loadFeeds() {
  try {
    const data = await fs.readFile(FEEDS_FILE);
    const feeds = JSON.parse(data);
    return feeds;
  } catch(err) {
    console.error(`Error loading feeds file: ${err.message}`);
  }
}

// Collect messages for given tags
async function relevantMessages(tags) {
  // get relevant messages
  const messages = await loadMessages();
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

async function createFeed(feed) {
  let feeds = await loadFeeds();  
  const id = feeds[feeds.length - 1].id + 1;
  feeds.push({
    id: id,
    tags: feed.tags.split(',')
  });
  await saveFeeds(feeds);
  return id;
}

async function updateFeed(feed) {
  let feeds = await loadFeeds();
  for (let i = 0; i < feeds.length; i++) {
    if (feeds[i].id === feed.id) {
      feeds[i].tags = feed.tags;
      await saveFeeds(feeds);
      return await relevantMessages(feed.tags);
    }
  }
}

module.exports = {
  saveMessage,
  createFeed,
  updateFeed,
  loadFeeds,
  relevantMessages
}