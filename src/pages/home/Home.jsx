import React from 'react';
import Banner from './banner';
import Featured from './Featured';
import Contact from './Contact';

const Home = () => {
    return (
        <div className=''>
            <Banner/>
            <Featured/>
            <Contact/>
        </div>
    );
};

export default Home;