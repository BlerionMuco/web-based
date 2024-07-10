const express = require('express');
const Beer = require('./beer');
const fileHelper = require('./utils/fileHelper');

const app = express();
app.use(express.json());

let beers = fileHelper.readFromFile() || [];

app.post('/api/beers', (req, res) => {
  const { name, type } = req.body;
  const beer = new Beer(name, type);
  beers.push(beer);
  fileHelper.writeToFile(beers);
  res.status(201).json(beer);
});

app.get('/api/beers', (req, res) => {
  const { name } = req.query;
  const result = name
    ? beers.filter((b) => b.name.toLowerCase().includes(name.toLowerCase()))
    : beers;
  res.json(result);
});

app.get('/api/beers/:id', (req, res) => {
  const beer = beers.find((b) => b.id == req.params.id);
  if (!beer) {
    return res.status(404).send('Beer not found');
  }
  res.json(beer);
});

app.put('/api/beers/:id/rate', (req, res) => {
  const beer = beers.find((b) => b.id == req.params.id);
  if (!beer) {
    return res.status(404).send('Beer not found');
  }
  const { rating } = req.body;
  beer.ratings.push(rating);
  fileHelper.writeToFile(beers);
  res.status(204).send('Beer updated successfully');
});

app.delete('/api/beers/:id', (req, res) => {
  const beerIndex = beers.findIndex((b) => b.id == req.params.id);
  if (beerIndex === -1) {
    return res.status(404).send('Beer not found');
  }
  beers.splice(beerIndex, 1);
  fileHelper.writeToFile(beers);
  res.status(201).send('Beer deleted successfully');
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
