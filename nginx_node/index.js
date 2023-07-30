const express = require('express')
const mysql = require('mysql')

const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}

app.get('/', async (_, res) => {
    var names = await query('SELECT name FROM people')

    res.send(`<h1>Full Cycle Rocks!</h1>
    <ul>
      ${names.map(p => `<li>${p.name}</li>`).join('')}
    </ul>
  `)
})

async function query(sql) {
    const conn = mysql.createConnection(config);
  
    const query = new Promise((resolve, reject) => {
      conn.query(sql, function (err, res) {
        if (err) reject(err);
        resolve(res)
      })
    })
  
    const result = await query;
  
    conn.end();
    return result;
}

app.listen(port, async () => {
    console.log('Rodando na porta ' + port)

    var sql = 'CREATE TABLE IF NOT EXISTS people (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(50), PRIMARY KEY (id));'
    await query(sql)

    sql = `TRUNCATE TABLE people;`
    await query(sql);

    sql = `INSERT INTO people (name) values ('Fernando'), ('Wesley'), ('Regiane'), ('Inacio'), ('Pedro');`
    await query(sql);
})