import app from './app.js'
import {connectDB} from './database/database.js'
//---------------------------------------------------------------------

const port = 3000;

connectDB();
app.listen(port, console.log(`Server on port ${port}`));