import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
//import { getAll } from './functions.js';
import { Database } from './Database.js';

const app = express()
const port = 3001

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = new Database();
await db.connectDB();

// ----------------------------------------------------------------------------------------
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}\n`)
})
// ----------------------------------------------------------------------------------------

app.get('/music', async(req, res) => {    
  const jsonResponse = await db.getDbData();  
  res.send(jsonResponse);
})

app.post('/login', async(req, res) => { 
  const { username,password } = req.body;
  const resultado = await db.logInUser(username,password);
  res.send(resultado); 
})

// Para agregar una nueva cancion
app.post('/newSong', async(req, res) => { 
  const { URL,Album,Artista,NombreCancion,Letra,Status } = req.body;
  await db.insertData(URL,Album,Artista,NombreCancion,Letra,Status);
  res.send(JSON.stringify("{Agregado: CORRECTO}")); 
})

app.post('/letra', async(req, res) => { 
  const { URL } = req.body;
  const letra_response = await db.getLetra(URL);
  res.send(letra_response); 
})

app.post('/unaCancion', async(req, res) => { 
  const { _id } = req.body;
  const cancion_response = await db.getUnaCancion(_id);
  res.send(cancion_response); 
})

app.post('/saveEditedSong', async(req, res) => { 
  const { _id,URL,Album,Artista,NombreCancion,Letra } = req.body;
  await db.updateEditedSong(_id,URL,Album,Artista,NombreCancion,Letra);
  res.send(JSON.stringify("{Agregado: CORRECTO}")); 
})

app.post('/filtrado', async(req, res) => { 
  const { dato, filtro } = req.body;
  const data_response = await db.getSongsByFilter(dato,filtro);
  res.send(data_response); 
})

app.delete('/borrar', async(req, res) => { 
  const { _id } = req.body;
  await db.deleteSongsById(_id);
  res.send(JSON.stringify("{Eliminado: CORRECTO}")); 
})
