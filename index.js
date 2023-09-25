const express = require('express')
const path = require('path')
const pg = require('pg')
const pgp = require('pg-promise')()
pgp.pg.defaults.poolSize = 20
const db = pgp(process.env.DATABASE_URL)
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/redir', (req, res) => res.render('pages/redir'))
  .get('/cabflotante', function (request, response) {
    db.any('SELECT * FROM servicios_table WHERE id_servicio=0')
    .then(data => {
      response.render('pages/cabflotante', { results: data })
    })
    .catch(err => {
      console.error(err); response.send("Error " + err)
    })
  })
  .get('/habdoble', function (request, response) {
    db.any('SELECT * FROM servicios_table WHERE id_servicio=1')
    .then(data => {
      response.render('pages/habdoble', { results: data })
    })
    .catch(err => {
      console.error(err); response.send("Error " + err)
    })
  })
  .get('/habsimple', function (request, response) {
    db.any('SELECT * FROM servicios_table WHERE id_servicio=2')
    .then(data => {
      response.render('pages/habsimple', { results: data })
    })
    .catch(err => {
      console.error(err); response.send("Error " + err)
    })
  })
  .get('/playa', function (request, response) {
    db.any('SELECT * FROM servicios_table WHERE id_servicio=3')
    .then(data => {
      response.render('pages/playa', { results: data })
    })
    .catch(err => {
      console.error(err); response.send("Error " + err)
    })
  })
  .get('/admin', function (request, response) {
    db.multi('SELECT * FROM administrador_table; SELECT * FROM cliente_table; SELECT * FROM servicios_table;')
      .then(data => {
        // data[0] = result from the first query
        // data[1] = result from the second query
        // ...
        response.render('pages/admin', {
          resultsAdmin: data[0],
          resultsClientes: data[1],
          resultsServicios: data[2]
        })
      })
      .catch(err => {
        console.error(err); response.send("Error " + err)
      })
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`))