import axios from '../api/axios';
import useAuth from './useAuth';
import { useNavigate } from 'react-router-dom';

const useLogout = () => {
    const { setAuth } = useAuth();
    const navigate = useNavigate();  // Add navigate to redirect the user after logout

    const logout = async () => {
        setAuth({});
        
        // Clear localStorage or sessionStorage (if you are using them)
        localStorage.removeItem('persist');
        localStorage.removeItem('userData');
        localStorage.removeItem('userRoles');
        localStorage.removeItem('accessToken'); 
        
        try {
            // Make a request to the logout endpoint on the server
            const response = await axios('/logout', {
                withCredentials: true,
                
        'Cache-Control': 'no-cache','Pragma': 'no-cache',  // Ensure you're sending cookies if needed
            });

            // After successful logout, navigate to the login page or home page
            navigate('/', { replace: true });
        } catch (err) {
            // Log the error to the console for better debugging
            console.error('Error during logout:', err);
        }
    };

    return logout;
};

export default useLogout;
