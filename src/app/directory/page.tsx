"use client";
import { div } from 'framer-motion/client';
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

  // Separate state to store the input values for filters
  const [filterInputs, setFilterInputs] = useState({
    degree: "",
    jobTitle: "",
    currentCompany: "",
  });

  // Actual filters applied when search button is clicked
  const [filters, setFilters] = useState({
    degree: "",
    jobTitle: "",
    currentCompany: "",
  });

  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        const query = new URLSearchParams(filters).toString();
        const response = await fetch(`/api/alumni?${query}`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        if (Array.isArray(data)) {
          setAlumni(data);
        } else {
          setError('Data is not in the expected format.');
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(`Failed to fetch alumni: ${err.message}`);
        } else {
          setError('An unexpected error occurred.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAlumni();
  }, [filters]);

  // Handle filter input change (this does not trigger the search)
  const handleFilterInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterInputs({
      ...filterInputs,
      [e.target.name]: e.target.value,
    });
  };

  // Handle the "Search" button click to apply filters
  const handleSearchClick = () => {
    setFilters(filterInputs); // Apply the inputs as actual filters
    setLoading(true); // Set loading to true while fetching new data
  };

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-fixed bg-cover bg-center"
         style={{ backgroundImage: "url('/hero-bg.jpg')" }}>
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center text-white mb-8">Alumni Directory</h1>

      {/* Filter section */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
  <input
    type="text"
    name="degree"
    placeholder="Filter by Degree"
    value={filterInputs.degree}
    onChange={handleFilterInputChange}
    className="p-3 border border-gray-500 bg-transparent text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-lilac-500"
  />
  <input
    type="text"
    name="jobTitle"
    placeholder="Filter by Job Title"
    value={filterInputs.jobTitle}
    onChange={handleFilterInputChange}
    className="p-3 border border-gray-500 bg-transparent text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-lilac-500"
  />
  <input
    type="text"
    name="currentCompany"
    placeholder="Filter by Current Company"
    value={filterInputs.currentCompany}
    onChange={handleFilterInputChange}
    className="p-3 border border-gray-500 bg-transparent text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-lilac-500"
  />
</div>


      {/* Search Button */}
      <div className="text-center mb-8">
        <button
          onClick={handleSearchClick}
          className="px-6 py-2 bg-blue-700 bg-opacity-70 text-white rounded hover:bg-opacity-90 transition duration-300"
        >
          Search
        </button>
      </div>

      {/* Alumni list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
  {alumni.map((alumniMember) => (
    <div
      key={alumniMember._id}
      className="bg-slate-800 p-6 rounded-lg backdrop-filter backdrop-blur-md shadow-lg hover:shadow-xl transition-shadow transform hover:-translate-y-1 duration-300"
    >
      <h2 className="text-2xl font-semibold text-white mb-2">
        {alumniMember.firstName} {alumniMember.lastName}
      </h2>
      <p className="text-gray-200 mb-2"><strong>Email:</strong> {alumniMember.email}</p>
      <p className="text-gray-200 mb-2"><strong>Graduation Year:</strong> {alumniMember.graduationYear}</p>
      <p className="text-gray-200 mb-2"><strong>Degree:</strong> {alumniMember.degree}</p>
      <p className="text-gray-200 mb-2"><strong>Company:</strong> {alumniMember.currentCompany}</p>
      <p className="text-gray-200 mb-2"><strong>Job Title:</strong> {alumniMember.jobTitle}</p>
      <p className="text-gray-200 mb-2"><strong>Location:</strong> {alumniMember.location}</p>
      <a
        href={alumniMember.linkedInProfile}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-200 hover:text-blue-300 transition-colors"
      >
        LinkedIn Profile
      </a>
      <p className="mt-4 text-gray-300"><strong>Bio:</strong> {alumniMember.bio}</p>
    </div>
  ))}
</div>

    </div>
    </div>
  );
};

export default AlumniDirectory;
