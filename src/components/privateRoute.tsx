import { Route, Navigate } from 'react-router'; 
import { useSelector } from 'react-redux';
import { isAuthenticatedSelector } from '../store/user.slice';

export default function PrivateRoute ({children, ...rest} : any) {
    const isAuthenticated = useSelector(isAuthenticatedSelector);

    return (
                isAuthenticated ? (
                    children
                ) : (
                    <Navigate 
                    to={{
                        pathname:"/login",
                    }}
                    />
                )
            
    );
}