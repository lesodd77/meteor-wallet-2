/* eslint-disable import/no-unresolved */
// @ts-nocheck
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Meteor } from 'meteor/meteor';
import { MainRoutes } from '../app/ui/components/main/MainRoutes';
import { Loading } from '../app/ui/components/spinner/Loading';
import { Cloudinary } from 'meteor/socialize:cloudinary';

const { settings } = Meteor;
Cloudinary.config({
  cloud_name: settings.public.cloudinary_cloud_name,
  api_key: settings.public.cloudinary_api_key,
});


Meteor.startup(() => {
  const root = ReactDOM.createRoot(document.getElementById('react-target'));
  root.render(
    <Suspense fallback={<Loading />}>
    <MainRoutes/>
    </Suspense>

);
});
