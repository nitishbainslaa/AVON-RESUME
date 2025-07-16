import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { mkdirSync, existsSync } from 'fs';

export async function POST(req: NextRequest) {
  const data = await req.formData();

  const name = data.get('name') as string;
  const dob = data.get('dob') as string;
  const phone = data.get('phone') as string;
  const resume = data.get('resume') as File;

  if (!name || !dob || !phone || !resume) {
    return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
  }

  const buffer = Buffer.from(await resume.arrayBuffer());
  const filename = `${name}-${dob}-${phone}.pdf`;

  const dirPath = path.join(process.cwd(), 'public', 'resumes');
  if (!existsSync(dirPath)) {
    mkdirSync(dirPath, { recursive: true });
  }

  const filePath = path.join(dirPath, filename);
  await writeFile(filePath, buffer);

  return NextResponse.json({ message: 'Resume uploaded successfully!' });
}
