import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './login/Login';
import Home from './home/Home';
import Playlist from './playlist/Playlist';
// import NotFound from './NotFound';
const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/home/:userId" component={Home} />
            <Route exact path="/home/:userId/:playlistId" component={Playlist} />
            {/* <Route component={NotFound} /> */}
        </Switch>
    </BrowserRouter>
);

export default Router;