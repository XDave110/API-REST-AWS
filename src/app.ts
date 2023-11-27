import express from 'express'
import alumnoRoutes from './routes/alumnoRoutes';
import profesorRoutes from './routes/profesorRoutes';


const app = express();
const PORT = 8080;

app.use(express.json());
app.use(alumnoRoutes);
app.use(profesorRoutes);

app.listen(PORT, '0.0.0.0', () => { 
  console.log(`Server running on port ${PORT}`);
});