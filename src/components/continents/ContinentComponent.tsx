// src/components/continents/ContinentComponent.tsx
import React from 'react';
import { Continent } from '../../types';
import useMap from '../../hooks/useMap';
import CountryComponent from '../continents/CountryComponent';

interface ContinentProps {
    continent: Continent;
}

const ContinentComponent: React.FC<ContinentProps> = ({ continent }) => {
    const { filter } = useMap();

    // Apply continent-level filters
    if (filter.continents.length > 0 && !filter.continents.includes(continent.name)) {
        return null; // Do not render this continent
    }

    // Apply country-level filters
    const filteredCountries = filter.countries.length > 0
        ? continent.countries.filter((country) => filter.countries.includes(country.code))
        : continent.countries;

    return (
        <g>
            {filteredCountries.map((country) => (
                <CountryComponent
                    key={country.code}
                    country={country}
                />
            ))}
        </g>
    );
};

export default React.memo(ContinentComponent);
