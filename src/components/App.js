import React, { useEffect, useState } from "react";
import {BrowserRouter as Router, Navigate} from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import {getPosts} from '../api';
import { Home } from "../pages";
import { Login, Page404, SignUp, Settings, UserProfile } from "../pages";
import { useAuth } from '../hooks';

import {Loader} from "./";
import {Navbar} from "./";

// const PrivateRoute = ({children}) => {
//   const auth=useAuth();

//   return auth.user ? {children} : <Login />
// }

function App() {

  const auth = useAuth();

  console.log(auth.user);

  if(auth.loading){
    return <Loader />;
  }

  return (
    <div className="App">
     <Router>
      <Navbar />
      <Routes>
          <Route path='/' element={<Home posts={[]} />} />

          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<SignUp />} />

          <Route path='/settings' element={ auth.user ? <Settings /> : <Navigate to='/login' />} />

          <Route path='/user/:userId' element={auth.user ? <UserProfile /> : <Navigate to='/login' />} />
          
          <Route path='/user/:userId' element={<UserProfile />} />
          <Route path="*" element={<Page404 />} />
      </Routes>
     </Router>
    </div>
  );
}

export default App;


