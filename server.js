const express = require('express');
const app = express();

const DataBaseQR = require('./Models/DataBase');

const cors = require('cors');

const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

const connectionString = 'mongodb+srv://msjoao:joao25081997@joao.j7wmqw7.mongodb.net/BD?retryWrites=true&w=majority'

mongoose.connect(connectionString)
  .then(() => {
    app.emit('pronto');
  });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors()); 

app.post('/generate', async (req, res) => {
  const { name, linkedin, github } = req.body;
  const user = new DataBaseQR(req.body);

  await user.registerInformation();

  const cadastrados = await user.findEspecificUser();

  res.json({
    user: cadastrados,
  })

});

app.get('/user/id', async (req, res) => {
  const { _id } = req.body;
  const user = new DataBaseQR(req.body);

  console.log(_id);

  const locatedById = await user.findUserById(_id);

  res.json({
    locatedUserId: locatedById
  });
});

app.on('pronto', () => {
    app.listen(3001, () => {
      console.log('Servidor iniciado http://172.20.3.200:3001');
    });
  });

