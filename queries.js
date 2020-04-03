import { Client } from 'pg';

const pgPort = 5432;

const client = new Client({
  user: 'api',
  host: 'localhost',
  database: 'items',
  password: 'password',
  port: pgPort,
});

client.connect().then(() => {
  console.log('DB connection opened');
  client.query('DELETE FROM items WHERE item_name IS NULL');
});

export const getItems = (request, response) => {
  client.query('SELECT * FROM items', (error, results) => {
    if (error) {
      console.log(error);
      response.status(404).json({ Response: 'Failure' });
    } else {
      response.status(200).json(results.rows);
      console.log('responded with: ', results.rows);
    }
  });
};

export const getItemByName = (request, response) => {
  const { name } = request.params;

  client.query(
    'SELECT * FROM items WHERE item_name = $1',
    [name],
    (error, results) => {
      if (error) {
        console.log(error);
        response.status(404).json({ Response: 'Failure' });
      } else {
        response.status(200).json(results.rows);
        console.log('responded with: ', results.rows);
      }
    }
  );
};

export const createItem = (request, response) => {
  const { name, description, size, cost } = request.body;

  client.query(
    'INSERT INTO items (item_name, item_description, item_size, item_cost) VALUES ($1, $2, $3, $4)',
    [name, description, JSON.parse(size), cost],
    (error) => {
      if (error) {
        console.log(error);
        response.status(404).json({ Response: 'Failure' });
      } else {
        response.status(200).json({ Response: 'Success!' });
      }
    }
  );
};

export const deleteItem = (request, response) => {
  const { name } = request.params;

  client.query('DELETE FROM items WHERE item_name = $1', [name], (error) => {
    if (error) {
      console.log(error);
      response.status(404).json({ Response: 'Failure' });
    } else {
      response.status(200).json({ Response: 'Success!' });
    }
  });
};

export const editItem = (request, response) => {
  const { name } = request.params;
  const { description, size, cost } = request.body;
  const newName = request.body.name;

  client.query(
    'UPDATE items SET item_name = $1, item_description = $2, item_size = $3, item_cost = $4 WHERE item_name = $5',
    [newName, description, JSON.parse(size), cost, name],
    (error) => {
      if (error) {
        console.log(error);
        response.status(404).json({ Response: 'Failure' });
      } else {
        response.status(200).json({ Response: 'Success!' });
      }
    }
  );
};
