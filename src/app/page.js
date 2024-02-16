'use client'
import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Link from 'next/link';

const Home = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {

    try {
      const formData = new FormData();
      formData.append('file', data.file[0]);
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('address', data.address);
      formData.append('mobile', data.mobile);
      formData.append('city', data.city);
      formData.append('state', data.state);

      //  Send data to the API
      const response = await axios.post('http://localhost:3000/api/handleform', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

     if(response.data.success === true){
      alert('Data Added successfully!');
      reset();
     }

      
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 md:p-24">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6">Registration Form <Link className = 'text-xl font-bold ml-4 text-cyan-600' href='/data'>To View Schools </Link></h1>
        <form method='post' onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Name:</label>
            <input
              type="text"
              {...register('name', { pattern: /^[A-Za-z ]+$/ })}
              className="w-full border p-2"
            />
            {errors.name && <p className="text-red-500 text-sm">Enter Valid Name</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Email:</label>
            <input
              type="text"
              {...register('email', { pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/ })}
              className="w-full border p-2"
            />
            {errors.email && <p className="text-red-500 text-sm">Enter Valid Email</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Address:</label>
            <input
              type="text"
              {...register('address')}
              className="w-full border p-2"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Mobile No.:</label>
            <input
              type="tel"
              {...register('mobile', { pattern: /^\d{10}$/ })}
              className="w-full border p-2"
            />
            {errors.mobile && <p className="text-red-500 text-sm">Enter Valid Phone Number</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">City:</label>
            <select {...register('city')} className="w-full border p-2">
              <option value="Lucknow">Lucknow</option>
              <option value="Kanpur">Kanpur</option>
              <option value="Sitapur">Sitapur</option>
              <option value="Allahabad">Allahabad</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">State:</label>
            <select {...register('state')} className="w-full border p-2">
              <option value="UP">Uttar Pradesh</option>
              <option value="Bihar">Bihar</option>
              <option value="Delhi">Delhi</option>
              <option value="Gujrat">Gujarat</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Upload Image:</label>
            <input
              type="file"
              {...register('file')}
              className="w-full border p-2"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </main>
  );
};

export default Home;
