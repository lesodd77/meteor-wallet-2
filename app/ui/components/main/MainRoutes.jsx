import React from 'react';
import {BrowserRouter, Routes as ReactRoutes, Route} from 'react-router-dom';
import {App} from '../../App'
import {RoutePaths} from './RoutePaths';
import {Home} from '../../pages/home/Home';
import {NotFound} from '../../pages/notFound/NotFound';
import {About} from '../../pages/about/About';
import {ContactForm} from '../../pages/contact/ContactForm';
import {ContactList} from '../../pages/contact/ContactList';
import { Wallet } from '../../pages/wallet/Wallet';

export const MainRoutes = () => {
    return (<>
            <BrowserRouter>

                <ReactRoutes>
                    <Route path={RoutePaths.ROOT} element={<App/>}>
                        <Route element={<Home/>} index/>
                        <Route element={<Wallet/>} path={RoutePaths.WALLET}/>
                        <Route element={<ContactList/>} path={RoutePaths.CONTACTLIST}/>
                        <Route element={<About/>} path={RoutePaths.ABOUT}/>
                        <Route element={<ContactForm/>} path={RoutePaths.CONTACTFORM}/>
                        <Route path="*" element={<NotFound/>}/>
                    </Route>
                </ReactRoutes>

            </BrowserRouter>
        </>
    );
}