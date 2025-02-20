import React, { useContext } from 'react';
import { AuthContext } from '../Context Provider/AuthProvider';



const useAuthProvider = () => {
 return useContext(AuthContext)

};

export default useAuthProvider;