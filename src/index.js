import React from 'react'
import ReactDOM from 'react-dom'
import getRouter from 'route/route'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import store from 'state/store'

// 当模块更新的时候，通知index.js
if (module.hot) {
    module.hot.accept()
}

ReactDOM.render(
    <AppContainer>
        <Provider store={store}>
            { getRouter() }
        </Provider>
    </AppContainer>,
    document.getElementById('app')
)
