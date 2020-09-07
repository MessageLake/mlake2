const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const PORT = 3000;

const { createMessage, allFeeds } = require('./crud.js');

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
    console.log(req.body);
    const message = req.body;
    const id = createMessage(message);
    console.log(`Saved messages with id: ${id}`);
    res.sendStatus(200);
  } catch(err) {
    console.error(`Error saving message: ${err.message}`)
    res.sendStatus(500);
  }
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
