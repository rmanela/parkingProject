import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


// ייבוא ה-API של החניות
import parkingApi from './parkingApi';
app.use('/api', parkingApi);

app.get('/', (req, res) => {
  res.send('Server is running!');
});




app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

