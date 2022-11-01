import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
// eslint-disable-next-line import/no-unresolved
import { ErrorAlert } from '../../components/alerts/ErrorAlert';
// eslint-disable-next-line import/no-unresolved
import { SuccessAlert } from '../../components/alerts/SuccessAlert';

import AOS from 'aos';
import 'aos/dist/aos.css';

export const ContactForm = () => {
 const [name, setName] = useState(''); // Formik
 const [imageUrl, setImageUrl] = useState('');
  const [email, setEmail] = useState('');
  const [walletId, setWalletId] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

 // eslint-disable-next-line no-shadow
 const showError = ({ message }) => {
   setError(message);
   setTimeout(() => {
     setError('');
   }, 5000);
 };

 // eslint-disable-next-line no-shadow
 const showSuccess = ({ message }) => {
  setSuccess(message);
  setTimeout(() => {
    setSuccess('');
  }, 5000);
};


const saveContact = () => {
  Meteor.call('contacts.insert', { walletId,  name, email, imageUrl }, (errorResponse) => {
    if (errorResponse) {
      showError({ message: errorResponse.error });
    } else {
      setName('');
      setEmail('');
         setImageUrl('');
         setWalletId('');
      showSuccess({ message: 'Contact saved.' });
    }
  });
};


  useEffect(() => {
    AOS.init({
      delay: 200,
      duration: 1200,
      once: false,
    // @ts-ignore
    }, []);
   });

  return (
    <>
    <section id="contact" className="pt-10 pb-36 px-8 bg-white dark:bg-slate-800 rounded-lg py-8 ring-1 ring-slate-900/5 shadow-xl">
    <div className="max-w-6xl mx-auto">
    <h2 className="text-4xl font-bold text-center mt-20" data-aos="fade-left">
    Contact Us
    </h2>

    <div className="relative py-4">

    <div className="absolute inset-0 flex items-center" aria-hidden="true">
      <div className="w-full border-t border-gray-100" data-aos="fade-up"/>
    </div>
    </div>
    </div>
    <div className="relative max-w-4xl mx-auto">

        <div className="relative z-20 bg-white dark:bg-slate-800 rounded p-8">
            <form action="" data-aos="fade-up">
            {error && <ErrorAlert message={error} />}
            {success && <SuccessAlert message={success} />}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <input
                    type="text"

                      // eslint-disable-next-line react/jsx-props-no-multi-spaces
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Full Name"
                      autoComplete="name"
                    className="bg-white dark:bg-slate-800 shadow-md border border-gray-200 outline-none px-4 py-2 rounded-md hover:border-gray-400 focus:border-gray-400"/>

                    <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="bg-white dark:bg-slate-800 shadow-md border border-gray-200 outline-none px-4 py-2 rounded-md hover:border-gray-400 focus:border-gray-400"/>
                    
                    <input
                    type="url"
                    id="imageUrl"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Image Url"
                    className="bg-white dark:bg-slate-800 shadow-md border border-gray-200 outline-none px-4 py-2 rounded-md hover:border-gray-400 focus:border-gray-400 md:col-span-2"
                    />
 <input
                    type="walletId"
                    id="walletId"
                    value={walletId}
                    onChange={(e) => setWalletId(e.target.value)}
                    placeholder="walletId"
                    className="bg-white dark:bg-slate-800 shadow-md border border-gray-200 outline-none px-4 py-2 rounded-md hover:border-gray-400 focus:border-gray-400 md:col-span-2"
                    />
                    
                </div>
                <button
                  onClick={saveContact}
                  className="p-3 px-6 pt-2 mt-3 text-white bg-cyan-500 rounded baseline hover:bg-cyan-400"
                >
               <span>Contact Save</span>
                </button>
            </form>
        </div>
    </div>
    </section>
    </>
  );
};
