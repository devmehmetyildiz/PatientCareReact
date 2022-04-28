import React from 'react'
import Cookies from 'universal-cookie';
import jwtDecode from 'jwt-decode';

 function TokenDecoder() {
    const cookies = new Cookies();
    
    
    let token = cookies.get('X-Access-Token')
  
    let decodedToken = jwtDecode(token);
    console.log('decodedToken: ', decodedToken);
    let currentDate = new Date();
    console.log('currentDate: ', currentDate);
  
    // JWT exp is in seconds
    if (decodedToken.exp * 1000 < currentDate.getTime()) {
       
      console.log("Token expired.");
    } else {
      console.log("Valid token");   
      console.log('currentDate.getTime(): ', currentDate.getTime());
    }
}

export default TokenDecoder
