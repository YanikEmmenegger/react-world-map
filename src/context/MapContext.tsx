// src/context/MapContext.tsx
import React, { createContext, ReactNode, useMemo, useState, useCallback } from 'react';
import {
    Continent,
    Country,
    MapContextProps,
    FilterState,
    FillColorsState,
    FlagBackgroundsState,
    CustomClassesState,
    TooltipConfig,
    TooltipData,
    CountryClickHandler,
    CountryHoverHandler,
} from '../types';
import Tooltip from '../components/Tooltip';

interface MapProviderProps {
    children: ReactNode;
    continentsData: Continent[];
    tooltipConfig?: TooltipConfig;
}

export const MapContext = createContext<MapContextProps | undefined>(undefined);

export const MapProvider: React.FC<MapProviderProps> = ({
                                                            children,
                                                            continentsData,
                                                            tooltipConfig = {
                                                                enabled: false,
                                                                renderContent: (country) => country.commonName,
                                                            },
                                                        }) => {
    // Initialize state
    const [filter, setFilter] = useState<FilterState>({
        continents: [],
        countries: [],
    });

    const [fillColors, setFillColors] = useState<FillColorsState>({});
    const [flagBackgrounds, setFlagBackgrounds] = useState<FlagBackgroundsState>({});
    const [customClasses, setCustomClasses] = useState<CustomClassesState>({});
    const [tooltip, setTooltip] = useState<TooltipData | null>(null);

    // Handlers
    const changeFillColor = useCallback(
        (countryCodes: string[], color: string) => {
            setFillColors((prev) => ({
                ...prev,
                ...countryCodes.reduce((acc, code) => ({ ...acc, [code]: color }), {}),
            }));
        },
        []
    );

    const toggleFlagBackground = useCallback((countryCodes: string[]) => {
        setFlagBackgrounds((prev) => {
            const updated = { ...prev };
            countryCodes.forEach((code) => {
                updated[code] = !prev[code];
            });
            return updated;
        });
    }, []);

    const setCustomClass = useCallback((countryCode: string, className: string) => {
        setCustomClasses((prev) => ({ ...prev, [countryCode]: className }));
        setFilter((prev) => ({ ...prev, countries: [] }));
    }, []);

    const removeCustomClass = useCallback((countryCode: string) => {
        setCustomClasses((prev) => {
            const updated = { ...prev };
            delete updated[countryCode];
            return updated;
        });
    }, []);

    // Additional setters for state
    const setShowFlag = useCallback((countryCodes: string[], show: boolean) => {
        setFlagBackgrounds((prev) => ({
            ...prev,
            ...countryCodes.reduce((acc, code) => ({ ...acc, [code]: show }), {}),
        }));
    }, []);

    const setShowFlagOnHover = useCallback((countryCodes: string[], show: boolean) => {
        // Implement similar state if needed
    }, []);

    const setOnClick = useCallback((countryCode: string, handler: CountryClickHandler) => {
        // Implement similar state if needed
    }, []);

    const contextValue = useMemo<MapContextProps>(() => ({
        continents: continentsData,
        filter,
        setFilter,
        fillColors,
        setFillColors,
        changeFillColor,
        flagBackgrounds,
        toggleFlagBackground,
        onCountryClick: undefined, // To be set via props or hooks
        onCountryHover: undefined, // To be set via props or hooks
        showFlagOnHover: false, // Default value, can be customized

        // Custom Classes
        customClasses,
        setCustomClass,
        removeCustomClass,

        // Default and Continent-Specific Styles
        defaultFillColor: '#cccccc',
        defaultClassName: '',
        defaultShowFlag: false,
        defaultShowFlagOnHover: false,

        continentFillColors: {},
        continentClassNames: {},
        continentShowFlags: {},
        continentShowFlagsOnHover: {},
        continentOnClicks: {},

        // Country-Specific Overrides
        countryFillColors: fillColors,
        countryClassNames: customClasses,
        countryShowFlags: flagBackgrounds,
        countryShowFlagsOnHover: {}, // Implement if needed
        countryOnClicks: {}, // Implement if needed

        // Tooltip State
        tooltip,
        setTooltip,
        tooltipConfig,
    }), [
        continentsData,
        filter,
        fillColors,
        flagBackgrounds,
        customClasses,
        changeFillColor,
        toggleFlagBackground,
        setCustomClass,
        removeCustomClass,
        tooltip,
        tooltipConfig,
    ]);

    return (
        <MapContext.Provider value={contextValue}>
            {children}
            {tooltipConfig.enabled && tooltip && <Tooltip tooltipData={tooltip} />}
        </MapContext.Provider>
    );
};
