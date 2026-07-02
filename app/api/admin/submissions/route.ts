import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getAllSubmissions } from '../../../../services/submission';

export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('admin_session')?.value;

    if (session !== 'authenticated') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Please login first.' },
        { status: 401 }
      );
    }

    const submissions = await getAllSubmissions();
    return NextResponse.json({ success: true, submissions });
  } catch (error: any) {
    console.error('Error fetching admin submissions:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to retrieve submissions.' },
      { status: 500 }
    );
  }
}
