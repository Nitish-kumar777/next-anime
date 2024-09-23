import { MongoClient } from 'mongodb';

export async function GET(req) {
  try {
    const client = new MongoClient(process.env.DB_URI);
    await client.connect();
    const db = client.db('anime-blog');
    const blogsCollection = db.collection('blogs');

    const blogs = await blogsCollection.find({}).toArray();

    client.close();

    return new Response(JSON.stringify(blogs), { status: 200 });
  } catch (error) {
    console.error('Error fetching blogs:', error); // Log the error
    return new Response(JSON.stringify({ message: 'Error fetching blogs', error: error.message }), { status: 500 });
  }
}
