import React, {useMemo, useState} from 'react';
import {Country} from '../types';
import useMap from '../hooks/useMap';
import {twMerge} from 'tailwind-merge';

interface CountryProps {
    country: Country;
}

/**
 * CountryComponent:
 * Renders an SVG path representing a specific country.
 * Provides interactivity such as hover (tooltip, flag change) and click events.
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

    // Local state to track when the country's flag should be shown on hover.
    const [isFlagOnHover, setIsFlagOnHover] = useState<boolean>(false);

    /**
     * Compute the current fill style.
     * If fillType is 'flag', it references a pattern; otherwise, use a solid color.
     */
    const currentFill = useMemo<string>(() => {
        const type = fillType[country.alpha2Code] || defaultFillType;
        if (type === 'flag') {
            // When using a flag fill, a pattern is defined and referenced via url(#pattern-id).
            return `url(#${country.alpha2Code}-flag)`;
        }
        // If not flag, default to the specified color or fallback.
        return fillColors[country.alpha2Code] || defaultFillColor;
    }, [fillColors, fillType, country.alpha2Code, defaultFillType, defaultFillColor]);

    /**
     * Determine if the flag should be shown on hover.
     * Prioritize per-country setting, then fallback to the default.
     */
    const showFlagOnHover = useMemo<boolean>(() => {
        return flagOnHover[country.alpha2Code] !== undefined ? flagOnHover[country.alpha2Code] : defaultFlagOnHover;
    }, [flagOnHover, country.alpha2Code, defaultFlagOnHover]);

    /**
     * Mouse enter event handler:
     * - Possibly show the flag if enabled.
     * - Show tooltip if enabled.
     */
    const handleMouseEnter = (event: React.MouseEvent<SVGPathElement, MouseEvent>) => {
        event.preventDefault();
        event.stopPropagation();

        if (showFlagOnHover) {
            setIsFlagOnHover(true);
        }

        // If tooltips are enabled, display the tooltip with rendered content at the mouse location.
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
     * Mouse leave event handler:
     * - Hide the flag if previously shown on hover.
     * - Hide the tooltip if it was displayed.
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
     * Click event handler:
     * If a click handler is assigned to the specific country or default,
     * invoke it, passing the country data.
     */
    const handleClick = (event: React.MouseEvent<SVGPathElement, MouseEvent>) => {
        event.preventDefault();
        event.stopPropagation();
        const handler = onClickHandlers[country.alpha2Code] || defaultOnClickHandler;
        if (handler) {
            handler(country);
        }
    };

    /**
     * Determine the final fill to display:
     * If currently hovered with flagOnHover, show the flag;
     * otherwise, use the computed current fill.
     */
    const finalFill = useMemo<string>(() => {
        if (isFlagOnHover) {
            return `url(#${country.alpha2Code}-flag)`;
        }
        return currentFill;
    }, [isFlagOnHover, currentFill, country.alpha2Code]);

    /**
     * Define the flag pattern if fillType is 'flag' or if flag-on-hover is enabled.
     * Patterns are defined within <defs> and referenced by the <path> fill attribute.
     */
    const flagPattern = useMemo(() => {
        const type = fillType[country.alpha2Code] || defaultFillType;
        const shouldDisplayFlag = type === 'flag' || showFlagOnHover;
        if (shouldDisplayFlag) {
            return (
                <defs>
                    <pattern
                        id={`${country.alpha2Code}-flag`}
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
    }, [fillType, country.alpha2Code, country.flagUrl, showFlagOnHover, defaultFillType]);

    /**
     * Determine the final CSS class to apply:
     * Merge various identifying classes (alpha codes, continent) with user-defined classes.
     */
    const cssClass = useMemo<string>(() => {
        const countryClass = cssClasses[country.alpha2Code] || '';
        return twMerge(
            country.alpha3Code.toLowerCase(),
            country.alpha2Code.toLowerCase(),
            country.continent.replace(' ', '-').toLowerCase(),
            'ring-0 outline-none', // accessibility and focus styles
            'focus:outline-none',
            defaultCssClass,
            countryClass
        );
    }, [cssClasses, country.alpha2Code, defaultCssClass]);

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
                tabIndex={0} // Makes the element focusable for keyboard navigation.
                aria-label={`Country: ${country.commonName}`} // Accessibility label for screen readers.
                data-code={country.alpha2Code}
                data-code3={country.alpha3Code}
                data-continent={country.continent}
                role="button" // ARIA role to indicate interactivity.
            />
        </>
    );
};

export default React.memo(CountryComponent);
