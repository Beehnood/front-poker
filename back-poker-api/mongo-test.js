const { MongoClient } = require('mongodb');
require('dotenv').config();

async function main() {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("✅ Connexion réussie à MongoDB Atlas");

    const db = client.db("poker"); // adapte le nom si nécessaire
    const users = db.collection("users");

    // Insertion d'un utilisateur test
    const newUser = {
      username: "testuser",
      email: "test@poker.com",
      balance: 1000,
      createdAt: new Date()
    };

    const result = await users.insertOne(newUser);
    console.log("🆕 Utilisateur inséré :", result.insertedId);

    // Vérifie qu'il a bien été inséré
    const allUsers = await users.find().toArray();
    console.log("👥 Utilisateurs :", allUsers);
  } catch (err) {
    console.error("❌ Erreur :", err);
  } finally {
    await client.close();
  }
}

main();
