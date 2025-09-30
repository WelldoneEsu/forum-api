const express = require('express');
const dotenv = require('dotenv');
const app = express();
// Load environment variables as early as possible
dotenv.config();
// DB connection
const connectDB = require('./config/db');
connectDB();
const helmet = require('helmet');
const cors = require('cors'); 
const authRoutes = require('./routes/authRoutes');
const threadRoutes = require('./routes/threadRoutes');
const commentRoutes = require('./routes/commentRoutes');
const adminRoutes = require('./routes/adminRoutes');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql/schema');
const rootValue = require('./graphql/resolvers');
// Error handler
const errorHandler = require('./middleware/errorHandler');

// Apply security middleware
app.use(helmet());
app.use(cors()); 

app.get('/', (req, res) => {
    res.status(200).json({ message: 'API is running sucessfully'})
});


// A simple health check route to confirm the API is live
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: "OK" });
});

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/threads', threadRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/admin', adminRoutes);

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue,
  graphiql: true,
}));

// Serve public frontend folder
app.use(express.static('public'));


// ✅ Global error handler
app.use(errorHandler);

module.exports = app;