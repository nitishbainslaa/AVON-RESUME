'use client';
import { useState } from 'react';

export default function AdminPanel() {
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    setMessage(data.message);
    e.currentTarget.reset();
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Sticky Navbar */}
      <nav className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">Admin Dashboard</h1>
          <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition">
            Logout
          </button>
        </div>
      </nav>

      {/* Welcome Section */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          Welcome to Admin Panel
        </h2>

        {/* Upload Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Manual Upload Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow p-6 rounded-lg space-y-4"
          >
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              📥 Upload Resume via Form
            </h3>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="date"
              name="dob"
              placeholder="Date of Birth"
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="file"
              name="resume"
              className="w-full"
              accept="application/pdf"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition"
            >
              Upload Resume
            </button>
            {message && (
              <p className="text-green-600 text-sm font-medium mt-2">{message}</p>
            )}
          </form>

          {/* Excel Upload Section */}
          <div className="bg-white shadow p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              📊 Upload Resume Data via Excel
            </h3>
            <input
              type="file"
              accept=".xlsx, .xls"
              className="w-full mb-4"
            />
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded transition">
              Upload Excel
            </button>
            <p className="text-sm text-gray-500 mt-2">
              Please ensure the Excel file contains columns: Name, DOB, Phone, and Resume File Name.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
