// @ts-nocheck
/* eslint-disable no-shadow */
/* eslint-disable import/no-unresolved */
import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { useAlert } from 'meteor/quave:alert-react-tailwind';
import { RoutePaths } from '../components/main/RoutePaths';
import { useNavigate } from 'react-router-dom';
import { ErrorAlert } from '../components/alerts/ErrorAlert';

export const RemoveTransaction = () => {
const { openAlert } = useAlert();
  const navigate = useNavigate();
  const [transactionId, setTransactionId] = useState('');
  const [error, setError] = useState();


    const removeTransaction = (e) => {
        e.preventDefault();
        Meteor.call('transactions.remove', transactionId,
        (error) => {
            if (error) {
                console.error('Error try to to remove a transaction', error);
               setError(error);
               return;
            }
           setTransactionId('');
           setError(null);
           openAlert('The transaction removed!');
        });
    };

    return (
        <>
        <div className="flex flex-col items-center">
        <h3 className=" rounded-full px-3 py-2 text-lg font-medium">
           Remove Transaction
        </h3>
        {error && <ErrorAlert message={error.reason || 'Unknown error'} />}
            <form action="" className="mt-5 flex flex-col">

            <div>
      <label htmlFor="transactionId" className="block text-sm font-medium text-gray-700">
        Transaction ID
      </label>
      <div className="mt-1 border-b border-gray-300 focus-within:border-indigo-600">
        <input
          id="transactionId"
          value={transactionId}
        onChange={e => setTransactionId(e.target.value)}
          className="block w-full border-0 border-b border-transparent bg-gray-50 focus:border-indigo-600 focus:ring-0 sm:text-sm"
        />
      </div>
            </div>
       <button
onClick={() => navigate(RoutePaths.HOME)}
        className=" py-2 px-3 font-serif font-medium text-[18px] text-white bg-slate-900 rounded-[10px] outline-none hover:text-white hover:bg-opacity-40 transition ease-in-out duration-150"
>
    Back to Home
       </button>
            <button
                onClick={removeTransaction}
                 type="submit"
                 className=" py-2 px-3 font-serif font-medium text-[18px] text-white  bg-cyan-600 rounded-[10px] outline-none hover:text-white hover:bg-opacity-40 transition ease-in-out duration-150">
             Remove
            </button>

            </form>
        </div>
        </>
    );
};
