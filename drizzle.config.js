import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  
  schema: './config/schema.js',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://neondb_owner:npg_FrGcfz1nOqu9@ep-polished-brook-ad88sg6e-pooler.c-2.us-east-1.aws.neon.tech/ai-room-redesign?sslmode=require&channel_binding=require',
  },
});
