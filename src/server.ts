import dotenv from 'dotenv';
import { errors } from 'celebrate';
import app from './app';

dotenv.config();

const port = process.env.PORT || 6060;

app.use(errors());
app.listen(port);
console.log('listening at', port);
