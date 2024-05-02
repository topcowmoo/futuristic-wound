import React from 'react';

const Closet = () => {
    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen py-2">

            <button className="absolute top-36 right-4 px-4 py-2 bg-blue-300 text-white rounded-md hover:bg-blue-500">Change Monster</button>
            <div className="flex flex-col items-end space-y-8 mt-20">
                <div className="flex flex-col space-y-4">
                    <button className="px-6 py-3 text-lg bg-blue-300 text-white rounded-md hover:bg-blue-500">Change Username</button>
                    <button className="px-6 py-3 text-lg bg-blue-300 text-white rounded-md hover:bg-blue-500">Change Password</button>
                </div>
            </div>
        </div>
    );
}

export default Closet;