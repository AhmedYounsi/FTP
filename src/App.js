import React, { Component, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Router, Route, Switch, useHistory } from 'react-router-dom'
import './scss/style.scss'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

const App = () => {
  
  const history = useHistory()
  const TokenReducer = useSelector((state) => state.TokenReducer)
  
  useEffect(() => {
    if (!TokenReducer) history.push('/login')
    else history.push('/file_manager')
   
  }, [TokenReducer])
  
  return (
    <React.Suspense fallback={loading}>
      {TokenReducer ? (
        <DefaultLayout />
      ) : (
        <Switch>
          <Route path="/login" name={'login'}>
            <Login />
          </Route>
        </Switch>
      )}
    </React.Suspense>
  )
}

export default App
