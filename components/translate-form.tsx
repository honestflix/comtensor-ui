'use client'
import Image from 'next/image'

import FeatImage01 from '@/public/images/features-03-image-01.png'

import FeatImage02 from '@/public/images/features-03-image-02.png'
import FeatImage03 from '@/public/images/features-03-image-03.png'
import axios from 'axios'
import { useState, useEffect } from 'react';
export default function TranslateForm() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  const translateText = (text:any) => {
    // Placeholder for actual API call
    // Simulate translation by converting to uppercase
    
    const data = {
      text: text,
      target_lang: "zh"
    };

    axios.post('http://api.comtensor.io/translate/', data, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then((response:any) => {
      console.log(response.data[0].translated_texts[0]);
      setOutputText(response.data[0].translated_texts[0])
      // return response.data[0].translated_texts[0];
    })
    .catch((error:any) => {
      console.error(error);
    });
    // return ''
  };
  useEffect(() => {
    const handler = setTimeout(() => {
      translateText(inputText);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [inputText]);

  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20 border-t border-gray-800">

          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <div className="inline-flex text-sm font-semibold py-1 px-3 m-2 text-green-600 bg-green-200 rounded-full mb-4">EN to CN</div>
            <h1 className="h2 mb-4">Translator powered by ComTensor</h1>
            <p className="text-xl text-gray-400">Version 1.0.</p>
          </div>

          {/* Items */}
          <div className="flex flex-col gap-4 p-1 max-w-xl mx-auto">
            <textarea
              className="h-40 p-2 border-1 border-gray-200 resize-none focus:border-blue-500 text-black focus:outline-none rounded-md"
              placeholder="Enter text to translate"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <div className="text-center">
              <span className="inline-block bg-blue-500 text-white px-3 py-1 rounded-full">
                ➡️🌐
              </span>
            </div>
            <textarea
              className="h-40 p-2 border-1 border-gray-200 resize-none bg-gray-100 text-gray-700 focus:outline-none rounded-md"
              placeholder="Translation will appear here"
              value={outputText}
              readOnly
            />
          </div>

        </div>
      </div>
    </section>
  )
}
