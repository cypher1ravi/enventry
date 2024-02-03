// App.js
import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AddProduct from './components/AddProduct';
import Issueed from './components/IssueItem';
import Layout from './components/Layout';
import ShowItem from './components/ShowItem';
import IssuedItems from './components/IssuedItemList';
import ChangePassword from './components/ChangePassword';
import PrivateRoute from './PrivateRoute'; // Import the PrivateRoute component
import { AuthProvider } from './AuthContext'; // Import the AuthProvider


function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />

          <Route element={<PrivateRoute />}>
            <Route path='/layout' element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="additem" element={<AddProduct />} />
              <Route path="showitem" element={<ShowItem />} />
              <Route path="issueItem" element={<Issueed />} />
              <Route path="showIssuedItem" element={<IssuedItems />} />
              <Route path="changePassword" element={<ChangePassword />} />

            </Route >
          </Route>
        </Routes>
      </div>
    </AuthProvider >
  );
}

export default App;
