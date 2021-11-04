db.TestTable.insertMany([
	{URL: "https://CloudStorage/fakePath/victor.mp3", Letra: "Las letras1", Status: "Active"},
	{URL: "https://CloudStorage/fakePath/rodrigo.mp3", Letra: "Las letras2", Status: "Active"},
	{URL: "https://CloudStorage/fakePath/residentEvil.mp3", Letra: "Las letras3", Status: "Inactive"},
	{URL: "https://CloudStorage/fakePath/fabricio.mp3", Letra: "Las letras4", Status: "Active"}
	]);

db.TestTable.insertOne({
	URL: "https://storage.googleapis.com/bucket_songs_karaoke/KennyHoopla-Estella.mp3",
	Album: "Ella es",
	Artista: "Kenny Hoopla",
	NombreCancion: "Estella",
	Letra: "Estella, Estella, a coming to life Melting in my heart, getting high off"+
	"your own supply I understand we are only friends But your eyes keep telling"+
	"me to take you in Oh, when you call, I get the faith Oh, in your room Why don't we take a chance"+
	"Saw on your lips, then we come alive"+
	"I'm knockin' on every piece of wood"+
	"I don't wanna fake it 'til I make it"+
	"I don't need to see it to believe it"+
	"I don't need to touch it, I can taste it"+
	"All the shame feels the same when the pain hits"+
	"I just died, at the thought of being alive"+
	"At the same time as you, ooh, ooh"+
	"Estella (Estella), I'm jealous (Jealous), no indecision (Indecision)"+
	"This time (This time), I want it all (I want it all)"+
	"I love you too much, I hate myself (I hate myself)"+
	"Enough, for the both of us"+
	"Unstow your arms, this war's a waste"+
	"Maybe shoot your arrow this way"+
	"My scars of love, I'll honor great"+
	"Some live, some die but we will stay"+
	"(I don't wanna have, I don't wanna have, I don't wanna have"+
	"I don't wanna have, I don't wanna have, I don't wanna have"+
	"I don't wanna have, I don't wanna have, I don't wanna have)"+
	"I don't wanna fake it 'til I make it"+
	"I don't need to see it to believe it"+
	"I don't need to touch it, I can taste it"+
	"All the shame feels the same when the pain hits"+
	"I just died, at the thought of being alive"+
	"At the same time as you, ooh, ooh ",
	Status: "Active"
});

db.TestTable.update({"Nombre" : "Estella"},{$set : {
		"Letra": "Estella, Estella, a coming to life Melting in my heart, getting high off"+
		"your own supply I understand we are only friends But your eyes keep telling"+
		"me to take you in Oh, when you call, I get the faith Oh, in your room Why don't we take a chance"+
		"Saw on your lips, then we come alive"+
		"I'm knockin' on every piece of wood"+
		"I don't wanna fake it 'til I make it"+
		"I don't need to see it to believe it"+
		"I don't need to touch it, I can taste it"+
		"All the shame feels the same when the pain hits"+
		"I just died, at the thought of being alive"+
		"At the same time as you, ooh, ooh"+
		"Estella (Estella), I'm jealous (Jealous), no indecision (Indecision)"+
		"This time (This time), I want it all (I want it all)"+
		"I love you too much, I hate myself (I hate myself)"+
		"Enough, for the both of us"+
		"Unstow your arms, this war's a waste"+
		"Maybe shoot your arrow this way"+
		"My scars of love, I'll honor great"+
		"Some live, some die but we will stay"+
		"(I don't wanna have, I don't wanna have, I don't wanna have"+
		"I don't wanna have, I don't wanna have, I don't wanna have"+
		"I don't wanna have, I don't wanna have, I don't wanna have)"+
		"I don't wanna fake it 'til I make it"+
		"I don't need to see it to believe it"+
		"I don't need to touch it, I can taste it"+
		"All the shame feels the same when the pain hits"+
		"I just died, at the thought of being alive"+
		"At the same time as you, ooh, ooh "}
	} );

db.TestTable.insert({"Nombre":"Estella"});

db.TestTable.deleteOne({"_id" :ObjectId("6162272348e916aa85462be6")},
                       { "acknowledged" : true, "deletedCount" : 1 })

db.Users.insertMany([
	{NombreUsuario: "Rodrigo Granados Elizondo",usuario: "rod",Password: "rodg", TipoUsuario: "premium"},
	{NombreUsuario: "Victor Araya Hernandez",usuario: "vic",Password: "vica", TipoUsuario: "premium"},
	{NombreUsuario: "Fabricio Castillo",usuario: "fab",Password: "fabc", TipoUsuario: "premium"},
	{NombreUsuario: "Alberto Marquez",usuario: "alb",Password: "albm", TipoUsuario: "normal"}
	]);			

// Borrar todos los documentos de una colección
db.Users.deleteMany({})

//Para determinar si el usuario existe o no en el sistema
db.Users.find({}).count()

db.Users.find({
	$and:
		[
			{"usuario": "vic"},
			{"Password": "vica"}
		]
},{_id:0,NombreUsuario:1,usuario:1,TipoUsuario:1});

//Renombrar coleccion
db.TestTable.renameCollection("Canciones")
   
// Busqueda por fragmento de la letra
db.TestTable.find({Letra:/grow/});
db.Canciones.find({Letra : {$regex: "huele" }})

//Para un update
db.Canciones.update({
    _id: ObjectId("51e64cd2403754f2073712da")
},
{
    nombre: "HDD Maxtor",
    cantidad: 30,
    precio: 65.5,
    tipo: "HDD"
})