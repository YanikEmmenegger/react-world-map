// src/context/MapContext.tsx

import React, {createContext, useCallback, useState} from 'react';
import {allCountries} from '../data/allCountries';
import {Country, MapContextProps, MapProviderProps, TooltipData} from '../types';
import Tooltip from '../components/Tooltip';

/**
 * Creates a context for the map, initially undefined.
 */
export const MapContext = createContext<MapContextProps | undefined>(undefined);

/**
 * MapProvider component that wraps around the application or parts of it,
 * providing map-related configurations and state management.
 */
export const MapProvider: React.FC<MapProviderProps> = ({
                                                            children,
                                                            initialRenderedCountries = allCountries.map(country => country.code),
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
    // State: All Countries Data
    const [countries] = useState<Country[]>(allCountries);

    // State: Rendered Countries (Country Codes)
    const [renderedCountries, setRenderedCountries] = useState<string[]>(initialRenderedCountries);

    // State: Fill Colors
    const [fillColors, setFillColors] = useState<Record<string, string>>(initialFillColors);

    // State: Fill Type ('color' or 'flag')
    const [fillType, setFillType] = useState<Record<string, 'color' | 'flag'>>(initialFillType);

    // State: onClick Handlers
    const [onClickHandlers, setOnClickHandlers] = useState<Record<string, (country: Country) => void>>(initialOnClickHandlers);

    // State: Flag on Hover
    const [flagOnHover, setFlagOnHover] = useState<Record<string, boolean>>(initialFlagOnHover);

    // State: CSS Classes
    const [cssClasses, setCssClasses] = useState<Record<string, string>>(initialCssClasses);

    // Tooltip State
    const [tooltip, setTooltip] = useState<TooltipData | null>(null);

    // Zoom Functions
    const [zoomIn, setZoomIn] = useState<() => void>(() => () => {
    });
    const [zoomOut, setZoomOut] = useState<() => void>(() => () => {
    });
    const [resetZoom, setResetZoom] = useState<() => void>(() => () => {
    });

    /**
     * Function to update rendered countries
     */
    const updateRenderedCountries = useCallback((newCountryCodes: string[]) => {
        setRenderedCountries(newCountryCodes);
    }, []);

    /**
     * Function to update fill color for a specific country
     */
    const updateFillColors = useCallback((countryCode: string, color: string) => {
        setFillColors(prev => ({...prev, [countryCode]: color}));
    }, []);

    /**
     * Function to update fill color for all countries
     */
    const updateFillColorsForAll = useCallback((color: string) => {
        const updated: Record<string, string> = {};
        countries.forEach(country => {
            updated[country.code] = color;
        });
        setFillColors(updated);
    }, [countries]);

    /**
     * Function to update fill type for a specific country
     */
    const updateFillType = useCallback((countryCode: string, type: 'color' | 'flag') => {
        setFillType(prev => ({...prev, [countryCode]: type}));
    }, []);

    /**
     * Function to update fill type for all countries
     */
    const updateFillTypeForAll = useCallback((type: 'color' | 'flag') => {
        const updated: Record<string, 'color' | 'flag'> = {};
        countries.forEach(country => {
            updated[country.code] = type;
        });
        setFillType(updated);
    }, [countries]);

    /**
     * Function to update onClick handler for a specific country
     */
    const updateOnClickHandler = useCallback((countryCode: string, handler: (country: Country) => void) => {
        setOnClickHandlers(prev => ({...prev, [countryCode]: handler}));
    }, []);

    /**
     * Function to update onClick handler for all countries
     */
    const updateOnClickHandlerForAll = useCallback((handler: (country: Country) => void) => {
        const updated: Record<string, (country: Country) => void> = {};
        countries.forEach(country => {
            updated[country.code] = handler;
        });
        setOnClickHandlers(updated);
    }, [countries]);

    /**
     * Function to update flag on hover for a specific country
     */
    const updateFlagOnHover = useCallback((countryCode: string, show: boolean) => {
        setFlagOnHover(prev => ({...prev, [countryCode]: show}));
    }, []);

    /**
     * Function to update flag on hover for all countries
     */
    const updateFlagOnHoverForAll = useCallback((show: boolean) => {
        const updated: Record<string, boolean> = {};
        countries.forEach(country => {
            updated[country.code] = show;
        });
        setFlagOnHover(updated);
    }, [countries]);

    /**
     * Function to set CSS class for a specific country
     */
    const setCssClass = useCallback((countryCode: string, className: string) => {
        setCssClasses(prev => ({...prev, [countryCode]: className}));
    }, []);

    /**
     * Function to set CSS class for all countries
     */
    const setCssClassForAll = useCallback((className: string) => {
        const updated: Record<string, string> = {};
        countries.forEach(country => {
            updated[country.code] = className;
        });
        setCssClasses(updated);
    }, [countries]);

    /**
     * Function to remove CSS class from a specific country
     */
    const removeCssClass = useCallback((countryCode: string) => {
        setCssClasses(prev => {
            const updated = { ...prev };
            delete updated[countryCode];
            return updated;
        });
    }, []);

    /**
     * Function to remove CSS class from all countries
     */
    const removeCssClassForAll = useCallback(() => {
        setCssClasses({});
    }, []);

    /**
     * Function to set zoom functions
     */
    const setZoomFunctions = useCallback((inFn: () => void, outFn: () => void, resetFn: () => void) => {
        setZoomIn(() => inFn);
        setZoomOut(() => outFn);
        setResetZoom(() => resetFn);
    }, []);

    /**
     * Context Value
     */
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
            {tooltipConfig.enabled && tooltip && <Tooltip tooltipData={tooltip} />}
        </MapContext.Provider>
    );
};
