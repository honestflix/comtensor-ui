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
    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragOver(false);
    };

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
            // You can call an upload function here
        }
    };

  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20 border-t border-gray-800">
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            style={{
                border: dragOver ? '2px dashed green' : '2px dashed #999',
                padding: '20px',
                width: '300px',
                height: '200px',
                color: dragOver ? 'green' : '#999',
                textAlign: 'center',
                lineHeight: '180px',
            }}
        >
            Drag and drop files here
        </div>
        {imagePreviewUrl && (
                <div style={{ marginTop: '20px' }}>
                    <img src={imagePreviewUrl} alt="Preview" style={{ maxWidth: '100%', height: 'auto' }} />
                </div>
            )}
        </div>
      </div>
    </section>
  )
}
