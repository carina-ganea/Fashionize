import React, { useContext } from 'react';

const ContentContainer: React.FC = ({ children }) => {

    return (
        <div className="col-md-8" style={{padding: '5vh', minHeight: '100vh', position:'relative'}}>
            {children}
        </div>
    )
}

export default ContentContainer;