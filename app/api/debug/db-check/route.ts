import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const dbPath = './.sqlite';
    const absolutePath = path.resolve(dbPath);
    const exists = fs.existsSync(absolutePath);
    
    return NextResponse.json({
      message: 'Database diagnostic',
      dbPath,
      absolutePath,
      exists,
      cwd: process.cwd(),
      env: {
        DATABASE_URL: process.env.DATABASE_URL,
        NODE_ENV: process.env.NODE_ENV,
      }
    });
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Unknown error',
      cwd: process.cwd()
    }, { status: 500 });
  }
}
