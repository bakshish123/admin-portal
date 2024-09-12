import mongoose from "mongoose";

export default async function connectToDB() {
    if (mongoose.connections[0].readyState) {
        console.log('Already connected');
        return;
    }

    const connectionURL = 'mongodb+srv://bakshish10621:Dt8kKA7hrd1REI77@cluster0.fecizke.mongodb.net/databaseName?retryWrites=true&w=majority';

    try {
        await mongoose.connect(connectionURL, {
        });
        console.log('Database connected');
    } catch (error) {
        console.error('Database connection error:', error);
    }
}
