import { getTheSession } from '@/lib/actions/user.actions';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';
const handleError = (error: unknown, message: string) => {
  console.log(error, message);
  throw error;
};
export async function GET(request: NextRequest) {
  try {
    console.log(1);
    const userId = request.nextUrl.searchParams.get('userId');
    const secret = request.nextUrl.searchParams.get('secret');
    console.log(2);

    console.log(userId, secret);
    if (!userId || !secret) {
      return console.log('Couldnt login ');
    }
    console.log(3);

    const session = await getTheSession(userId, secret);
    console.log(4);
    return NextResponse.json(
      { message: 'Success full login', success: true },
      { status: 200 }
    );
  } catch (er: any) {
    console.log(5);
    return NextResponse.json(
      { message: er.message, success: false },
      { status: 500 }
    );
  }
}
