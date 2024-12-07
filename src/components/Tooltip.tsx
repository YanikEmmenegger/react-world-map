// src/components/Tooltip.tsx
import React from 'react';
import { TooltipData } from "../types";

interface TooltipProps {
    tooltipData: TooltipData;
}

const Tooltip: React.FC<TooltipProps> = ({ tooltipData }) => {
    const { x, y, content } = tooltipData;

    return (
        <div
            className="absolute pointer-events-none bg-black bg-opacity-75 text-white text-sm px-2 py-1 rounded shadow-lg"
            style={{
                top: y,
                left: x,
                transform: 'translate(-50%, -100%)',
                whiteSpace: 'nowrap',
                zIndex: 1000,
                position: 'fixed',
            }}
        >
            {content}
        </div>
    );
};

export default Tooltip;
