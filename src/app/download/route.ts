import { NextRequest } from 'next/server';
import { join } from 'path';
import fs from 'fs';

export async function GET(req: NextRequest) {
  const fileParam = req.nextUrl.searchParams.get('file');

  if (!fileParam) {
    return new Response('File not specified', { status: 400 });
  }

  const filePath = join(process.cwd(), 'public', 'resumes', fileParam);

  if (!fs.existsSync(filePath)) {
    return new Response('File not found', { status: 404 });
  }

  const fileBuffer = fs.readFileSync(filePath);

  return new Response(fileBuffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${fileParam}"`,
    },
  });
}
