const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.get('/feeds', (_req, res) => {
  try {
    res.send(fs.readFileSync(path.resolve(__dirname, 'sampleFeeds.json')));
  } catch (err) {
    console.error(`Error returning feeds: ${err.message}`)
  }
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
