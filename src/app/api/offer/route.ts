import db from '@/lib/mongoDB-connect';
import { IManager } from '@/model/manager';
import { IOffer } from '@/model/offer';
import managerSchema from '@/schema/manager-schema';
import offerSchema from '@/schema/offer-schema';
import { isValidObjectId } from 'mongoose';
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const set = new Set(Object.values(body));
    const hasOnlyNullValues = set.size === 1 || set.has(null || '');

    if (hasOnlyNullValues) {
      throw new Error('missing offer data');
    }

    const {
      salary,
      equity,
      bonus,
      culture,
      learning,
      healthcare,
      opportunities,
      managerName,
      name,
    } = body;

    await db.dbConnect();

    const companyManager: IManager | null = await managerSchema.findOne({
      name: managerName,
    });

    if (!companyManager) {
      throw new Error('manager not found');
    }

    const newOffer = await offerSchema.create({
      name: name,
      salary: +salary,
      bonus: +bonus,
      equity: +equity,
      culture: culture,
      learning: learning,
      opportunities: opportunities,
      healthcare: healthcare,
      company: companyManager.own_company,
    });

    await newOffer.save();

    const updateManager = await managerSchema.findOneAndUpdate(
      { name: managerName },
      {
        $push: { offers: newOffer },
      }
    );

    return NextResponse.json({
      status: 201,
      newOffer: newOffer,
      manager: updateManager,
    });
  } catch (error) {
    throw new Error('Error while adding offer ' + error);
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const offerId = searchParams.get('offerId');

  try {
    if (!isValidObjectId(offerId)) {
      throw new Error('Invalid offerId');
    }

    await db.dbConnect();

    const findOffer: IOffer = await offerSchema
      .findById(offerId)
      .populate({ path: 'questions', model: 'Question' })
      .exec();

    if (!findOffer) {
      throw new Error('Offer not found');
    }

    return NextResponse.json(findOffer);
  } catch (error) {
    throw new Error('Error while Get single offer ' + error);
  }
}
