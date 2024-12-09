// src/components/ZoomControls.tsx

import React from 'react';
import {twMerge} from 'tailwind-merge';

interface ZoomControlsProps {
    zoomIn: () => void;
    zoomOut: () => void;
    resetTransform: () => void;
}

const ZoomControls: React.FC<ZoomControlsProps> = ({zoomIn, zoomOut, resetTransform}) => {

    return (
        <div className="absolute top-4 right-4 flex flex-col space-y-2 z-50">
            <button
                onClick={() => zoomIn()}
                className={twMerge(
                    'bg-white bg-opacity-75 hover:bg-opacity-100 text-gray-800 font-bold py-2 px-4 rounded shadow'
                )}
            >
                +
            </button>
            <button
                onClick={() => zoomOut()}
                className={twMerge(
                    'bg-white bg-opacity-75 hover:bg-opacity-100 text-gray-800 font-bold py-2 px-4 rounded shadow'
                )}
            >
                -
            </button>
            <button
                onClick={() => resetTransform()}
                className={twMerge(
                    'bg-white bg-opacity-75 hover:bg-opacity-100 text-gray-800 font-bold py-2 px-4 rounded shadow'
                )}
            >
                Reset
            </button>
        </div>
    );
};

export default ZoomControls;
