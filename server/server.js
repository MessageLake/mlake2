const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const PORT = 3000;

const { createMessage, createFeed, updateFeed, allFeeds } = require('./crud.js');

app.use(express.static('public'));
app.use(express.json({ urlencoded: true }));

app.get('/feeds', (_req, res) => {
  try {
    const feeds = allFeeds();
    res.send(feeds);
  } catch (err) {
    console.error(`Error returning feeds: ${err.message}`)
    res.sendStatus(500);
  }
});

// just store in documents for now
app.post('/message', (req, res) => {
  try {
    const message = req.body;
    const id = createMessage(message);
    console.log(`Saved messages with id: ${id}`);
    res.sendStatus(200);
  } catch(err) {
    console.error(`Error saving message: ${err.message}`)
    res.sendStatus(500);
  }
});

app.post('/feed', (req, res) => {
  try {
    const feed = req.body;
    const id = createFeed(feed);
    console.log(`Saved feed with id: ${id}`);
    res.sendStatus(200);
  } catch(err) {
    console.error(`Error saving feed: ${err.message}`)
    res.sendStatus(500);
  }
});

app.put('/feed', (req, res) => {
  try {
    const feed = req.body;
    const id = feed.id;
    const messages = updateFeed(feed);
    if (messages) {
      res.send(JSON.stringify({ messages }));
    } else {
      res.send(`No feed found for id=${id}`);
    }
  } catch(err) {
    console.error(`Error editing feed: ${err.message}`);
    res.sendStatus(500);
  }
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
