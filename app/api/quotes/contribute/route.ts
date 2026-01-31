import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { inviteCode, authorName, text } = await request.json();

    // Validate input
    if (!inviteCode || !authorName || !text) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    if (text.length > 500) {
      return NextResponse.json(
        { error: 'Message is too long (max 500 characters)' },
        { status: 400 }
      );
    }

    // Find user by invite code
    const user = await prisma.user.findUnique({
      where: { inviteCode },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid invite code' },
        { status: 404 }
      );
    }

    // Create quote
    const quote = await prisma.quote.create({
      data: {
        userId: user.id,
        authorName: authorName.trim(),
        text: text.trim(),
        isDefault: false,
      },
    });

    return NextResponse.json(
      {
        message: 'Quote created successfully',
        quote: {
          id: quote.id,
          authorName: quote.authorName,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contribute quote error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
