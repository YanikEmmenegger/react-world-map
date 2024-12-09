# React World Map

![npm](https://img.shields.io/npm/v/@yanikemmenegger/react-world-map)
![npm](https://img.shields.io/npm/l/@yanikemmenegger/react-world-map)
![GitHub issues](https://img.shields.io/github/issues/yanikemmenegger/react-world-map)
![GitHub stars](https://img.shields.io/github/stars/yanikemmenegger/react-world-map?style=social)

A customizable and interactive React world map component that allows you to render, style, and interact with countries seamlessly. Whether you're building data visualizations, educational tools, or geographical applications, this library provides the flexibility and functionality you need.

## Features

- **Static Dataset**: Comprehensive data for all countries, including geographical paths, flags, and metadata.
- **Context Management**: Centralized state management using React Context and a custom hook.
- **Customizable Styling**: Set fill colors, apply CSS classes globally or per country, and toggle between color fills and flag fills.
- **Interactive**: Handle click events, hover effects, and display tooltips with dynamic content.
- **Zoom and Pan**: Built-in zooming and panning functionalities for enhanced user experience.
- **Accessibility**: Keyboard navigable and ARIA-compliant for better accessibility.

## Installation

Install the package via npm or yarn:

```bash
npm install @yanikemmenegger/react-world-map
# or
yarn add @yanikemmenegger/react-world-map

Getting Started

To integrate the React World Map into your application, wrap your components with the MapProvider and include the World component where you want the map to appear.
```
## Basic Setup

```tsx
// App.tsx

import React from 'react';
import { MapProvider } from '@yanikemmenegger/react-world-map';
import World from '@yanikemmenegger/react-world-map';

const App = () => {
    return (
        <MapProvider>
            <World />
        </MapProvider>
    );
};

export default App;
```
### Components

#### MapProvider

The MapProvider component initializes and provides the global context for the map. It manages states such as rendered countries, fill colors, event handlers, and more.

##### Props
| Prop                      | Type                                            | Description                                                                                       | Default                                                                             |
| ------------------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `children`                | `ReactNode`                                     | The child components that will have access to the map context.                                    | `null`                                                                              |
| `initialRenderedCountries`| `string[]`                                      | Array of country codes to render initially.                                                       | All country codes in dataset                                                        |
| `initialFillColors`       | `Record<string, string>`                        | Initial fill colors for specific countries.                                                       | `{}`                                                                                |
| `initialFillType`         | `Record<string, 'color' \| 'flag'>`             | Initial fill type (`color` or `flag`) for specific countries.                                    | `{}`                                                                                |
| `initialOnClickHandlers`  | `Record<string, (country: Country) => void>`    | Initial `onClick` handlers for specific countries.                                               | `{}`                                                                                |
| `initialFlagOnHover`      | `Record<string, boolean>`                       | Initial settings to show flags on hover for specific countries.                                   | `{}`                                                                                |
| `initialCssClasses`       | `Record<string, string>`                        | Initial CSS classes for specific countries.                                                       | `{}`                                                                                |
| `tooltipConfig`           | `TooltipConfig`                                 | Configuration for tooltips. Includes enabling and rendering content.                              | `{ enabled: false, renderContent: (country) => country.commonName }`                |
| `defaultFillColor`        | `string`                                        | Default fill color for countries if not overridden.                                              | `#cccccc`                                                                           |
| `defaultFillType`         | `'color' \| 'flag'`                             | Default fill type for countries if not overridden.                                               | `'color'`                                                                           |
| `defaultOnClickHandler`   | `(country: Country) => void`                    | Default `onClick` handler for countries if not overridden.                                       | `undefined`                                                                         |
| `defaultFlagOnHover`      | `boolean`                                       | Default setting to show flags on hover for countries if not overridden.                           | `false`                                                                              |
| `defaultCssClass`         | `string`                                        | Default CSS class to apply to all countries if not overridden.                                   | `''`                                                                                 |
#### World

The World component renders the SVG map with all the rendered countries based on the context provided by MapProvider.

##### Props
| Prop        | Type      | Description                                     | Default |
| ----------- | --------- | ----------------------------------------------- | ------- |
| `className` | `string`  | Additional CSS classes for the map container.    | `''`    |
| `controls`  | `boolean` | Whether to display zoom and pan controls.        | `true`  |

### Hooks
useMap

The useMap hook provides access to the map context, allowing you to interact with and manipulate the map’s state and configurations.
```tsx
import React from 'react';
import { useMap } from '@yanikemmenegger/react-world-map';

const ExampleComponent = () => {
    const {
        renderedCountries,
        setRenderedCountries,
        fillColors,
        setFillColors,
        setFillColorForAll,
        // ... other context values and functions
    } = useMap();

    // Example: Add a country
    const addCountry = (countryCode: string) => {
        if (!renderedCountries.includes(countryCode)) {
            setRenderedCountries([...renderedCountries, countryCode]);
        }
    };

    // Example: Set fill color for a specific country
    const setCountryColor = (countryCode: string, color: string) => {
        setFillColors(countryCode, color);
    };

    // Example: Set fill color for all countries
    const setAllColors = (color: string) => {
        setFillColorForAll(color);
    };

    return (
        <div>
            <button onClick={() => addCountry('FR')}>Add France</button>
            <button onClick={() => setCountryColor('US', '#ff0000')}>Red USA</button>
            <button onClick={() => setAllColors('#00ff00')}>Green All</button>
        </div>
    );
};

export default ExampleComponent;
```
## Customization

React World Map offers extensive customization options, allowing you to tailor the map to your specific needs.

### Rendering Specific Countries

Control which countries are rendered on the map by specifying their country codes.

#### Initial Rendered Countries

When using the MapProvider, you can set the initialRenderedCountries prop to define which countries are displayed initially.
```tsx
<MapProvider initialRenderedCountries={['AD', 'US', 'CH']}>
    <World />
</MapProvider>
```
### Styling Countries

Apply custom styles to countries using fill colors and CSS classes.

#### Fill Colors

Set individual fill colors for specific countries or apply a default color.
```tsx
<MapProvider
    initialFillColors={{
        AD: '#ff0000', // Andorra - Red
        US: '#0000ff', // USA - Blue
        CH: '#00ff00', // Switzerland - Green
    }}
    defaultFillColor="#cccccc" // Default color for other countries
>
    <World />
</MapProvider>
```
#### CSS Classes

Add custom CSS classes (or tailwind) to countries for advanced styling. 
```tsx
<MapProvider
    initialCssClasses={{
        CH: 'highlight', // Switzerland
    }}
    defaultCssClass="base-class" // Default class for all countries
>
    <World />
</MapProvider>
```
### Event Handlers
Handle click events on countries individually or globally.

Define onClick handlers for specific countries.
```tsx
<MapProvider
    initialOnClickHandlers={{
        US: (country) => alert(`US Clicked, US has a Population of:  ${country.population}`),
    }}
    defaultOnClickHandler={(country) => console.log(`Clicked on ${country.commonName}`)}
>
    <World />
</MapProvider>
```
### Flags and Fill Types

Toggle between color fills and flag fills for countries.

Specify whether a country should display a color or its flag.
```tsx
<MapProvider
    initialFillType={{
        CH: 'flag', // Switzerland will display its flag as fill
    }}
    defaultFillType="color"
>
    <World />
</MapProvider>
```
### Flag on Hover

Enable displaying a country’s flag when hovered.
```tsx
<MapProvider
    initialFlagOnHover={{
        US: true, // USA will display its flag on hover
    }}
>
    <World />
</MapProvider>
```
### Tooltips
Display tooltips with dynamic content when hovering over countries.

Enable tooltips and define a custom render function.
```tsx
<MapProvider
    tooltipConfig={{
        enabled: true,
        renderContent: (country) => (
            <div>
                <strong>{country.commonName}</strong>
                <p>Population: {country.population.toLocaleString()}</p>
                <p>Capital: {country.capital}</p>
            </div>
        ),
    }}
>
    <World />
</MapProvider>
```
### Zoom and Pan Controls
enable zooming and reset buttons for enhanced user experience.
```tsx
<World controls={true} /> // Displays zoom and pan controls
<World controls={false} /> // Hides zoom and pan controls
```

## Examples
Examples

### Basic Usage

A simple example demonstrating how to render the map with a subset of countries and custom fill colors.
```tsx
// App.tsx

import React from 'react';
import { MapProvider } from '@yanikemmenegger/react-world-map';
import World from '@yanikemmenegger/react-world-map';
import 'tailwindcss/tailwind.css'; // Ensure Tailwind CSS is configured if using it

const App = () => {
    return (
        <MapProvider
            initialRenderedCountries={['AD', 'US', 'CH']}
            initialFillColors={{
                AD: '#ff0000',
                US: '#0000ff',
                CH: '#00ff00',
            }}
            initialFillType={{
                CH: 'flag',
            }}
            initialOnClickHandlers={{
                US: (country) => alert(`Clicked on ${country.commonName}`),
            }}
            initialFlagOnHover={{
                US: true,
            }}
            initialCssClasses={{
                CH: 'highlight',
            }}
            tooltipConfig={{
                enabled: true,
                renderContent: (country) => (
                    <div>
                        <strong>{country.commonName}</strong>
                        <p>Population: {country.population.toLocaleString()}</p>
                        <p>Capital: {country.capital}</p>
                    </div>
                ),
            }}
            defaultFillColor="#cccccc"
            defaultFillType="color"
            defaultOnClickHandler={(country) => console.log(`Clicked on ${country.commonName}`)}
            defaultFlagOnHover={false}
            defaultCssClass=""
        >
            <World controls={true} />
        </MapProvider>
    );
};

export default App;
```

### Advanced Customization
Advanced Customization

An example showcasing dynamic addition and removal of countries, applying global styles, and handling events using the useMap hook.
```tsx
// ControlPanel.tsx

import React, { useState } from 'react';
import useMap from '@yanikemmenegger/react-world-map/hooks/useMap';

const ControlPanel: React.FC = () => {
    const {
        renderedCountries,
        setRenderedCountries,
        fillColors,
        setFillColors,
        setFillColorForAll,
        cssClasses,
        setCssClass,
        setCssClassForAll,
        removeCssClass,
        removeCssClassForAll,
    } = useMap();

    const [input, setInput] = useState<string>('');

    const handleAddCountry = () => {
        const countryCode = input.trim().toUpperCase();
        if (countryCode && !renderedCountries.includes(countryCode)) {
            setRenderedCountries([...renderedCountries, countryCode]);
            setInput('');
        }
    };

    const handleRemoveCountry = (code: string) => {
        setRenderedCountries(renderedCountries.filter(c => c !== code));
    };

    const handleSetGlobalColor = () => {
        setFillColorForAll('#ff00ff'); // Example: Set all countries to magenta
    };

    const handleApplyGlobalClass = () => {
        setCssClassForAll('global-class');
    };

    return (
        <div className="p-4 bg-gray-100">
            <h2 className="text-xl font-bold mb-2">Control Panel</h2>
            <div className="flex items-center mb-4">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter Country Code (e.g., FR)"
                    className="border p-2 mr-2 rounded"
                />
                <button
                    onClick={handleAddCountry}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Add Country
                </button>
            </div>
            <div className="mb-4">
                <button
                    onClick={handleSetGlobalColor}
                    className="bg-purple-500 text-white px-4 py-2 rounded mr-2"
                >
                    Set All Colors to Magenta
                </button>
                <button
                    onClick={handleApplyGlobalClass}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                >
                    Apply Global Class
                </button>
            </div>
            <div>
                <h3 className="text-lg font-semibold">Rendered Countries:</h3>
                <ul className="list-disc list-inside">
                    {renderedCountries.map(code => (
                        <li key={code} className="flex justify-between items-center">
                            {code}
                            <button
                                onClick={() => handleRemoveCountry(code)}
                                className="text-red-500 hover:text-red-700"
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ControlPanel;   
```
```tsx
// App.tsx

import React from 'react';
import { MapProvider } from '@yanikemmenegger/react-world-map';
import World from '@yanikemmenegger/react-world-map';
import ControlPanel from './ControlPanel';
import 'tailwindcss/tailwind.css'; // Ensure Tailwind CSS is configured if using it

const App = () => {
    return (
        <MapProvider
            initialRenderedCountries={['AD', 'US', 'CH']}
            initialFillColors={{
                AD: '#ff0000',
                US: '#0000ff',
                CH: '#00ff00',
            }}
            initialFillType={{
                CH: 'flag',
            }}
            initialOnClickHandlers={{
                US: (country) => alert(`Clicked on ${country.commonName}`),
            }}
            initialFlagOnHover={{
                US: true,
            }}
            initialCssClasses={{
                CH: 'highlight',
            }}
            tooltipConfig={{
                enabled: true,
                renderContent: (country) => (
                    <div>
                        <strong>{country.commonName}</strong>
                        <p>Population: {country.population.toLocaleString()}</p>
                        <p>Capital: {country.capital}</p>
                    </div>
                ),
            }}
            defaultFillColor="#cccccc"
            defaultFillType="color"
            defaultOnClickHandler={(country) => console.log(`Clicked on ${country.commonName}`)}
            defaultFlagOnHover={false}
            defaultCssClass=""
        >
            <div className="flex">
                <ControlPanel />
                <World controls={true} />
            </div>
        </MapProvider>
    );
};

export default App;
```
