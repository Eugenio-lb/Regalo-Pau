import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';

const execAsync = promisify(exec);

async function initializeDatabase() {
  const dbPath = path.resolve('./.sqlite');
  
  // Check if database already exists
  if (fs.existsSync(dbPath)) {
    console.log('✓ Database already exists');
    return;
  }

  try {
    console.log('🔄 Database not found, initializing...');
    
    // Run prisma migrate deploy to create the database
    await execAsync('npx prisma migrate deploy');
    
    console.log('✅ Database initialized successfully');
  } catch (error) {
    console.error('⚠️ Error initializing database:', error);
    // Don't fail the build if this fails; the app will attempt to create it on first use
  }
}

initializeDatabase();
