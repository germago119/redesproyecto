import {MongoClient} from 'mongodb';
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
        return collection.find({}).toArray()
    }

    async logInUser(user, pass) {
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
        if (findResult.length === 0) {
            return findResult
        } else {
            return {
                "NombreUsuario": findResult[0].NombreUsuario,
                "usuario": findResult[0].usuario,
                "TipoUsuario": findResult[0].TipoUsuario
            }
        }
    }

    // Insertar nuevo documento
    async insertData(URL, Album, Artista, NombreCancion, Letra, Status) {
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
        return {
            "Letra": findResult[0].Letra,
        };
    }

    async getUnaCancion(_id) {
        const db = this.client.db(this.dbName);
        const collection = db.collection('Canciones');
        const myObj =
            {
                "_id": new mongoose.Types.ObjectId(_id)
            }
        return collection.find(myObj).toArray();
    }

    async updateEditedSong(_id, URL, Album, Artista, NombreCancion, Letra) {
        const db = this.client.db(this.dbName);
        const collection = db.collection('Canciones');
        const myobj = {
            $set: {
                "URL": URL,
                "Album": Album,
                "Artista": Artista,
                "NombreCancion": NombreCancion,
                "Letra": Letra,
                "Status": "Active"
            }
        };
        await collection.updateOne({"_id": mongoose.Types.ObjectId(_id)}, myobj);
    }

    async getSongsByFilter(dato, filtro) {
        const db = this.client.db(this.dbName);
        const collection = db.collection('Canciones');
        let myObj;
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
                    "Letra": {$regex: dato}
                }
                break;
        }

        let findResult;
        findResult = await collection.find(myObj).toArray();

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

    async closeConnection() {
        await this.client.close();
    }
}

