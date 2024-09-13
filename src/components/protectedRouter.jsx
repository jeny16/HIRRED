import { useUser } from '@clerk/clerk-react'
import React from 'react'
import { useLocation } from 'react-router-dom';

const protectedRouter = ({ children }) => {
    
    const {isSignedIn,user,isLoaded} = useUser();
    const {pathname} = useLocation();

    if(isLoaded && !isSignedIn && isSignedIn !== undefined){
      return <Navigate to='/?sign-in=true' />
    }

    return children;
    <div></div>
  
}

export default protectedRouter  