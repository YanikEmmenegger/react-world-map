// src/components/world/ZoomControls.tsx
import React, { FC, useState } from "react";

interface ZoomControlsProps {
    zoomIn: () => void;
    zoomOut: () => void;
    resetTransform: () => void;
}

const ZoomControls: FC<ZoomControlsProps> = ({ zoomIn, zoomOut, resetTransform }) => {
    const [showControls, setShowControls] = useState(false);

    return (
        <div className="absolute left-0 top-0 z-50 p-4">
            {!showControls ? (
                <button
                    onClick={() => setShowControls(true)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
                >
                    Controls
                </button>
            ) : (
                <div className="flex flex-col space-y-2 p-2 bg-white bg-opacity-75 rounded shadow-lg">
                    <button
                        onClick={zoomIn}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
                    >
                        Zoom In
                    </button>
                    <button
                        onClick={zoomOut}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
                    >
                        Zoom Out
                    </button>
                    <button
                        onClick={resetTransform}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
                    >
                        Reset
                    </button>
                    <button
                        onClick={() => setShowControls(false)}
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none"
                    >
                        Close
                    </button>
                </div>
            )}
        </div>
    );
};

export default ZoomControls;
