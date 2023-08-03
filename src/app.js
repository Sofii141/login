import express from 'express'
import morgan from 'morgan'
import authRoutes from './routes/auth.routes.js'
import cookieParser from 'cookie-parser'
import taskRoutes from './routes/tasks.routes.js'
import cors from 'cors'
//---------------------------------------------------------------------
const app = express();

//permite que todos los dominios se comuniquen con este servidor o el dominio seleccionado
app.use(cors({
    origin: 'http://localhost:5173',
    //establecer cookies
    credentials: true,
}));
// peticiones que llegan al backend
app.use(morgan('dev'));
app.use(express.json());
//cookies a formato json
app.use(cookieParser());
//routes
app.use('/api', authRoutes);
app.use('/api', taskRoutes);

export default app; 