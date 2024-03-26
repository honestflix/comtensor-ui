'use client'
import Image from 'next/image'

import FeatImage01 from '@/public/images/features-03-image-01.png'
import Dropdown from '@/components/utils/dropdown'
import FeatImage02 from '@/public/images/features-03-image-02.png'
import FeatImage03 from '@/public/images/features-03-image-03.png'
import axios from 'axios'
import { useState, useEffect } from 'react';
export default function TranslateForm() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isSourceOpen, setIsSourceOpen] = useState(false);

  const [isTargetOpen, setIsTargetOpen] = useState(false);
  const [targetLang, setTargetLang] = useState('zh');
  const [sourceLang, setSourceLang] = useState('en');
  const languages:any = {
    "English" : "en",
    "Chinese" : "zh",
    "Spainish" : "es"
  }
  const selectTargetLanguage = (language:any) => {
    console.log(languages[language]);
    setTargetLang(languages[language]);
    translateText(inputText, sourceLang, languages[language]);
  }

  const selectSourceLanguage = (language:any) => {
    console.log(languages[language]);
    setSourceLang(languages[language]);
    translateText(inputText, languages[language], targetLang);
  }
  const translateText = (text:any, source_lang:any, target_lang:any) => {
    // Placeholder for actual API call
    // Simulate translation by converting to uppercase
    
    const data = {
      text: text,
      source_lang: source_lang,
      target_lang: target_lang
    };
    console.log(data);
    axios.post('https://api.comtensor.io/translate/', data, {
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
      translateText(inputText, sourceLang, targetLang);
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
            <div className="inline-flex text-sm font-semibold py-1 px-3 m-2 text-green-600 bg-green-200 rounded-full mb-4">{ Object.keys(languages).find((key) => languages[key] === sourceLang) } to { Object.keys(languages).find((key) => languages[key] === targetLang) }</div>
            <h1 className="h2 mb-4">Translator powered by ComTensor</h1>
            <p className="text-xl text-gray-400">Version 1.0.</p>
          </div>

          {/* Items */}

          <div className="flex flex-col gap-4 p-1 max-w-xl mx-auto">

          <div className="relative">
            <button
              id="dropdownHoverButton"
              onMouseEnter={() => setIsSourceOpen(true)}
              onMouseLeave={() => setIsSourceOpen(false)}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
            >
              {Object.keys(languages).find((key) => languages[key] === sourceLang)}
              <svg className="w-2.5 h-2.5 ml-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
              </svg>
            </button>

            {isSourceOpen && (
              <div
                id="dropdownHover"
                onMouseEnter={() => setIsSourceOpen(true)}
                onMouseLeave={() => setIsSourceOpen(false)}
                className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute"
              >
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownHoverButton">
                  {Object.keys(languages).map((language) => (
                    <li key={language}>
                      <button onClick={() => selectSourceLanguage(language)} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{language}</button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
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

            <div className="relative">
              <button
                id="dropdownHoverButton"
                onMouseEnter={() => setIsTargetOpen(true)}
                onMouseLeave={() => setIsTargetOpen(false)}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
              >
                {Object.keys(languages).find((key) => languages[key] === targetLang)}
                <svg className="w-2.5 h-2.5 ml-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                </svg>
              </button>

              {isTargetOpen && (
                <div
                  id="dropdownHover"
                  onMouseEnter={() => setIsTargetOpen(true)}
                  onMouseLeave={() => setIsTargetOpen(false)}
                  className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute"
                >
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownHoverButton">
                    {Object.keys(languages).map((language) => (
                      <li key={language}>
                        <button onClick={() => selectTargetLanguage(language)} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{language}</button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
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
