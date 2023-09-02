import db from '@/lib/mongoDB-connect';
import offerSchema from '@/schema/offer-schema';
import questionSchema from '@/schema/question-schema';
import { isValidObjectId } from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { name, doubt, offerId } = body;

  try {
    if (!name || !doubt || !offerId) {
      throw new Error('Missing question data');
    }

    if (!isValidObjectId(offerId)) {
      throw new Error('Invalid offer Id');
    }

    await db.dbConnect();

    const newQuestion = await questionSchema.create({
      name: name,
      doubt: doubt,
    });

    const updateOffer = await offerSchema.findOneAndUpdate(
      { _id: offerId },
      {
        $push: {
          questions: newQuestion,
        },
      },
      {
        new: true,
        upsert: true,
      }
    );

    return NextResponse.json(updateOffer);
  } catch (error) {
    throw new Error('Error during question POST ' + error);
  }
}
