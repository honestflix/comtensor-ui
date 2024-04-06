'use client'
import Image from 'next/image'

// import FeatImage01 from '@/public/images/features-03-image-01.png'
// import Dropdown from '@/components/utils/dropdown'
// import FeatImage02 from '@/public/images/features-03-image-02.png'
// import FeatImage03 from '@/public/images/features-03-image-03.png'
import axios from 'axios';
import { useState, useEffect } from 'react';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import TranslateIcon from '@mui/icons-material/Translate';
import HistoryIcon from '@mui/icons-material/History';
import StarsIcon from '@mui/icons-material/Stars';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { CircularProgress } from '@mui/material'

export default function TranslateForm() {

  const maxCharacters = 5000;
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isSourceOpen, setIsSourceOpen] = useState(false);

  const [isTargetOpen, setIsTargetOpen] = useState(false);
  const [targetLang, setTargetLang] = useState('zh');
  const [sourceLang, setSourceLang] = useState('en');
  
  const languages: any = {
    "English": "en",
    "Chinese": "zh",
    "Spainish": "es",
    "French": "fr",
    "German": "de",
    "Italian": "it",
    "Korean": "ko",
    "Polish": "pl",
    "Portuguese": "pt",
    "Russian": "ru",
    "Spanish": "es",
    "Swedish": "sv",
    "Turkish": "tr",
    "Vietnamese": "vi",
    "Chinese Simplified": "zh-CN",
    "Chinese Traditional": "zh-TW",
    "Japanese": "ja",
  }

  const characterCount = inputText.length;
  const tranCharacterCount = outputText.length;
  const remainingCharacters = maxCharacters - characterCount;

  const selectTargetLanguage = (language: any) => {
    console.log(languages[language]);
    setTargetLang(languages[language]);
    translateText(inputText, sourceLang, languages[language]);
  }

  const selectSourceLanguage = (language: any) => {
    console.log(languages[language]);
    setSourceLang(languages[language]);
    translateText(inputText, languages[language], targetLang);
  }
  const translateText = (text: any, source_lang: any, target_lang: any) => {
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
      .then((response: any) => {
        console.log(response.data[0].translated_texts[0]);
        setOutputText(response.data[0].translated_texts[0])
        // return response.data[0].translated_texts[0];
      })
      .catch((error: any) => {
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
            {/* <div className="inline-flex text-sm font-semibold py-1 px-3 m-2 text-green-600 bg-green-200 rounded-full mb-4">{Object.keys(languages).find((key) => languages[key] === sourceLang)} to {Object.keys(languages).find((key) => languages[key] === targetLang)}</div> */}
            <h1 className="h2 mb-4">Translator powered by ComTensor</h1>
            <p className="text-xl text-gray-400">Version 1.0.</p>
          </div>
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <div className="inline-flex text-2xl font-semibold py-1 px-3 m-2 rounded-full mb-4">{Object.keys(languages).find((key) => languages[key] === sourceLang)} <SwapHorizIcon color='primary' className='w-24' /> {Object.keys(languages).find((key) => languages[key] === targetLang)}</div>
            <div className="mb-4">

            </div>
            <p className="text-xl text-gray-400"></p>
          </div>
          {/* Items */}
          <div className="flex lg:flex-row xl:flex-row gap-4 p-1 md:flex-col sm:flex-col md:mx-auto sm:mx-auto max-w-xl mx-auto items-center justify-center">
            <div className="flex flex-col space-y-4">
              <div className="relative md:w-full">
                {/* <Textarea /> */}
                <button
                  id="dropdownHoverButton"
                  onMouseEnter={() => setIsSourceOpen(true)}
                  onMouseLeave={() => setIsSourceOpen(false)}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  type="button"
                >
                  {Object.keys(languages).find((key) => languages[key] === sourceLang)}
                  <svg className="w-4 h-4 ml-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
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
                className="px-3 py-2 md:py-3 md:px-4 block w-full h-[500px] text-base text-black
                md:w-[18rem] xl:w-[22rem] rounded-lg md:rounded-xl text-sm placeholder:text-gray-600
                placeholder:font-normal border-2 ring-2
                ring-transparent border-gray-200 hover:border-blue-200 outline-none focus:ring-blue-300 
                dark:bg-gray-800 dark:hover:bg-slate-800
                dark:border-gray-700 dark:text-gray-400 duration-300"
                placeholder="Enter text to translate"
                value={inputText}
                maxLength={maxCharacters}
                onChange={(e) => setInputText(e.target.value)}
              />
              <div className="text-right text-gray-500">
                <span className="text-sm">
                  {characterCount} / {maxCharacters}
                </span>
              </div>
              <div className="text-right text-gray-500">
                <span className="text-sm">
                  {remainingCharacters} / {maxCharacters}
                </span>
              </div>
            </div>
            <div className="text-center">
              <button className="inline-block bg-white text-white px-3 py-3 rounded-full hover:bg-gray-200">
                <SwapHorizIcon color='primary' />
              </button>
            </div>
            <div className="flex flex-col space-y-4">
              <div className="relative md:w-full">
                {/* <Textarea /> */}
                <button
                  id="dropdownHoverButton"
                  onMouseEnter={() => setIsTargetOpen(true)}
                  onMouseLeave={() => setIsTargetOpen(false)}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  type="button"
                >
                  {Object.keys(languages).find((key) => languages[key] === targetLang)}
                  <svg className="w-4 h-4 ml-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
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
                className="px-3 py-2 md:py-3 md:px-4 block w-full h-[500px] text-base
                md:w-[18rem] xl:w-[22rem] rounded-lg md:rounded-xl text-sm placeholder:text-gray-600
                placeholder:font-normal border-2 ring-2
                ring-transparent border-gray-200 hover:border-blue-200 outline-none focus:ring-blue-300 
                dark:bg-gray-800 dark:hover:bg-slate-800
                dark:border-gray-700 dark:text-gray-400 duration-300"
                placeholder="Translation will appear here"
                value={outputText}
                readOnly
              />
               <div className="text-right text-gray-500">
                <span className="text-sm">
                  Translation
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-center items-center text-center mb-4 gap-12">
              <button className="inline-block bg-white text-white px-3 py-3 rounded-full hover:bg-gray-200">
                <HistoryIcon color='primary' />
              </button>
              <button className="inline-block bg-white text-white px-3 py-3 rounded-full hover:bg-gray-200">
                <StarsIcon color='primary' />
              </button>
              <button className="inline-block bg-white text-white px-3 py-3 rounded-full hover:bg-gray-200">
                <PeopleAltIcon color='primary' />
              </button>
            </div>
      </div>
    </section>
  )
}
