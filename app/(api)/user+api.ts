import { neon } from '@neondatabase/serverless';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is not defined');
}

const sql = neon(connectionString);

export async function POST(request: Request)
{
    try {

    } catch (err){

    }
}

// See https://neon.tech/docs/serverless/serverless-driver
// for more information