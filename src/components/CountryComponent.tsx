// src/components/CountryComponent.tsx

import React, {useMemo, useState} from 'react';
import {Country} from '../types';
import useMap from '../hooks/useMap';
import {twMerge} from 'tailwind-merge';

interface CountryProps {
    country: Country;
}

/**
 * Country component that renders an individual country on the SVG map.
 */
const CountryComponent: React.FC<CountryProps> = ({country}) => {
    const {
        fillColors,
        fillType,
        onClickHandlers,
        flagOnHover,
        cssClasses,
        setTooltip,
        tooltipConfig,
        defaultFillColor,
        defaultFillType,
        defaultOnClickHandler,
        defaultFlagOnHover,
        defaultCssClass,
    } = useMap();

    const [isFlagOnHover, setIsFlagOnHover] = useState<boolean>(false);

    /**
     * Determine the fill color or flag based on fillType
     */
    const currentFill = useMemo<string>(() => {
        const type = fillType[country.code] || defaultFillType;
        if (type === 'flag') {
            return `url(#${country.code}-flag)`;
        }
        return fillColors[country.code] || defaultFillColor;
    }, [fillColors, fillType, country.code, defaultFillType, defaultFillColor]);

    /**
     * Determine if flag should be shown on hover
     */
    const showFlagOnHover = useMemo<boolean>(() => {
        return flagOnHover[country.code] !== undefined ? flagOnHover[country.code] : defaultFlagOnHover;
    }, [flagOnHover, country.code, defaultFlagOnHover]);

    /**
     * Handle mouse enter event
     */
    const handleMouseEnter = (event: React.MouseEvent<SVGPathElement, MouseEvent>) => {
        event.preventDefault();
        event.stopPropagation();
        if (showFlagOnHover) {
            setIsFlagOnHover(true);
        }

        if (tooltipConfig.enabled) {
            const tooltipContent = tooltipConfig.renderContent(country);
            setTooltip({
                x: event.clientX,
                y: event.clientY,
                content: tooltipContent,
            });
        }
    };

    /**
     * Handle mouse leave event
     */
    const handleMouseLeave = (event: React.MouseEvent<SVGPathElement, MouseEvent>) => {
        event.preventDefault();
        event.stopPropagation();
        if (showFlagOnHover) {
            setIsFlagOnHover(false);
        }

        if (tooltipConfig.enabled) {
            setTooltip(null);
        }
    };

    /**
     * Handle click event
     */
    const handleClick = (event: React.MouseEvent<SVGPathElement, MouseEvent>) => {
        event.preventDefault();
        event.stopPropagation();
        const handler = onClickHandlers[country.code] || defaultOnClickHandler;
        if (handler) {
            handler(country);
        }
    };

    /**
     * Determine the final fill to display
     */
    const finalFill = useMemo<string>(() => {
        if (isFlagOnHover) {
            return `url(#${country.code}-flag)`;
        }
        return currentFill;
    }, [isFlagOnHover, currentFill, country.code]);

    /**
     * Define the flag pattern if fillType is 'flag' or flag on hover is enabled
     */
    const flagPattern = useMemo(() => {
        const type = fillType[country.code] || defaultFillType;
        const shouldDisplayFlag = type === 'flag' || showFlagOnHover;
        if (shouldDisplayFlag) {
            return (
                <defs>
                    <pattern
                        id={`${country.code}-flag`}
                        patternUnits="objectBoundingBox"
                        width="1"
                        height="1"
                        patternContentUnits="objectBoundingBox"
                    >
                        <image
                            href={country.flagUrl}
                            x="0"
                            y="0"
                            width="1"
                            height="1"
                            preserveAspectRatio="none"
                        />
                    </pattern>
                </defs>
            );
        }
        return null;
    }, [fillType, country.code, country.flagUrl, showFlagOnHover, defaultFillType]);

    /**
     * Determine CSS class
     */
    const cssClass = useMemo<string>(() => {
        const countryClass = cssClasses[country.code] || '';
        return twMerge(
            'stroke-[0.1] hover:stroke-white stroke-black',
            'transition-all duration-300',
            'focus:outline-none focus:ring-2 focus:ring-blue-500',
            'cursor-pointer',
            defaultCssClass,
            countryClass
        );
    }, [cssClasses, country.code, defaultCssClass]);

    return (
        <>
            {flagPattern}
            <path
                d={country.svgPath}
                fill={finalFill}
                className={cssClass}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleClick}
                tabIndex={0} // Makes the element focusable
                aria-label={`Country: ${country.commonName}`}
                data-code={country.code}
                role="button" // ARIA role for accessibility
            />
        </>
    );
};

export default React.memo(CountryComponent);
