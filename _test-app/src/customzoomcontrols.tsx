// src/components/CustomZoomControls.tsx

import React from 'react';
import { twMerge } from 'tailwind-merge';
import {useMap} from "../../src";

interface CustomZoomControlsProps {
    className?: string;
}

const CustomZoomControls: React.FC<CustomZoomControlsProps> = ({ className }) => {
    const { zoomIn, zoomOut, resetZoom } = useMap();

    return (
        <div className={twMerge('flex space-x-2', className)}>
            <button
                onClick={zoomIn}
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                aria-label="Zoom In"
            >
                +
            </button>
            <button
                onClick={zoomOut}
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                aria-label="Zoom Out"
            >
                -
            </button>
            <button
                onClick={resetZoom}
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                aria-label="Reset Zoom"
            >
                Reset
            </button>
        </div>
    );
};

export default CustomZoomControls;
