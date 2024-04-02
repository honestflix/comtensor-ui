'use client'
import Image from 'next/image'

import FeatImage01 from '@/public/images/features-03-image-01.png'
import Dropdown from '@/components/utils/dropdown'
import FeatImage02 from '@/public/images/features-03-image-02.png'
import FeatImage03 from '@/public/images/features-03-image-03.png'
import axios from 'axios'
import { useState, useEffect, ChangeEvent, DragEvent, FormEvent } from 'react';
export default function HealthcareForm() {
  const [dragOver, setDragOver] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null); 
  const [disease, setDisease] = useState<string>('');
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragOver(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragOver(false);
  };
  const reset = () => {
    setImagePreviewUrl(null);
    setFile(null);
    setDisease('');
  }
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragOver(false);
      const files = e.dataTransfer.files;
      if (files.length) {
          // Process the files here. For example, upload them.
          
          const file = files[0];

          // Create a URL for the dropped image file
          const fileUrl = URL.createObjectURL(file);
          setImagePreviewUrl(fileUrl);
          setFile(file);
          // You can call an upload function here
      }
  };
  const uploadFile = async () => {
    console.log(file)
    if (file) {
      const formData = new FormData();
      formData.append('image', file); // Make sure 'image' matches the field expected by your backend
      console.log(formData)
      try {
        const response = await axios.post('https://api.comtensor.io/healthcare/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        // Handle response here
        setDisease(response.data['result']);
      } catch (error) {
        // Handle error here
        console.error(error);
      }
    }
  };

  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center space-x-6">
        <div className="py-12 md:py-20 border-t border-gray-800 flex flex-col mx-auto">
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <h1 className="h2 mb-4">Healthcare Assistant powered by ComTensor</h1>
            <p className="text-xl text-gray-400">Version 1.0.</p>
          </div>
          <div className=' flex items-center space-x-20'>
            <div>
              {!imagePreviewUrl && (

                <div
                    onDragOver={handleDragOver}
                    className='flex'
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    style={{
                        border: dragOver ? '2px dashed green' : '2px dashed #999',
                        padding: '20px',
                        width: '350px',
                        height: '300px',
                        color: dragOver ? 'green' : '#999',
                        textAlign: 'center',
                        lineHeight: '180px',
                    }}
                >
                    Drag and drop files here
                </div>
              )}
              {imagePreviewUrl && (
                      <div style={{ marginTop: '20px' }} >
                          <img src={imagePreviewUrl} alt="Preview" style={{ width: '350px', height: '300px',  }} />
                      </div>
              )}
            </div>
            <div className='flex flex-col space-y-6'>
              <button className="bg-blue-500 hover:bg-blue-700 text-white items-center font-bold py-2 px-4 rounded w-[100px] h-[50px] flex" onClick={uploadFile} >
                Analyze
              </button>
              <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold items-center py-2 px-4 rounded w-[100px] h-[50px] flex" onClick={reset}>
                Reset
              </button>
            </div>
            <div>
              {disease && (
                <div className="text-2xl text-gray-400 max-w-xl">
                  {
                    disease === 'Not Finding' ? (
                      <span className=' text-red-500 '>Sorry, we couldn't find any diseases in the image.</span>
                    ):(
                      <span>
                      You've been diagnosed with <span className=' text-red-500 '>{disease}</span>; rest assured, we're looking into the best care options.
                      {disease}
                      </span>
                    )
                  }
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
