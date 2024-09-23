import { MongoClient } from 'mongodb';

export async function POST(req) {
  try {
    const { image, description, instagramLink } = await req.json();

    const client = new MongoClient(process.env.DB_URI);
    await client.connect();
    const db = client.db('anime-blog');
    const blogsCollection = db.collection('blogs');

    await blogsCollection.insertOne({
      image,
      description,
      instagramLink,
      createdAt: new Date(),
    });

    client.close();

    return new Response(JSON.stringify({ message: 'Blog uploaded successfully!' }), { status: 200 });
  } catch (error) {
    console.error('Error uploading blog:', error);  // Log the error
    return new Response(JSON.stringify({ message: 'Error uploading blog', error: error.message }), { status: 500 });
  }
}