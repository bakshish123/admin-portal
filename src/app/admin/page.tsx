"use client";
import React, { useState, useEffect } from "react";

// Interfaces for Alumni and User
interface IAlumni {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  graduationYear: number;
  degree: string;
  major: string;
  rollNumber: string;
  jobTitle?: string;
  currentCompany?: string;
  location?: string;
  linkedInProfile?: string;
  bio?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface IUser {
  id: string;
  email: string;
  rollNumber: string;
  isAlumni: boolean;
  dob: Date;
}

// Admin Page Component
const AdminPage: React.FC = () => {
  const [alumni, setAlumni] = useState<IAlumni[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all alumni and users
  useEffect(() => {
    const fetchData = async () => {
      try {
        const alumniResponse = await fetch("/api/admin/alumni");
        const usersResponse = await fetch("/api/admin/user");

        if (!alumniResponse.ok || !usersResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const alumniData = await alumniResponse.json();
        const usersData = await usersResponse.json();

        setAlumni(alumniData);
        setUsers(usersData);
      } catch (err) {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const deleteAlumni = async (alumniId: string) => {
    try {
      const response = await fetch(`/api/admin/alumni?id=${alumniId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(`Failed to delete alumni: ${errorMessage.message}`);
      }

      // Update state to remove the deleted alumni from the list
      setAlumni((prevAlumni) =>
        prevAlumni.filter((alum) => alum.id !== alumniId)
      );
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message); // Log the error message
        setError(err.message || "Failed to delete alumni");
      } else {
        console.error("An unknown error occurred:", err); // Log unknown errors
        setError("Failed to delete alumni");
      }
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      const response = await fetch(`/api/admin/user?id=${userId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(`Failed to delete user: ${errorMessage.message}`);
      }

      // Update state to remove the deleted user from the list
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message); // Log the error message
        setError(err.message || "Failed to delete user");
      } else {
        console.error("An unknown error occurred:", err); // Log unknown errors
        setError("Failed to delete user");
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex items-center justify-center min-h-screen"
     style={{ backgroundImage: "url('/hero-bg.jpg')" }}>
      <div className="max-w-7xl w-full mx-auto p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-white">Admin Dashboard</h1>

        {/* Alumni List */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-white">Alumni Management</h2>
          <table className="min-w-full bg-[#374151] text-white rounded-lg shadow-md">
            <thead>
              <tr>
                <th className="p-4 border border-gray-600">Name</th>
                <th className="p-4 border border-gray-600">Email</th>
                <th className="p-4 border border-gray-600">Roll Number</th>
                <th className="p-4 border border-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {alumni.map((alum) => (
                <tr key={alum.id} className="hover:bg-[#4b5563]">
                  <td className="p-4 border border-gray-600">
                    {alum.firstName} {alum.lastName}
                  </td>
                  <td className="p-4 border border-gray-600">{alum.email}</td>
                  <td className="p-4 border border-gray-600">{alum.rollNumber}</td>
                  <td className="p-4 border border-gray-600">
                    <button
                      onClick={() => deleteAlumni(alum.id)}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded font-bold mr-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* User List */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">User Management</h2>
          <table className="min-w-full bg-[#374151] text-white rounded-lg shadow-md">
            <thead>
              <tr>
                <th className="p-4 border border-gray-600">Email</th>
                <th className="p-4 border border-gray-600">Roll Number</th>
                <th className="p-4 border border-gray-600">Is Alumni</th>
                <th className="p-4 border border-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-[#4b5563]">
                  <td className="p-4 border border-gray-600">{user.email}</td>
                  <td className="p-4 border border-gray-600">{user.rollNumber}</td>
                  <td className="p-4 border border-gray-600">
                    {user.isAlumni ? "Yes" : "No"}
                  </td>
                  <td className="p-4 border border-gray-600">
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded font-bold mr-2"
                    >
                      Delete
                    </button>
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};

export default AdminPage;
