import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const data = await req.formData();

  const name = data.get('name') as string;
  const dob = data.get('dob') as string;
  const phone = data.get('phone') as string;
  const resume = data.get('resume') as File;

  if (!name || !dob || !phone || !resume) {
    return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
  }

  // ✅ Simulate successful response
  return NextResponse.json({
    message: 'Resume uploaded successfully (dummy)!',
    name,
    filename: resume.name,
  });
}
