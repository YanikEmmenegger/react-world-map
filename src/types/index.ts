// src/types/index.ts

import {ReactNode} from 'react';

/**
 * Represents a currency with its name and symbol.
 */
export interface Currency {
    name: string;
    symbol: string;
}

/**
 * Represents a country with various attributes.
 */
export interface Country {
    code: string;
    commonName: string;
    officialName: string;
    continent: string;
    region: string;
    subregion: string;
    population: number;
    capital: string;
    area: number;
    languages: { [key: string]: string };
    currencies: { [key: string]: Currency };
    flagUrl: string;
    flagAlt: string;
    svgPath: string;
    flag: string;
}

/**
 * Represents the data required to display a tooltip.
 */
export interface TooltipData {
    x: number;
    y: number;
    content: React.ReactNode;
}

/**
 * Configuration options for tooltips.
 */
export interface TooltipConfig {
    enabled: boolean;
    renderContent: (country: Country) => React.ReactNode;
}

/**
 * Represents the properties and methods available in the map context.
 */
export interface MapContextProps {
    // Data
    countries: Country[];

    // Rendered Countries
    renderedCountries: string[];
    setRenderedCountries: (countryCodes: string[]) => void;

    // Fill Colors
    fillColors: Record<string, string>;
    setFillColors: (countryCode: string, color: string) => void;
    setFillColorForAll: (color: string) => void;

    // Fill Type ('color' or 'flag')
    fillType: Record<string, 'color' | 'flag'>;
    setFillType: (countryCode: string, type: 'color' | 'flag') => void;
    setFillTypeForAll: (type: 'color' | 'flag') => void;

    // onClick Handlers
    onClickHandlers: Record<string, (country: Country) => void>;
    setOnClickHandler: (countryCode: string, handler: (country: Country) => void) => void;
    setOnClickHandlerForAll: (handler: (country: Country) => void) => void;

    // Flag on Hover
    flagOnHover: Record<string, boolean>;
    setFlagOnHover: (countryCode: string, show: boolean) => void;
    setFlagOnHoverForAll: (show: boolean) => void;

    // CSS Classes
    cssClasses: Record<string, string>;
    setCssClass: (countryCode: string, className: string) => void;
    setCssClassForAll: (className: string) => void;
    removeCssClass: (countryCode: string) => void;
    removeCssClassForAll: () => void;

    // Tooltip
    tooltip: TooltipData | null;
    setTooltip: React.Dispatch<React.SetStateAction<TooltipData | null>>;
    tooltipConfig: TooltipConfig;

    // Default Styles
    defaultFillColor: string;
    defaultFillType: 'color' | 'flag';
    defaultOnClickHandler?: (country: Country) => void;
    defaultFlagOnHover: boolean;
    defaultCssClass: string;
}

/**
 * Props for the MapProvider component, allowing initial configurations.
 */
export interface MapProviderProps {
    children: ReactNode;

    // Initial Rendered Countries
    initialRenderedCountries?: string[]; // Country codes to render initially

    // Fill Colors
    initialFillColors?: Record<string, string>; // Initial fill colors

    // Fill Type
    initialFillType?: Record<string, 'color' | 'flag'>; // Initial fill type

    // onClick Handlers
    initialOnClickHandlers?: Record<string, (country: Country) => void>; // Initial onClick handlers

    // Flag on Hover
    initialFlagOnHover?: Record<string, boolean>; // Initial flag on hover settings

    // CSS Classes
    initialCssClasses?: Record<string, string>; // Initial CSS classes

    // Tooltip Configuration
    tooltipConfig?: TooltipConfig;

    // Default Settings
    defaultFillColor?: string;
    defaultFillType?: 'color' | 'flag';
    defaultOnClickHandler?: (country: Country) => void;
    defaultFlagOnHover?: boolean;
    defaultCssClass?: string;
}
