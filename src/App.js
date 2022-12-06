
import './App.css';
import React from 'react';
import Navbar from './Navbar';
import Body from './Body';
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import CreateExercise from './CreateExercise';
import UpdateExercise from './UpdateExercise';
import PrivateScreen from './PrivateScreen';
import Auth_form from './Auth_form';
import Register from './Register';
import Forgotpassword from './Forgotpassword';
import Resetpassword from './Resetpassword';
import PrivateRoute from './routing/PrivateRoute';


function App() {
  return (

   <div className = "App">
            
           
          
            <Routes>
                
                <Route exact path = '/exercises' element = {<PrivateScreen/>}></Route>
               
               
                <Route exact path = '/login' element = {<Auth_form/>}></Route>
                <Route exact path = '/' element = {<Auth_form/>}></Route>
                <Route exact path = '/register' element = {<Register/>}></Route>
                <Route exact path = '/forgotpassword' element = {<Forgotpassword/>}></Route>
                <Route exact path = '/resetpassword/:resetToken' element = {<Resetpassword/>}></Route>
                 
                <Route path = '/exercises/CreateExercise' element = {<CreateExercise/>}></Route>
                <Route path = '/exercises/UpdateExercise' element = {<UpdateExercise/>}></Route>
  
                
                
            </Routes>
        
          
    
   </div>
  );
}

export default App;
