import React, {createContext, useCallback, useState} from 'react';
import {countryData} from '../data'; // Ensure this path is correct
import {Country, MapContextProps, MapProviderProps, TooltipData} from '../types';
import Tooltip from '../components/Tooltip';

// Create the MapContext with a default undefined value to ensure proper usage.
export const MapContext = createContext<MapContextProps | undefined>(undefined);

/**
 * MapProvider component that wraps the entire application or a section of it
 * to provide map context to descendants.
 *
 * It initializes and manages the state related to countries, fill colors,
 * click handlers, tooltips, and zoom functionalities.
 */
export const MapProvider: React.FC<MapProviderProps> = ({
                                                            children,
                                                            initialRenderedCountries = countryData.map(country => country.alpha2Code),
                                                            initialFillColors = {},
                                                            initialFillType = {},
                                                            initialOnClickHandlers = {},
                                                            initialFlagOnHover = {},
                                                            initialCssClasses = {},
                                                            tooltipConfig = {
                                                                enabled: false,
                                                                renderContent: (country) => country.commonName,
                                                            },
                                                            defaultFillColor = '#cccccc',
                                                            defaultFillType = 'color',
                                                            defaultOnClickHandler,
                                                            defaultFlagOnHover = false,
                                                            defaultCssClass = '',
                                                        }) => {
    // Store the master list of countries.
    const [countries] = useState<Country[]>(countryData);

    // Controls which countries are actually rendered on the map.
    const [renderedCountries, setRenderedCountries] = useState<string[]>(initialRenderedCountries);

    // Store and update fill colors for individual countries.
    const [fillColors, setFillColors] = useState<Record<string, string>>(initialFillColors);

    // Store and update fill types (color or flag) for individual countries.
    const [fillType, setFillType] = useState<Record<string, 'color' | 'flag'>>(initialFillType);

    // Store and update click handlers for individual countries.
    const [onClickHandlers, setOnClickHandlers] = useState<Record<string, (country: Country) => void>>(initialOnClickHandlers);

    // Store and update whether a country should show its flag on hover.
    const [flagOnHover, setFlagOnHover] = useState<Record<string, boolean>>(initialFlagOnHover);

    // Store and update additional CSS classes for styling individual countries.
    const [cssClasses, setCssClasses] = useState<Record<string, string>>(initialCssClasses);

    // Tooltip state, null means no tooltip currently visible.
    const [tooltip, setTooltip] = useState<TooltipData | null>(null);

    // Zoom function placeholders - will be set when the map is mounted.
    const [zoomIn, setZoomIn] = useState<() => void>(() => () => {
    });
    const [zoomOut, setZoomOut] = useState<() => void>(() => () => {
    });
    const [resetZoom, setResetZoom] = useState<() => void>(() => () => {
    });

    /**
     * Update the list of countries to render.
     * This allows dynamic changes to which countries appear on the map.
     */
    const updateRenderedCountries = useCallback((newCountryCodes: string[]) => {
        setRenderedCountries(newCountryCodes);
    }, []);

    /**
     * Set fill color for a specific country.
     * Used to visually distinguish countries.
     */
    const updateFillColors = useCallback((countryCode: string, color: string) => {
        setFillColors(prev => ({...prev, [countryCode]: color}));
    }, []);

    /**
     * Set fill color for all countries at once.
     * Useful for global color theme changes.
     */
    const updateFillColorsForAll = useCallback((color: string) => {
        const updated: Record<string, string> = {};
        countries.forEach(country => {
            updated[country.alpha2Code] = color;
        });
        setFillColors(updated);
    }, [countries]);

    /**
     * Set the fill type (color or flag) for a specific country.
     * Allows toggling between displaying a country as a solid color or a flag image.
     */
    const updateFillType = useCallback((countryCode: string, type: 'color' | 'flag') => {
        setFillType(prev => ({...prev, [countryCode]: type}));
    }, []);

    /**
     * Set the fill type (color or flag) for all countries.
     * Useful for switching the entire map’s display mode.
     */
    const updateFillTypeForAll = useCallback((type: 'color' | 'flag') => {
        const updated: Record<string, 'color' | 'flag'> = {};
        countries.forEach(country => {
            updated[country.alpha2Code] = type;
        });
        setFillType(updated);
    }, [countries]);

    /**
     * Assign a click handler to a specific country.
     * Allows custom interactions when users click on a country.
     */
    const updateOnClickHandler = useCallback((countryCode: string, handler: (country: Country) => void) => {
        setOnClickHandlers(prev => ({...prev, [countryCode]: handler}));
    }, []);

    /**
     * Assign a click handler to all countries.
     * Useful when you want the same interaction for the entire map.
     */
    const updateOnClickHandlerForAll = useCallback((handler: (country: Country) => void) => {
        const updated: Record<string, (country: Country) => void> = {};
        countries.forEach(country => {
            updated[country.alpha2Code] = handler;
        });
        setOnClickHandlers(updated);
    }, [countries]);

    /**
     * Set whether a country shows its flag when hovered over.
     * Helps in creating interactive effects and highlights.
     */
    const updateFlagOnHover = useCallback((countryCode: string, show: boolean) => {
        setFlagOnHover(prev => ({...prev, [countryCode]: show}));
    }, []);

    /**
     * Set flag-on-hover behavior for all countries.
     * A quick way to globally enable or disable flag previews on hover.
     */
    const updateFlagOnHoverForAll = useCallback((show: boolean) => {
        const updated: Record<string, boolean> = {};
        countries.forEach(country => {
            updated[country.alpha2Code] = show;
        });
        setFlagOnHover(updated);
    }, [countries]);

    /**
     * Apply a custom CSS class to a specific country for styling purposes.
     */
    const setCssClass = useCallback((countryCode: string, className: string) => {
        setCssClasses(prev => ({...prev, [countryCode]: className}));
    }, []);

    /**
     * Apply the same CSS class to all countries at once.
     */
    const setCssClassForAll = useCallback((className: string) => {
        const updated: Record<string, string> = {};
        countries.forEach(country => {
            updated[country.alpha2Code] = className;
        });
        setCssClasses(updated);
    }, [countries]);

    /**
     * Remove a CSS class from a specific country.
     */
    const removeCssClass = useCallback((countryCode: string) => {
        setCssClasses(prev => {
            const updated = { ...prev };
            delete updated[countryCode];
            return updated;
        });
    }, []);

    /**
     * Remove CSS classes from all countries.
     * This resets styling to the default state.
     */
    const removeCssClassForAll = useCallback(() => {
        setCssClasses({});
    }, []);

    /**
     * Set custom functions for zooming in, zooming out, and resetting zoom.
     * This allows the parent component to control the map view.
     */
    const setZoomFunctions = useCallback((inFn: () => void, outFn: () => void, resetFn: () => void) => {
        setZoomIn(() => inFn);
        setZoomOut(() => outFn);
        setResetZoom(() => resetFn);
    }, []);

    // Construct the context value object that will be passed down to children.
    const contextValue: MapContextProps = {
        // Data
        countries,

        // Rendered Countries
        renderedCountries,
        setRenderedCountries: updateRenderedCountries,

        // Fill Colors
        fillColors,
        setFillColors: updateFillColors,
        setFillColorForAll: updateFillColorsForAll,

        // Fill Type
        fillType,
        setFillType: updateFillType,
        setFillTypeForAll: updateFillTypeForAll,

        // onClick Handlers
        onClickHandlers,
        setOnClickHandler: updateOnClickHandler,
        setOnClickHandlerForAll: updateOnClickHandlerForAll,

        // Flag on Hover
        flagOnHover,
        setFlagOnHover: updateFlagOnHover,
        setFlagOnHoverForAll: updateFlagOnHoverForAll,

        // CSS Classes
        cssClasses,
        setCssClass,
        setCssClassForAll,
        removeCssClass,
        removeCssClassForAll,

        // Tooltip State
        tooltip,
        setTooltip,
        tooltipConfig,

        // Default Styles
        defaultFillColor,
        defaultFillType,
        defaultOnClickHandler,
        defaultFlagOnHover,
        defaultCssClass,

        // Zoom Functions
        zoomIn,
        zoomOut,
        resetZoom,
        setZoomFunctions,
    };

    return (
        <MapContext.Provider value={contextValue}>
            {children}
            {/* Conditionally render the Tooltip component if enabled and tooltip data is available */}
            {tooltipConfig.enabled && tooltip && <Tooltip tooltipData={tooltip} />}
        </MapContext.Provider>
    );
};
