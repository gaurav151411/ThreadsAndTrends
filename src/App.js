import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Navbar from './Components/Navbar';
import Carousel from './Components/Carousel';
import FashionAssistant from './Components/FashionAssistant';
import Stylist from './Components/Stylist';
import TypingEffect from './Components/AutoTyping';

function App() {
  const strings = [
    "Elevate Your Style with AI Powered Suggestions",
  ];
  return (
   <BrowserRouter>
       <Navbar />
      <Routes style={{display:"flex"}}>
        <Route path="/" element={
          <>
           <TypingEffect/>
            <Carousel/>
          
            <Stylist/>
          </>
        }/>
        <Route path="/bot" element={
          <>

            <FashionAssistant/>
          </>
          
        }/>
       
          
  
        
      
      </Routes>
   </BrowserRouter>
  );
}

export default App;
