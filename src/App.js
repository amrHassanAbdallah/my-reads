import React, {Component} from 'react';

// import * as BooksAPI from './BooksAPI'
import './App.css'

import {
    BrowserRouter as Router,
    Route,
    Link,
} from 'react-router-dom';
import Search from "./Search";
import Home from "./Home";


const routes = [
    {
        path: "/",
        component: Home,
        routes: [
            {
                path: "/search",
                component: Search
            },
        ]
    }
];



class BooksApp extends React.Component {
    render() {
        return (
            <Router>
                <div className="app">

                    <Route exact path='/' component={Home}></Route>
                    <Route exact path='/search' component={Search}></Route>
                </div>

            </Router>
        )
    }
}

export default BooksApp
