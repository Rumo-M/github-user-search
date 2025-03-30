import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const fetchUser = async () => {
    setError(null);
    setUserData(null);
    try {
      const response = await axios.get(`https://api.github.com/users/${username}`);
      setUserData(response.data);
    } catch (err) {
      setError('User not found');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">GitHub User Search</h1>
      <input
        type="text"
        placeholder="Enter GitHub username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border border-gray-300 p-2 rounded mb-2"
      />
      <button onClick={fetchUser} className="bg-blue-500 text-white px-4 py-2 rounded">
        Search
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}
      {userData && (
        <div className="mt-4 p-4 bg-white rounded shadow">
          <img src={userData.avatar_url} alt={userData.login} className="w-20 h-20 rounded-full" />
          <h2 className="text-xl font-bold">{userData.name || userData.login}</h2>
          <p className="text-gray-600">{userData.bio || 'No bio available'}</p>
          <p>Followers: {userData.followers} | Following: {userData.following}</p>
          <a href={userData.html_url} target="_blank" className="text-blue-500">View Profile</a>
        </div>
      )}
    </div>
  );
}

export default App;
