import React from 'react';
import { Header } from './components/header/Header';
import { Footer } from './components/footer/Footer';
import { Outlet } from 'react-router-dom';
// @ts-ignore
import { AlertProvider, Alert } from 'meteor/quave:alert-react-tailwind';

export const App = () => (
        <div className="flex flex-col w-full h-full dark:bg-slate-900">
           <AlertProvider>
      <Alert />
          <Header />
          <div className="grow">
            <Outlet />
          </div>
          <Footer/>
           </AlertProvider>
        </div>
      );
