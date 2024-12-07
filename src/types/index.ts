// src/types/index.ts

export interface Currency {
    name: string;
    symbol: string;
}

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

export interface Continent {
    name: string;
    countries: Country[];
}

export interface FilterState {
    continents: string[];
    countries: string[];
}

export interface FillColorsState {
    [countryCode: string]: string;
}

export interface FlagBackgroundsState {
    [countryCode: string]: boolean;
}

export interface CustomClassesState {
    [countryCode: string]: string;
}

// Event Handler Types
export type CountryClickHandler = (country: Country) => void;
export type CountryHoverHandler = (country: Country, event: React.MouseEvent<SVGPathElement, MouseEvent>) => void;

// Tooltip Data Type
export interface TooltipData {
    x: number;
    y: number;
    content: React.ReactNode;
}

// Tooltip Configuration Type
export interface TooltipConfig {
    enabled: boolean;
    renderContent: (country: Country) => React.ReactNode;
}

// Context Interface
export interface MapContextProps {
    continents: Continent[];
    filter: FilterState;
    setFilter: React.Dispatch<React.SetStateAction<FilterState>>;
    fillColors: FillColorsState;
    setFillColors: React.Dispatch<React.SetStateAction<FillColorsState>>;
    changeFillColor: (countryCodes: string[], color: string) => void;
    flagBackgrounds: FlagBackgroundsState;
    toggleFlagBackground: (countryCodes: string[]) => void;
    onCountryClick?: CountryClickHandler;
    onCountryHover?: CountryHoverHandler;
    showFlagOnHover: boolean;

    // Custom Classes
    customClasses: CustomClassesState;
    setCustomClass: (countryCode: string, className: string) => void;
    removeCustomClass: (countryCode: string) => void;

    // Default and Continent-Specific Styles
    defaultFillColor: string;
    defaultClassName: string;
    defaultShowFlag: boolean;
    defaultShowFlagOnHover: boolean;

    continentFillColors: Record<string, string>;
    continentClassNames: Record<string, string>;
    continentShowFlags: Record<string, boolean>;
    continentShowFlagsOnHover: Record<string, boolean>;
    continentOnClicks?: Record<string, CountryClickHandler>;

    // Country-Specific Overrides
    countryFillColors: Record<string, string>;
    countryClassNames: Record<string, string>;
    countryShowFlags: Record<string, boolean>;
    countryShowFlagsOnHover: Record<string, boolean>;
    countryOnClicks?: Record<string, CountryClickHandler>;

    // Tooltip State
    tooltip: TooltipData | null;
    setTooltip: React.Dispatch<React.SetStateAction<TooltipData | null>>;
    tooltipConfig: TooltipConfig;
}
