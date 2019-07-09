import React from 'react'
import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom'

import loadable from '@loadable/component'

import Home from 'page/Home'
import Page1 from 'page/Page1'
// Page2 是按需加载的
const Page2 = loadable(() => import('page/Page2'), {
    fallback: <div>加载中...</div>
})

const getRouter = () => (
    <Router>
        <div>
            <ul>
                <li><NavLink to='/' exact activeStyle={{ color: 'red' }}>首页</NavLink></li>
                <li><NavLink to='/page1' activeStyle={{ color: 'red' }}>Page1</NavLink></li>
                <li><NavLink to='/page2' activeStyle={{ color: 'red' }}>Page2</NavLink></li>
            </ul>

            <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/page1' component={Page1} />
                <Route path='/page2' component={Page2} />
            </Switch>
        </div>
    </Router>
)

export default getRouter
