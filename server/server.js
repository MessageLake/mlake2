const express = require('express');
const app = express();
const PORT = 3000;

const { saveMessage, createFeed, updateFeed, loadFeeds, relevantMessages } = require('./crud.js');

app.use(express.static('public'));
app.use(express.json({ urlencoded: true }));

// Get all feeds without messages
app.get('/feeds', async (_req, res) => {
  try {
    const feeds = await loadFeeds();
    res.send(feeds);
  } catch (err) {
    console.error(`Error returning feeds: ${err.message}`)
    res.sendStatus(500);
  }
});

// Get messages for a feed
app.get('/feed/messages', async (req, res) => {
  try {
    const tags = JSON.parse(req.query.tags);
    const messages = await relevantMessages(tags);
    res.send({ messages });
  } catch (err) {
    console.error(`Error returning messages for tags=${JSON.stringify(tags)} : ${err.message}`);
    res.sendStatus(500);
  }
});

// Write to input "buffer" file
app.post('/message', async (req, res) => {
  try {
    const message = req.body;
    const exit = await saveMessage(message);
    console.log(`Saved message: ${exit}`);
    res.sendStatus(200);
  } catch(err) {
    console.error(`Error saving message: ${err.message}`)
    res.sendStatus(500);
  }
});

app.post('/feed', async (req, res) => {
  try {
    const feed = req.body;
    const id = await createFeed(feed);
    console.log(`Saved feed with id: ${id}`);
    res.sendStatus(200);
  } catch(err) {
    console.error(`Error saving feed: ${err.message}`)
    res.sendStatus(500);
  }
});

app.put('/feed', async (req, res) => {
  try {
    const feed = req.body;
    const id = feed.id;
    const messages = await updateFeed(feed);
    if (messages) {
      res.send({ messages });
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
