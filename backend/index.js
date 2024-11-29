const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Configura conexión a MySQL
const db = mysql.createConnection({
  host: 'database',
  user: 'root',
  password: 'root',
  database: 'todoapp'
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

// Middleware
app.use(bodyParser.json());

// Rutas
app.get('/tasks', (req, res) => {
  db.query('SELECT * FROM tasks', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/tasks', (req, res) => {
  const task = { description: req.body.description };
  db.query('INSERT INTO tasks SET ?', task, (err) => {
    if (err) throw err;
    res.status(201).send('Task added');
  });
});

// Inicia servidor
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
