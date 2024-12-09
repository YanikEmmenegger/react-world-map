// src/components/Tooltip.tsx

import React from 'react';
import {TooltipData} from '../types';

interface TooltipProps {
    tooltipData: TooltipData;
}

/**
 * Tooltip component that displays information about a country.
 */
const Tooltip: React.FC<TooltipProps> = ({ tooltipData }) => {
    const { x, y, content } = tooltipData;

    return (
        <div
            style={{
                top: y-40,
                left: x-40,
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
