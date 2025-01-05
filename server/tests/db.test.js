import mongoose from 'mongoose';
import  connectDB from '../src/db'; // Adjust the path to where your connectDB function is located
import { describe, it, expect, beforeAll, afterAll, afterEach } from '@jest/globals';
import jest from 'jest-mock';

describe('connectDB', () => {
  // Mocking mongoose.connect
  beforeAll(() => {
  });

  afterAll(() => {
  });

  it('should throw an error if MongoDB URI is not defined', async () => {
    process.env.NODE_ENV = 'test'; // Simulate test environment
    delete process.env.TEST_MONGODB_URI; // Remove the test MongoDB URI to simulate undefined
  
    await expect(connectDB()).rejects.toThrow(
      'La variable de entorno para la URI de MongoDB no está definida.'
    );
  });
  
  it('should log error when MongoDB connection fails', async () => {
    process.env.NODE_ENV = 'test'; // Simulate test environment
    process.env.TEST_MONGODB_URI = 'mongodb://test-uri'; // Mock the MongoDB URI
  
    // Mock mongoose.connect to simulate a failed connection
    jest.spyOn(mongoose, 'connect').mockRejectedValueOnce(new Error('Connection failed'));
  
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(); // Spy on console.error
  
    // Call the function
    await connectDB();
  
    // Check that the error message was logged
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error al conectar a MongoDB:', expect.any(Error));
  
    // Clean up spy
    consoleErrorSpy.mockRestore();
  });
  
  
});
