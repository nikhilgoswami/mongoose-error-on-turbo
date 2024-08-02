// /src/app/lib/db.ts

import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URI: string | undefined = process.env.MONGODB_URI;



interface MongooseCache {
    conn: Mongoose | null;
    connReady?: number;
    promise: Promise<Mongoose> | null;
}

let cached: MongooseCache = (global as any).mongoose;

if (!cached) {
    cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect(): Promise<Mongoose> {
    if (!MONGODB_URI) {
        throw new Error(
            'Please define the MONGODB_URI environment variable inside .env.local',
        );
    }
    if (cached.connReady && cached.conn) {
        console.log("Already connected");
        return cached.conn;
    }
    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };
        cached.promise = mongoose.connect(MONGODB_URI).then(mongoose => {
            console.log('Connected to mongo db database');
            return mongoose;
        });
    }
    try {
        cached.conn = await cached.promise;
        cached.connReady = mongoose.connection.readyState
        console.log("readyState:", mongoose.connection.readyState)
    } catch (e) {
        console.log('Cannot connect to mongo db database');
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}

export default dbConnect;
