import React from 'react'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Onepost from './components/Onepost';
import PublicPosts from './components/PublicPosts';
import Sidebar from './components/Sidebar';
import Register from './components/Register';
import Upload from './components/Upload';
import PostState from './Context/posts/PostState';


const App = () => {
  return (
    <div> 
     <PostState>
    <Router>
      <Switch>
        <Route exact path='/'>
               <Login/>
        </Route>
        <Route exact path='/Register'>
               <Register/>
        </Route>
        <Route exact path='/mypost'>
               <Home/>
        </Route>
        <Route exact path='/Upload'>
               <Upload/>
        </Route>
        <Route exact path='/publicpost'>
              <PublicPosts/>
        </Route>
        <Route exact path='/singlepost'>
              <Onepost/>
        </Route>
        <Route exact path='/sidebar'>
              <Sidebar/>
        </Route>
      </Switch>
       
    </Router>
    </PostState>
    </div>
 

  )
}

export default App