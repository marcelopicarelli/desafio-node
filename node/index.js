const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb',
    insecureAuth : true
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

const sql_insert = `INSERT INTO people(name) values('Marcelo')`
const sql_select = `select name from people`
connection.query(sql_insert)

app.get('/', (req, res) => {
    const sql = 'SELECT * FROM people';
    connection.query(sql, (error, results) => {
    if (error) throw error;
    const names = results.map(result => result.name);
    const html = `<h1>Full Cycle Rocks!</h1><p>Lista de nomes cadastrados:</p><ul>${names.map(name => `<li>${name}</li>`).join('')}</ul>`;
    res.send(html)
    connection.end();
    });
});


app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})