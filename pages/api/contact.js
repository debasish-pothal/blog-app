import { MongoClient } from 'mongodb';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { email, name, message } = JSON.parse(req.body);

    const newMessage = {
      email,
      name,
      message
    };

    const client = await MongoClient.connect('mongodb+srv://user001:pass001@cluster0.rcggr.mongodb.net/my-blog?retryWrites=true&w=majority');
    const db = client.db();
    db.collection('messages').insertOne(newMessage);

    client.close();

    res.status(201).json({ message: 'Success!' });
  }
}
