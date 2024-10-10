"use client";
import React, { useState, useEffect } from 'react';

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
        const alumniResponse = await fetch('/api/admin/alumni');
        const usersResponse = await fetch('/api/admin/user');

        if (!alumniResponse.ok || !usersResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const alumniData = await alumniResponse.json();
        const usersData = await usersResponse.json();

        setAlumni(alumniData);
        setUsers(usersData);
      } catch (err) {
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const deleteAlumni = async (alumniId: string) => {
    try {
      const response = await fetch(`/api/admin/alumni?id=${alumniId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(`Failed to delete alumni: ${errorMessage.message}`);
      }
  
      // Update state to remove the deleted alumni from the list
      setAlumni((prevAlumni) => prevAlumni.filter((alum) => alum.id !== alumniId));
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message); // Log the error message
        setError(err.message || 'Failed to delete alumni');
      } else {
        console.error('An unknown error occurred:', err); // Log unknown errors
        setError('Failed to delete alumni');
      }
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      const response = await fetch(`/api/admin/user?id=${userId}`, {
        method: 'DELETE',
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
        setError(err.message || 'Failed to delete user');
      } else {
        console.error('An unknown error occurred:', err); // Log unknown errors
        setError('Failed to delete user');
      }
    }
  };

  const toggleAlumniStatus = async (userId: string, rollNumber: string) => {
    try {
      const response = await fetch(`/api/admin/user?id=${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rollNumber }), // Include only the roll number
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(`Failed to update user alumni status: ${errorMessage.message}`);
      }

      const updatedUser = await response.json();
      setUsers(users.map((user) => (user.id === userId ? updatedUser.user : user)));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update user status';
      console.error(errorMessage);
      setError(errorMessage);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Alumni List */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Alumni Management</h2>
        <table className="min-w-full bg-white border rounded">
          <thead>
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Roll Number</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {alumni.map((alum) => (
              <tr key={alum.id}>
                <td className="p-2 border">
                  {alum.firstName} {alum.lastName}
                </td>
                <td className="p-2 border">{alum.email}</td>
                <td className="p-2 border">{alum.rollNumber}</td>
                <td className="p-2 border">
                  <button
                    onClick={() => deleteAlumni(alum.id)}
                    className="bg-red-500 text-white p-2 rounded"
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
        <h2 className="text-2xl font-semibold mb-4">User Management</h2>
        <table className="min-w-full bg-white border rounded">
          <thead>
            <tr>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Roll Number</th>
              <th className="p-2 border">Is Alumni</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="p-2 border">{user.email}</td>
                <td className="p-2 border">{user.rollNumber}</td>
                <td className="p-2 border">
                  {user.isAlumni ? 'Yes' : 'No'}
                </td>
                <td className="p-2 border">
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="bg-red-500 text-white p-2 rounded"
                  >
                    Delete
                  </button>
                  <button
                    onClick={()=> {
                      // Only sending roll number for alumni verification
                      toggleAlumniStatus(user.id, user.rollNumber);
                    }}
                    className="bg-blue-500 text-white p-2 rounded ml-2"
                  >
                    {user.isAlumni ? 'Revoke Alumni' : 'Verify as Alumni'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default AdminPage;
