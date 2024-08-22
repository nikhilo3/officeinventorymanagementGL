import mongoose from "mongoose";

const dbconnect = async () => {

    const dburl = process.env.DBURL;

    try {
        await mongoose.connect(dburl);

        console.log('database connected successfully');
        
    } catch (error) {
        console.log('database not connected', error);
    }
}

export { dbconnect };