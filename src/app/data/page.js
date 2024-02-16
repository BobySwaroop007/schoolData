'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SchoolsPage = () => {
  const [schools, setSchools] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/handleform');
        if (response.data.success) {
          setSchools(response.data.data);
          console.log(response.data.data);
          // Log the state after it has been updated
          console.log('data', schools);
        } else {
          setError(response.data.message);
        }
      } catch (error) {
        console.error('Fetch error:', error);
        setError('Internal Server Error');
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 className='text-center font-bold text-3xl mt-4 mb-2'>Schools</h1>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <div className="flex flex-wrap justify-center">
        {schools.map((school) => (
          <div key={school.id} className="max-w-md rounded overflow-hidden shadow-lg m-4">
            <img className="w-96 h-48 object-cover" src={`/schoolImages/${school.image}`} alt={school.name} />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{school.name}</div>
              <p className="text-gray-700 text-base">{school.city}</p>
            </div>
          </div>
        ))}
      </div>
      
      )}
    </div>
  );
};

export default SchoolsPage;
