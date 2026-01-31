import { prisma } from '@/lib/prisma';

async function resetDatabase() {
  try {
    console.log('🔄 Resetting database...');
    
    // Delete all records in order of dependencies
    await prisma.dailyQuote.deleteMany({});
    console.log('✓ Deleted all daily quotes');
    
    await prisma.quote.deleteMany({});
    console.log('✓ Deleted all quotes');
    
    await prisma.user.deleteMany({});
    console.log('✓ Deleted all users');
    
    console.log('✅ Database reset complete! Ready for new signup.');
  } catch (error) {
    console.error('❌ Error resetting database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

resetDatabase();
