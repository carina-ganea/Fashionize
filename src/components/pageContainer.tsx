import React, { useContext } from 'react';
import ThemeContext from '../hooks/themeContext';

const PageContainer: React.FC = ({children}) => {
    const theme = useContext(ThemeContext);
    
    return (
        <div className="container-flex">
        <div className="row align-items-start" style={{backgroundColor: theme.background}}>
            <div className='col-1' />
            {children}
        </div>
        </div>
    );
}

export default PageContainer; 