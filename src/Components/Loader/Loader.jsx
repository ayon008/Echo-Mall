import React from 'react';

const Loader = () => {
    return (
        <div className='h-full w-full'>
            <div className='m-auto'>
                <div className='bg-white text-black p-4'>
                    loading...
                </div>
            </div>
        </div>
    );
};

export default Loader;