import mongoose from 'mongoose'

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose
  .connect(process.env.MONGO_URI, {  
    //useNewUrlParser: true
    //useUnifiedTopology: true
  })
  .then(() => {
    console.log(`database connection on ${process.env.MONGO_URI}`); 
    // dropIndex('filepath_1');
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error)
  });

export default mongoose; 