import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function cleanDatabase() {
  try {
    console.log('🧹 Cleaning database...');
    
    // Delete all daily quotes first (due to foreign key constraints)
    const deletedDailyQuotes = await prisma.dailyQuote.deleteMany({});
    console.log(`🗑️  Deleted ${deletedDailyQuotes.count} daily quotes`);
    
    // Delete all default/dummy quotes (keep only real user-contributed quotes)
    const deletedQuotes = await prisma.quote.deleteMany({
      where: {
        isDefault: true  // Only delete the dummy/default quotes
      }
    });
    console.log(`🗑️  Deleted ${deletedQuotes.count} default/dummy quotes`);
    
    // Show remaining quotes (should be only real user contributions)
    const remainingQuotes = await prisma.quote.findMany({
      where: {
        isDefault: false
      },
      include: {
        user: {
          select: { name: true }
        }
      }
    });
    
    console.log(`\n📋 Remaining quotes (${remainingQuotes.length} real contributions):`);
    remainingQuotes.forEach((quote, i) => {
      console.log(`  ${i + 1}. "${quote.text.substring(0, 50)}..." - ${quote.authorName} (for ${quote.user.name})`);
    });
    
    console.log('\n✅ Database cleaned successfully!');
    console.log('🎉 Now only real user contributions remain');
    console.log('💌 Ready for fresh messages!');
    
  } catch (error) {
    console.error('❌ Error cleaning database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

cleanDatabase();
