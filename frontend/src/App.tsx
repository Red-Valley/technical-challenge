// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Import the pages
import Home from './pages/home/home.page';
import About from './pages/about/about.page';
import UserCreation from './pages/userCreation/userCreation.component';
import UsersTable from './pages/userCreation/usersTable.component';
import ProvidersTable from './pages/userCreation/providersTable.component';
import StatusesTable from './pages/userCreation/statusesTable.component';

const App = () => {
    return (
        <Router>
            <div>
                <nav>
                    <ul style={{ display: 'flex', listStyleType: 'none', gap: '1rem' }}>
                        <li>
                            <Link to='/'>Home</Link>
                        </li>
                        <li>
                            <Link to='/about'>About</Link>
                        </li>
                        <li>
                            <Link to='/user-creation'>User Creation</Link>
                        </li>
                    </ul>
                </nav>

                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/about' element={<About />} />
                    <Route
                        path='/user-creation'
                        element={
                            <>
                                <UserCreation />
                                <UsersTable />
                                <ProvidersTable />
                                <StatusesTable />
                            </>
                        }
                    />
                    <Route path='*' element={<h2>404: Page Not Found</h2>} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
