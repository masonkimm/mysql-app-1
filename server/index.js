const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

PORT = 3001;

app.use(cors());
app.use(express.json());
//db

const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: 'password',
  database: 'employeeDB',
});

app.post('/create', (req, res) => {
  console.log(req.body);
  const name = req.body.name;
  const age = req.body.age;
  const country = req.body.country;
  const position = req.body.position;
  const salary = req.body.salary;

  db.query(
    'INSERT INTO employees (name, age, country, position, salary) VALUES (?, ? , ? ,? ,?)',
    [name, age, country, position, salary],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send('Values inserted');
      }
    }
  );
});

app.get('/employees', (req, res) => {
  db.query(' SELECT * FROM employees', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server Live on PORT: ${PORT}`);
});
