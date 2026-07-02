import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { updateSubmissionStatus } from '../../../../../services/submission';

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('admin_session')?.value;

    if (session !== 'authenticated') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Please login first.' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await req.json();
    const { status } = body;

    if (!['submitted', 'approved', 'rejected'].includes(status)) {
      return NextResponse.json(
        { success: false, error: 'Invalid submission status.' },
        { status: 400 }
      );
    }

    await updateSubmissionStatus(id, status);
    return NextResponse.json({
      success: true,
      message: `Submission status successfully updated to ${status}.`,
    });
  } catch (error: any) {
    console.error('Error updating submission status:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update submission status.' },
      { status: 500 }
    );
  }
}
