import React from 'react';
import { NavLink } from 'react-router';

const MyLink = ({to, className, children}) => {
    return (
        <NavLink to={to} className={({isActive})=> isActive ? "text-red-500 border" : `${className} hover:text-red-500`}>
            {children}
        </NavLink>
    );
};

export default MyLink;