import React from 'react'
import { Switch, Route } from 'react-router-dom';
import {UsersApp} from './pages/UsersApp';
import {Nav} from './cmps/Nav.jsx';

function App() {
    return (
        <div>
            <Nav />
            <Switch>
                <Route component={UsersApp} path='/' />
            </Switch>
        </div>
    )
}
export default App
