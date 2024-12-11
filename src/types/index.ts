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
 * These attributes help in identifying the country, its codes, and metadata
 * needed for rendering and interaction.
 */
export interface Country {
    commonName: string;
    officialName: string;
    alpha2Code: string;
    alpha3Code: string;
    independent: boolean;
    unMember: boolean;
    dependsOn?: string | null;
    continent: string;
    region: string;
    subregion: string;
    population: number;
    capital: string;
    area: number;
    languages: [{ [key: string]: string }];
    currencies: [{ [key: string]: Currency }];
    flagUrl: string;
    flagAlt: string;
    svgPath: string; // The SVG path that outlines this country’s geography.
    flag: string;
    longLatCapital: { long: number; lat: number };
    alsoKnownAs: string[];
}

/**
 * Represents the data required to display a tooltip.
 * Tooltips show contextual information about a country upon interaction.
 */
export interface TooltipData {
    x: number;
    y: number;
    content: React.ReactNode;
}

/**
 * Configuration options for tooltips.
 * Includes whether tooltips are enabled and a function to render custom content.
 */
export interface TooltipConfig {
    enabled: boolean;
    renderContent: (country: Country) => React.ReactNode;
}

/**
 * Represents the properties and methods available in the map context.
 * This context allows for global state management of map data and user interactions.
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

    // Zoom Functions
    zoomIn: () => void;
    zoomOut: () => void;
    resetZoom: () => void;
    setZoomFunctions: (zoomIn: () => void, zoomOut: () => void, resetZoom: () => void) => void;
}

/**
 * Props for the MapProvider component, allowing initial configurations.
 * This allows consumers of the library to pre-define how the map behaves,
 * such as default colors, event handlers, and tooltip behavior.
 */
export interface MapProviderProps {
    children: ReactNode;

    // Initial Rendered Countries
    initialRenderedCountries?: string[];

    // Fill Colors
    initialFillColors?: Record<string, string>;

    // Fill Type
    initialFillType?: Record<string, 'color' | 'flag'>;

    // onClick Handlers
    initialOnClickHandlers?: Record<string, (country: Country) => void>;

    // Flag on Hover
    initialFlagOnHover?: Record<string, boolean>;

    // CSS Classes
    initialCssClasses?: Record<string, string>;

    // Tooltip Configuration
    tooltipConfig?: TooltipConfig;

    // Default Settings
    defaultFillColor?: string;
    defaultFillType?: 'color' | 'flag';
    defaultOnClickHandler?: (country: Country) => void;
    defaultFlagOnHover?: boolean;
    defaultCssClass?: string;
}
