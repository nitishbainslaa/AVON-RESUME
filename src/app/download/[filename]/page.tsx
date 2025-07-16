import { redirect } from 'next/navigation';

interface Props {
  params: {
    filename: string;
  };
}

export default function DownloadPage({ params }: Props) {
  const fileUrl = `/uploads/${params.filename}`;
  redirect(fileUrl);
}
