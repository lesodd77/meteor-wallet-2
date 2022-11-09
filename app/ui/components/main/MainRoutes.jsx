/* eslint-disable import/no-unresolved */
import React from 'react';
import { BrowserRouter, Routes as ReactRoutes, Route } from 'react-router-dom';
import { App } from '../../App';
import { RoutePaths } from './RoutePaths';
import { Home } from '../../pages/home/Home';
import { NotFound } from '../../pages/notFound/NotFound';
import { About } from '../../pages/about/About';
import { PostForm } from '../../pages/post/PostForm';
import { PostList } from '../../pages/post/PostList';
import { ContactForm } from '../../pages/contact/ContactForm';
import { ContactList } from '../../pages/contact/ContactList';
import { Wallet } from '../../pages/wallet/Wallet';
import { Access } from '../../auth/Access';
import { LoggedUserOnly } from '../../auth/LoggedUserOnly';
import { AnonymousOnly } from '../../auth/AnonymousOnly';
import { RemoveTransaction } from '../../auth/RemoveTransaction';
import { AdminOnly } from '../admin/AdminOnly';


export const MainRoutes = () => (<>
            <BrowserRouter>
                <ReactRoutes>
                    <Route path={RoutePaths.ROOT} element={<App/>}>
                        <Route
                         element={
                        <LoggedUserOnly>
                            <Home/>
                        </LoggedUserOnly>
                           }
                        path={RoutePaths.HOME}
                            />
                              <Route
                         element={
                            <AdminOnly>
                              <RemoveTransaction/>
                            </AdminOnly>
                           }
                        path={RoutePaths.REMOVE_TRANSACTION}
                            />
                        <Route
                         element={
                            <AnonymousOnly>
                         <Access/>
                            </AnonymousOnly>
                        }
                         path={RoutePaths.ACCESS}
                         />
                        <Route
                        element={

                        <Wallet/>

                        }
                        path={RoutePaths.WALLET}
                        />
                      <Route
                        element={

                        <PostForm/>

                        }
                        path={RoutePaths.POSTFORM}
                        />
                         <Route
                        element={

                        <PostList/>

                        }
                        path={RoutePaths.POSTLIST}
                        />
                        <Route
                        element={
                        <LoggedUserOnly>
                         <ContactList/>
                        </LoggedUserOnly>
                        }
                       path={RoutePaths.CONTACTLIST}
                        />
                        <Route
                        element={

                           <About/>

                        }
                        path={RoutePaths.ABOUT}
                        />
                        <Route
                        element={

                           <ContactForm/>

                        }
                       path={RoutePaths.CONTACTFORM}
                        />
                        <Route path="*" element={<NotFound/>}/>
                    </Route>
                </ReactRoutes>


            </BrowserRouter>
                                 </>
    );
