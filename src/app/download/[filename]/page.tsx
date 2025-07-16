import { notFound } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function DownloadPage(props: any) {
  const { filename } = props.params || {};

  if (!filename) return notFound();

  return (
    <div>
      <h1>Downloading: {filename}</h1>
    </div>
  );
}

export function generateStaticParams() {
  return [];
}
