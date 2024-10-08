import { CONFIG_KEYS } from '@/constant';
import { registerAs } from '@nestjs/config';

export default registerAs(CONFIG_KEYS.APP, () => ({
  port: process.env.PORT,
  env: process.env.NODE_ENV,
  name: process.env.APP_NAME,
}));
