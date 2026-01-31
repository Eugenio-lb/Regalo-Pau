import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const defaultQuotes = [
  "You are stronger than you think! Keep pushing forward. 💪",
  "Distance means so little when someone means so much. Thinking of you! 💕",
  "Your smile lights up the world! Never forget how special you are. ✨",
  "Every journey begins with a single step. You're doing amazing! 🌟",
  "Believe in yourself as much as we believe in you! 🚀",
  "You make the world a better place just by being in it. 🌍",
  "Missing you, but so proud of everything you're doing! 🎉",
  "Your courage inspires everyone around you. Keep shining! ⭐",
  "No matter how far you go, you're always in our hearts. ❤️",
  "You've got this! We're cheering for you every step of the way! 🎊",
  "Your adventure is just beginning, and it's going to be incredible! 🗺️",
  "Remember: you are loved, you are valued, you are enough. 💝",
  "Keep being the amazing person you are! The world needs you. 🌈",
  "Your dreams are valid and achievable. Don't give up! 🌠",
  "Sending you a virtual hug! You're not alone in this journey. 🤗",
  "You bring so much joy to everyone you meet! 😊",
  "Your strength and resilience are truly inspiring. 💎",
  "The best is yet to come! Keep moving forward. 🌅",
  "You're making memories that will last a lifetime! 📸",
  "Your positive energy is contagious. Keep spreading it! ✨",
];

async function main() {
  console.log('🌱 Starting seed...');

  // Get all users
  const users = await prisma.user.findMany();

  if (users.length === 0) {
    console.log('⚠️  No users found. Please register a user first!');
    return;
  }

  let totalCreated = 0;

  for (const user of users) {
    console.log(`\n📝 Seeding quotes for user: ${user.name} (${user.email})`);

    for (const quoteText of defaultQuotes) {
      // Check if quote already exists
      const existing = await prisma.quote.findFirst({
        where: {
          userId: user.id,
          text: quoteText,
        },
      });

      if (!existing) {
        await prisma.quote.create({
          data: {
            userId: user.id,
            authorName: 'Daily Love Notes',
            text: quoteText,
            isDefault: true,
          },
        });
        totalCreated++;
      }
    }

    console.log(`✅ Created ${totalCreated} default quotes for ${user.name}`);
  }

  console.log(`\n🎉 Seed completed! Total quotes created: ${totalCreated}`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
