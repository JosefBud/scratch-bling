import express from 'express';
import bodyParser from 'body-parser';
import {
  getItems,
  getItemByName,
  createItem,
  deleteItem,
  editItem,
} from './queries';

const app = express();
const serverPort = 80;

app.use(bodyParser());

app.get('/items', getItems);
app.get('/items/:name', getItemByName);
app.post('/items', createItem);
app.delete('/items/:name', deleteItem);
app.put('/items/:name', editItem);

app.listen(serverPort, () => {
  console.log(`Scratch Bling API server running on port ${serverPort}.`);
});
