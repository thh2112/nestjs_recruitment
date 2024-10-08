import { CONFIG_KEYS } from '@/constant';
import { registerAs } from '@nestjs/config';
import { replace as _replace } from 'lodash';

export default registerAs(CONFIG_KEYS.DATABASE, () => ({
  url: _replace(process.env.DATABASE_URL, 'DATABASE_PASSWORD', process.env.DATABASE_PASSWORD),
  name: process.env.DATABASE_NAME,
  port: process.env.DATABASE_PORT,
  password: process.env.DATABASE_PASSWORD,
}));
