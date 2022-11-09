// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { Navigate, useLocation } from 'react-router-dom';
import { Loading } from '../spinner/Loading';
import { RoutePaths } from '../main/RoutePaths';

export const AdminOnly = ({ children }) => {
 const [isAdmin, setIsAdmin] = useState();
 const location = useLocation();

 useEffect(() => {
 Meteor.call('roles.isAdmin', (error, isAdminReturn) => {
    if (error) {
        setIsAdmin(false);
        return;
    }
    setIsAdmin(isAdminReturn);
 });
 }, []);
      if (isAdmin == null) {
        return <Loading />;
      }
 if (!isAdmin) {
return (
<Navigate to={RoutePaths.HOME} state={{ from: location }} replace />

 );
}
return children;
};
