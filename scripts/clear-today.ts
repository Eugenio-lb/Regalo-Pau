import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function clearTodayQuote() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of day
    
    console.log(`🗑️  Clearing daily quotes for date: ${today.toISOString().split('T')[0]}`);
    
    // First let's see what we have
    const existing = await prisma.dailyQuote.findMany({
      where: {
        date: today
      },
      include: {
        quote: {
          select: {
            text: true,
            authorName: true
          }
        },
        user: {
          select: {
            name: true
          }
        }
      }
    });
    
    console.log(`📋 Found ${existing.length} daily quote(s) for today:`);
    existing.forEach((dq, i) => {
      console.log(`  ${i + 1}. ${dq.user.name}: "${dq.quote.text.substring(0, 50)}..." - ${dq.quote.authorName}`);
    });
    
    if (existing.length > 0) {
      const deleted = await prisma.dailyQuote.deleteMany({
        where: {
          date: today
        }
      });
      
      console.log(`✅ Deleted ${deleted.count} daily quote(s) for today`);
      console.log('🎉 You can now get a new quote for today!');
    } else {
      console.log('ℹ️  No daily quotes found for today - nothing to delete');
    }
    
  } catch (error) {
    console.error('❌ Error clearing today quote:', error);
  } finally {
    await prisma.$disconnect();
  }
}

clearTodayQuote();
