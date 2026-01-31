import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

// GET: Check if today's quote exists
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dailyQuote = await prisma.dailyQuote.findFirst({
      where: {
        userId: decoded.userId,
        date: today,
      },
      include: {
        quote: true,
      },
    });

    if (!dailyQuote) {
      return NextResponse.json({ quote: null });
    }

    return NextResponse.json({
      quote: {
        id: dailyQuote.quote.id,
        text: dailyQuote.quote.text,
        authorName: dailyQuote.quote.authorName,
      },
    });
  } catch (error) {
    console.error('Get daily quote error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST: Get or create today's quote
export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if today's quote already exists
    const existingDailyQuote = await prisma.dailyQuote.findFirst({
      where: {
        userId: decoded.userId,
        date: today,
      },
      include: {
        quote: true,
      },
    });

    if (existingDailyQuote) {
      return NextResponse.json({
        quote: {
          id: existingDailyQuote.quote.id,
          text: existingDailyQuote.quote.text,
          authorName: existingDailyQuote.quote.authorName,
        },
      });
    }

    // Get all available quotes (not used today)
    const quotes = await prisma.quote.findMany({
      where: {
        userId: decoded.userId,
      },
    });

    if (quotes.length === 0) {
      return NextResponse.json(
        { error: 'No quotes available. Ask your friends to send some!' },
        { status: 404 }
      );
    }

    // Select a random quote
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

    // Create daily quote record
    const dailyQuote = await prisma.dailyQuote.create({
      data: {
        userId: decoded.userId,
        quoteId: randomQuote.id,
        date: today,
      },
      include: {
        quote: true,
      },
    });

    // Update quote's usedOn field
    await prisma.quote.update({
      where: { id: randomQuote.id },
      data: { usedOn: new Date() },
    });

    return NextResponse.json({
      quote: {
        id: dailyQuote.quote.id,
        text: dailyQuote.quote.text,
        authorName: dailyQuote.quote.authorName,
      },
    });
  } catch (error) {
    console.error('Create daily quote error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
