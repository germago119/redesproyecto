import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';

export class Database {
    
    constructor() {
      this.url = 'mongodb+srv://vicarhz:Hola1.@cluster0.wlbav.mongodb.net/KaraokeDB?retryWrites=true&w=majority';
      this.client = new MongoClient(this.url);
      this.dbName = 'KaraokeDB';
    }

    async connectDB() {
        await this.client.connect();
        console.log('Connected successfully to Database Server');
    }

    async getDbData() {
        const db = this.client.db(this.dbName);
        const collection = db.collection('Canciones');        
        const findResult = await collection.find({}).toArray();
        //console.log('Found documents =>', findResult);
        return findResult
    }
    
    async logInUser(user, pass){
      const db = this.client.db(this.dbName);
      const collection = db.collection('Users'); 
      const findResult = await collection.find(
        {
          $and:
            [
              {"usuario": user},
              {"Password": pass}
            ]
        }).toArray();
        //console.log(findResult.length)
        if(findResult.length == 0){
          return findResult
        }
        else{
          const out = {
            "NombreUsuario": findResult[0].NombreUsuario,
            "usuario": findResult[0].usuario,
            "TipoUsuario": findResult[0].TipoUsuario
          };
        
        return out
        }
    }

    // Insertar nuevo documento
    async insertData(URL,Album,Artista,NombreCancion,Letra,Status) {
      const db = this.client.db(this.dbName);
      const collection = db.collection('Canciones'); 
      const myobj = { 
        "URL": URL,
        "Album": Album,
        "Artista": Artista,
        "NombreCancion": NombreCancion,
        "Letra": Letra,
        "Status": Status
      };    
      await collection.insertOne(myobj);            
    }

    async getLetra(URL) {
      const db = this.client.db(this.dbName);
      const collection = db.collection('Canciones'); 
      const findResult = await collection.find(
        {
          $and:
            [
              {"URL": URL}
            ]
        }).toArray();
      const out = {
        "Letra": findResult[0].Letra,       
      };
      return out;
    }

    async getUnaCancion(_id) {
      const db = this.client.db(this.dbName);
      const collection = db.collection('Canciones'); 
      const myObj = 
      {
        "_id": new mongoose.Types.ObjectId(_id)
      }    
      const findResult = await collection.find(myObj).toArray();          
      return findResult;
    }

    async updateEditedSong(_id,URL,Album,Artista,NombreCancion,Letra) {
      const db = this.client.db(this.dbName);
      const collection = db.collection('Canciones'); 
      const valor =  true;
      var myobj = { $set:{ 
        "URL": URL,
        "Album": Album,
        "Artista": Artista,
        "NombreCancion": NombreCancion,
        "Letra": Letra,
        "Status": "Active"    
      }};    
      await collection.updateOne({"_id":mongoose.Types.ObjectId(_id)},myobj);            
    }

    async getSongsByFilter(dato,filtro) {
      const db = this.client.db(this.dbName);
      const collection = db.collection('Canciones'); 
      let myObj;
      let busquedaPorLetra = false;
      switch (filtro) {
        case "NombreCancion":
          myObj = {
            "NombreCancion": dato
          }   
          break;
        case "Artista":
          myObj = {
            "Artista": dato
          } 
          break;
        case "Album":
          myObj = {
            "Album": dato
          } 
          break;
        default: //Case Fragmento de la Letra
          myObj = {
            "Letra" : {$regex: dato }
          } 
          busquedaPorLetra = true;
          break;
      }

      let findResult;
      if (busquedaPorLetra){
        //console.log(myObj);
        findResult = await collection.find(myObj).toArray();          
      }
      else{
        findResult = await collection.find(myObj).toArray();          
      } 
      return findResult;
    }
    
    async deleteSongsById(_id) {
      const db = this.client.db(this.dbName);
      const collection = db.collection('Canciones'); 
      const myObj = 
      {
        "_id": new mongoose.Types.ObjectId(_id)
      }    
      await collection.deleteOne(myObj);      
    }    
    //db.Canciones.deleteOne({_id:ObjectId("616a038723a72bc3e9bf7c87")})

    async closeConnection() {
      this.client.close();
    }
  }

