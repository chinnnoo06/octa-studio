import colors from 'colors'
import server from './server';
import { PORT } from './config/env';

const port = PORT || 4000

server.listen(port, () => {
  console.log(colors.cyan.bold(`Servidor escuchando en http://localhost:${port}`));
});
