// src/components/continents/CountryComponent.tsx
import React, { useMemo, useState } from 'react';
import { Country } from '../../types';
import useMap from '../../hooks/useMap';
import { twMerge } from 'tailwind-merge';

interface CountryProps {
    country: Country;
}

const CountryComponent: React.FC<CountryProps> = ({ country }) => {
    const {
        changeFillColor,
        toggleFlagBackground,
        setCustomClass,
        removeCustomClass,
        fillColors,
        continentFillColors,
        defaultFillColor,
        customClasses,
        flagBackgrounds,
        tooltipConfig,
        setTooltip,
        onCountryClick,
        onCountryHover,
        showFlagOnHover
    } = useMap();

    const [isFlagOnHover, setIsFlagOnHover] = useState<boolean>(false);

    // Compute baseShowFlag based on hierarchy: country > continent > default
    const baseShowFlag = useMemo(() => {
        if (flagBackgrounds[country.code] !== undefined) {
            return flagBackgrounds[country.code];
        } else {
            return false;
        }
    }, [flagBackgrounds, country.code]);

    // Determine fill color based on hierarchy: country > continent > default
    const fillColor = useMemo<string>(() => {
        if (fillColors[country.code]) {
            return fillColors[country.code];
        } else if (continentFillColors[country.continent]) {
            return continentFillColors[country.continent];
        } else {
            return defaultFillColor;
        }
    }, [fillColors, continentFillColors, country.code, country.continent, defaultFillColor]);

    // Compute classes based on hierarchy: default < continent < country
    const defaultClassName = ''; // Define default if needed
    const continentClassName = ''; // Define continent-specific classes if needed
    const countryClassName = customClasses[country.code] || '';

    // Compute final className using twMerge, order: default, continent, country
    const classNames = twMerge(
        "stroke-[0.1] hover:stroke-white stroke-black",
        'transition-all duration-600',
        'focus:outline-none focus:ring-2 focus:ring-blue-500',
        defaultClassName,
        continentClassName,
        countryClassName
    );

    // Compute final showFlag based on base and hover
    const showFlag = baseShowFlag || isFlagOnHover;

    /**
     * Handler for country click
     */
    const handleCountryClick = (event: React.MouseEvent<SVGPathElement, MouseEvent>) => {
        event.stopPropagation(); // Prevent triggering parent onClick
        if (onCountryClick) {
            onCountryClick(country);
        }
    };

    /**
     * Handler for country hover (mouse enter)
     */
    const handleCountryMouseEnter = (event: React.MouseEvent<SVGPathElement, MouseEvent>) => {
        if (onCountryHover) {
            onCountryHover(country, event);
        }

        if (showFlagOnHover) {
            setIsFlagOnHover(true);
        }

        // Set tooltip data
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
     * Handler for country hover leave (mouse leave)
     */
    const handleCountryMouseLeave = () => {
        if (showFlagOnHover) {
            setIsFlagOnHover(false);
        }

        // Clear tooltip
        if (tooltipConfig.enabled) {
            setTooltip(null);
        }
    };

    return (
        <>
            {/* Define the flag background pattern if toggled */}
            {showFlag && (
                <defs>
                    <pattern
                        id={`${country.code}-bg-img`}
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
            )}

            <path
                d={country.svgPath}
                fill={showFlag ? `url(#${country.code}-bg-img)` : fillColor}
                className={classNames}
                onClick={handleCountryClick}
                onMouseEnter={handleCountryMouseEnter}
                onMouseLeave={handleCountryMouseLeave}
                onBlur={handleCountryMouseLeave}
                tabIndex={0} // Makes the element focusable
                aria-label={`Country: ${country.commonName}`}
                role="button" // ARIA role
                data-code={country.code}
                style={{ cursor: 'pointer' }}
            />
        </>
    );
};

export default React.memo(CountryComponent);
