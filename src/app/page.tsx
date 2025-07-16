'use client';
import { useState } from 'react';
import QRCode from 'react-qr-code';
import Navbar from '@/components/Navbar';

export default function ClientPanel() {
  const [form, setForm] = useState({ name: '', dob: '', phone: '' });
  const [qrData, setQrData] = useState('');
  const [resumeUrl, setResumeUrl] = useState('');
  const [statusMsg, setStatusMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleGenerate = async () => {
    const { name, dob, phone } = form;
    const filename = `${name}-${dob}-${phone}.pdf`;
    const fullUrl = `${window.location.origin}/api/download?file=${filename}`;

    setLoading(true);
    setStatusMsg('');
    setQrData('');
    setResumeUrl('');

    const res = await fetch('/api/get-resume', {
      method: 'POST',
      body: JSON.stringify({ name, dob, phone }),
      headers: { 'Content-Type': 'application/json' },
    });

    setLoading(false);

    if (res.ok) {
      const data = await res.json();
      setResumeUrl(data.file);
      setQrData(fullUrl);
      setStatusMsg('✅ Resume found and QR generated.');
    } else {
      setQrData('invalid');
      setStatusMsg('❌ Resume not found. Please enter correct details.');
    }
  };

  const downloadQR = () => {
    const svg = document.querySelector('svg');
    if (!svg) return;

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(svgBlob);

    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 200;
      canvas.height = 200;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(image, 0, 0);
        const pngUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = pngUrl;
        link.download = 'qr-code.png';
        link.click();
        URL.revokeObjectURL(url);
      }
    };
    image.src = url;
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 py-10 px-4">
        <div className="max-w-6xl mx-auto bg-white bg-opacity-90 backdrop-blur-lg shadow-xl rounded-xl p-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-8">
            🔍 Retrieve Your Resume Instantly
          </h1>

          <div className="grid lg:grid-cols-3 gap-10">
            {/* ✅ FORM SECTION */}
            <div className="lg:col-span-2 space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Full Name</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-200"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Date of Birth</label>
                  <input
                    type="date"
                    name="dob"
                    value={form.dob}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-200"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-gray-700 mb-1">Phone Number</label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="9876543210"
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-200"
                  />
                </div>
              </div>

              <button
                onClick={handleGenerate}
                className="w-full bg-green-600 text-white py-3 text-lg rounded hover:bg-green-700 transition"
              >
                {loading ? 'Generating...' : '🎯 Generate QR Code'}
              </button>

              {statusMsg && (
                <div className="text-center text-md mt-4 font-medium text-red-600">
                  {statusMsg}
                </div>
              )}
            </div>

            {/* ✅ QR PREVIEW SECTION */}
            <div className="flex flex-col items-center justify-center relative">
              <div className="relative w-[220px] h-[220px] flex items-center justify-center border-4 border-dashed rounded-xl bg-gray-100 shadow-inner">
                {!qrData ? (
                  <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center rounded-xl text-sm font-semibold text-gray-600 text-center px-2">
                    🔒 Fill the form to generate your QR code
                  </div>
                ) : qrData === 'invalid' ? (
                  <div className="absolute inset-0 bg-red-200/60 backdrop-blur-sm flex items-center justify-center rounded-xl text-sm font-semibold text-red-700 text-center px-2">
                    ❌ Invalid information entered
                  </div>
                ) : (
                  <a href={qrData} target="_blank" rel="noopener noreferrer">
                    <QRCode value={qrData} size={200} />
                  </a>
                )}
              </div>

              {qrData && qrData !== 'invalid' && (
                <div className="mt-4 flex gap-3">
                  <button
                    onClick={downloadQR}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                  >
                    ⬇️ Download QR Code
                  </button>
                  {resumeUrl && (
                    <a
                      href={resumeUrl}
                      download
                      className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
                    >
                      📄 Download Resume
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* ✅ INFO SECTION */}
          <div className="mt-10 bg-gray-50 rounded-lg p-6 shadow-inner">
            <h3 className="text-xl font-semibold mb-2">💡 Tips:</h3>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li>Ensure the full name matches what you submitted earlier.</li>
              <li>Use your correct Date of Birth and Phone Number.</li>
              <li>Scan the QR code from any device to auto-download the resume.</li>
              <li>Your resume is securely stored and linked to your QR code.</li>
            </ul>
          </div>
          
        </div>
        <div className="mt-10 bg-yellow-100 p-4 rounded shadow-inner">
  <h3 className="font-semibold text-lg mb-1">Need Help?</h3>
  <p className="text-sm text-gray-700">
    If you’re unable to retrieve your resume, please email us at <a href="mailto:support@avonresumes.com" className="text-blue-600 underline">support@avonresumes.com</a>.
  </p>
</div>

      </main>
    </>
  );
}
