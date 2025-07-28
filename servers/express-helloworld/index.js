const start = process.hrtime();
const express = require('express');
const expressVersion = require('express/package.json').version;

const app = express();
app.get(expressVersion.startsWith('4.') ? '*' : '*path', (req, res) => {
  res.status(200).json({
    hello: 'world!',
    url: req.url,
    headers: req.headers,
    query: req.query
  });
});
app.use((req, res) => {
  console.log('404:', req.url.toString());
  res.status(404).json({
    what: 'world?',
    url: req.url,
    headers: req.headers,
    query: req.query
  });
});
app.use((err, req, res) => {
  console.log(err);
  console.log('500:', req.url.toString());
  res.status(500).json({
    goodbye: 'cruel world!',
    url: req.url,
    headers: req.headers,
    query: req.query
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`startup: ${process.hrtime(start)}`);
});
