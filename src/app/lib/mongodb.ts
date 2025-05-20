// import mongoose from 'mongoose';
//
// const MONGODB_URI = process.env.MONGODB_URI as string;
//
// if (!MONGODB_URI) {
//     throw new Error('MONGODB_URI is not defined in .env.local');
// }
//
// interface MongooseCache {
//     conn: typeof mongoose | null;
//     promise: Promise<typeof mongoose> | null;
// }
//
// // ESLint exception for global type declaration
// // eslint-disable-next-line no-var
// declare global {
//     var mongoose: MongooseCache;
// }
//
// let cached = global.mongoose;
//
// if (!cached) {
//     cached = global.mongoose = { conn: null, promise: null };
// }
//
// export async function connectDB() {
//     if (cached.conn) return cached.conn;
//
//     if (!cached.promise) {
//         cached.promise = mongoose.connect(MONGODB_URI).then(mongoose => {
//             console.log('MongoDB Connected');
//             return mongoose;
//         });
//     }
//
//     cached.conn = await cached.promise;
//     return cached.conn;
// }

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;
mongoose.connect(MONGODB_URI);
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB connection established successfully");
});