"use client";
import React, { useEffect, useState } from 'react';

interface Alumni {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  graduationYear: string;
  degree: string;
  major: string;
  currentCompany: string;
  jobTitle: string;
  location: string;
  linkedInProfile: string;
  bio: string;
}

const AlumniDirectory = () => {
  const [alumni, setAlumni] = useState<Alumni[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        const response = await fetch('/api/alumni');
        console.log('Response status:', response.status);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('API response:', data); // Log the API response

        if (Array.isArray(data)) {
          setAlumni(data);
        } else {
          console.error('Data is not an array:', data);
          setError('Data is not in the expected format.');
        }
      } catch (err) {
        // Check if the caught error is an instance of Error
        if (err instanceof Error) {
          console.error('Failed to fetch alumni:', err);
          setError(`Failed to fetch alumni: ${err.message}`);
        } else {
          // Fallback for non-Error objects
          console.error('Unexpected error:', err);
          setError('An unexpected error occurred.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAlumni();
  }, []);

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Alumni Directory</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {alumni.map((alumniMember) => (
          <div key={alumniMember._id} className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-semibold text-blue-600 mb-2">
              {alumniMember.firstName} {alumniMember.lastName}
            </h2>
            <p className="text-gray-700 mb-2"><strong>Email:</strong> {alumniMember.email}</p>
            <p className="text-gray-700 mb-2"><strong>Graduation Year:</strong> {alumniMember.graduationYear}</p>
            <p className="text-gray-700 mb-2"><strong>Degree:</strong> {alumniMember.degree}</p>
            <p className="text-gray-700 mb-2"><strong>Major:</strong> {alumniMember.major}</p>
            <p className="text-gray-700 mb-2"><strong>Company:</strong> {alumniMember.currentCompany}</p>
            <p className="text-gray-700 mb-2"><strong>Job Title:</strong> {alumniMember.jobTitle}</p>
            <p className="text-gray-700 mb-2"><strong>Location:</strong> {alumniMember.location}</p>
            <a
              href={alumniMember.linkedInProfile}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              LinkedIn Profile
            </a>
            <p className="mt-4 text-gray-600"><strong>Bio:</strong> {alumniMember.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlumniDirectory;
