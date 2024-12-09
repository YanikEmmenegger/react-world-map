// src/components/ContinentComponent.tsx

import React from 'react';
import { Continent, Country } from '../types';
import CountryComponent from './CountryComponent';

interface ContinentProps {
    continent: Continent;
}

/**
 * Continent component that renders all countries within a continent.
 */
const ContinentComponent: React.FC<ContinentProps> = ({ continent }) => {
    return (
        <g>
            {continent.countries.map((country) => (
                <CountryComponent key={country.code} country={country} />
            ))}
        </g>
    );
};

export default React.memo(ContinentComponent);
