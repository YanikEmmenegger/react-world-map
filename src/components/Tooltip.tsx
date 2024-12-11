import React from 'react';
import {TooltipData} from '../types';

interface TooltipProps {
    tooltipData: TooltipData;
}

/**
 * Tooltip component:
 * Displays a tooltip at a given position (x, y) with provided content.
 */
const Tooltip: React.FC<TooltipProps> = ({ tooltipData }) => {
    const { x, y, content } = tooltipData;

    // Tooltip positioning logic ensures it appears above and centered relative to the mouse.
    return (
        <div
            style={{
                top: y - 40,
                left: x - 40,
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
