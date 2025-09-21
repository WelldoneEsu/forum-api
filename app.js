const express = require('express');
const dotenv = require('dotenv');
const app = express();
// Load environment variables as early as possible
dotenv.config();
// DB connection
const connectDB = require('./config/db');
connectDB();
const authRoutes = require('./routes/authRoutes');
const threadRoutes = require('./routes/threadRoutes');
const commentRoutes = require('./routes/commentRoutes');
const adminRoutes = require('./routes/admin');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql/schema');
const rootValue = require('./graphql/resolvers');
// Error handler
const errorHandler = require('./middleware/errorHandler');

app.get('/', (req, res) => {
    res.status(200).json({ message: 'API is running sucessfully'})
});


// A simple health check route to confirm the API is live
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: "OK" });
});

app.use(express.json());
app.use('/api/', authRoutes);
app.use('/threads', threadRoutes);
app.use('/comments', commentRoutes);
app.use('/admin', adminRoutes);

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue,
  graphiql: true,
}));

// ✅ Global error handler
app.use(errorHandler);
module.exports = app;