import path from 'path';
import { URL } from 'url';

const getDirname = () => path.dirname(new URL(import.meta.url).pathname);

export default getDirname;
