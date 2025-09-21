    const app = require('./app'); 
    const mongoose = require('mongoose');
    const dotenv = require('dotenv');

    dotenv.config(); // Load environment variables
   
    const PORT = process.env.PORT || 4000; 

    // Connect to DB and start server
    mongoose.connect(process.env.MONGO_URI)
      .then(() => {
        console.log('✅MongoDB Connected successfully!');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
      })
      .catch(err => {
        console.error('❌MongoDB connection error:', err);
        process.exit(1); 
      });
    