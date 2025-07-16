import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export async function POST(req: NextRequest) {
  const { name, dob, phone } = await req.json();

  if (!name || !dob || !phone) {
    return NextResponse.json({ message: 'Missing details' }, { status: 400 });
  }

  const filename = `${name}-${dob}-${phone}.pdf`;
  const filePath = path.join(process.cwd(), 'public', 'resumes', filename);

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ message: 'Resume not found' }, { status: 404 });
  }

  return NextResponse.json({
    file: `/resumes/${filename}`,
  });
}
