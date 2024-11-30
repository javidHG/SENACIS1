import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: ['./db/schema.ts'],
  dialect: 'postgresql',
  migrations: {
    prefix: 'supabase'
  },
  url: process.env.DATABASE_URL,  // Usa 'url' si 'dbCredentials' no es reconocido
});

