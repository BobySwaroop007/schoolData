import { NextResponse } from "next/server";
import { writeFile } from 'fs/promises';
import path from 'path';
import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'schooldb',
});

// get request
export async function GET(req) {
  try {
    console.log('Before query execution');
    const [data] = await connection.execute("SELECT * FROM schools");
    console.log('Query result:', data);
    return NextResponse.json({ message: 'Data fetched successfully', success: true, data });
  } catch (error) {
    console.error('Query error:', error);
    return NextResponse.json({ message: 'Internal Server Error', success: false });
  }
}

// post request
export async function POST(req) {
  const formData = await req.formData();
  const name = formData.get('name');
  const email = formData.get('email');
  const address = formData.get('address');
  const mobile = formData.get('mobile');
  const city = formData.get('city');
  const state = formData.get('state');
  const file = formData.get('file');
  const byteData = await file.arrayBuffer();
  const buffer = Buffer.from(byteData);

  // Specify the path within the `public` directory
  const imagePath = path.join('public', 'schoolImages', file.name);

  try {
    await writeFile(imagePath, buffer);

    const sql = "INSERT INTO schools (name, email, number, address, city, state, image) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const values = [name, email, mobile, address, city, state, file.name];

    const [data] = await connection.execute(sql, values);

    return NextResponse.json({ message: 'Data inserted successfully', success: true, data });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error', success: false });
  } finally {
    await connection.end(); // Close the database connection
  }
}
