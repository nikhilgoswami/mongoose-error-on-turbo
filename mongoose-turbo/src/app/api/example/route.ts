import { NextResponse } from 'next/server';
import { handler } from '@/app/api/middlewares/handler';
import User from '../models/users';

const hello = async (req: Request) => {
  try {
    console.log('executed : ')
    const users = await User.findOne({}).lean()
  } catch (error) {
    console.log(error);
  }
  return NextResponse.json({ data: 'Hello World' });
};

export const POST = handler(
  hello,
);