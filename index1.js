const express = require('express')
const pool = require('./db-config')
const app = express()
const port = 3000

app.use(express.json()); // body
app.use(express.urlencoded({extended: true})); //unlencoded

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/user-list',(req,res)=>{
    pool.query('SELECT * FROM student')
    .then(r => res.send(r.rows))
    .catch(e => { res.send({ error: e }); console.log(e); })
})

app.post('/add-user',(req,res)=>{
    const { firstname, lastname, age, address, email } = req.body;
    pool.query("INSERT INTO student(firstname,lastname,age,address,email) VALUES ($1,$2,$3,$4,$5)",
        [firstname, lastname, age, address, email])
        .then(r => res.send({ data: req.body, msg: 'added successfully' }))
        .catch(e => { res.send({ error: e }); console.log(e); })
})


app.get('/find-user/:id',(req,res)=>{
    const { id } = req.params;
    pool.query("SELECT * FROM student where id=$1",[id])
        .then(r => res.send({ data: r.rows }))
        .catch(e => { res.send({ error: e }); console.log(e); })
})

app.patch('/update-user/:id', (req,res) =>{
    const { id } = req.params;
    pool.query("UPDATE student SET age = 24 WHERE id = $1", [id])
        .then(r => res.send({ data:req.body}))
        .catch(e => {res.send({ error:e }); console.log(e); })
})

app.delete('/delete-user/:id',(req,res)=>{
    const{id}=req.params;
    pool.query("DELETE FROM student WHERE id = $1",[id])
        .then(r=> res.send({data:req.body}))
        .catch(e=>{res.send({error:r}); console.log(e); })
})


// DB Connectivity
pool.connect()
    .then(() => console.log("DB Connected Successfully"))
    .then(()=> {
        // Craete Tables
        pool.query('CREATE TABLE IF NOT EXISTS student(id SERIAL PRIMARY KEY, firstname  TEXT, lastname  TEXT, age TEXT, address TEXT, email TEXT)')
        .then(()=> console.log("Tables Generated"))
        .catch((e)=> console.log("Error",e))
    })
    .catch((e) => console.log(e));



app.listen(port, () => console.log(`Example app listening on port ${port}`))