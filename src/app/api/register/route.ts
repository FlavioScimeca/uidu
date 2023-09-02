import db from '@/lib/mongoDB-connect';
import { IManager } from '@/model/manager';
import managerSchema from '@/schema/manager-schema';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { name, company } = await req.json();

    // console.log({
    //   name: name,
    //   company: company,
    // });

    if (!name || !company) {
      throw new Error('Missing register data');
    }

    await db.dbConnect();

    const newManager = await managerSchema.create({
      name: name,
      own_company: {
        name: company.name,
        role: company.role,
        organization: company.organization,
        number_employers: +company.number_employers,
      },
    });

    await newManager.save();

    return NextResponse.json({
      status: 201,
      manager: newManager,
    });
  } catch (error) {
    throw new Error('Error while regiser new user' + error);
  }
}
