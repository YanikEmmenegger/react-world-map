// src/components/FilterController.tsx

import React, { useContext, useState } from 'react';
import { MapContext } from '../context/MapContext';
import { Continent, Country } from '../types';

const FilterController: React.FC = () => {
    const context = useContext(MapContext);

    if (!context) {
        return null;
    }

    const {
        continents,
        filter,
        setFilter,
        changeFillColor,
        setCustomClass,
        removeCustomClass,
    } = context;

    const [selectedContinents, setSelectedContinents] = useState<string[]>(filter.continents);
    const [selectedCountries, setSelectedCountries] = useState<string[]>(filter.countries);
    const [color, setColor] = useState<string>('#e0e0e0');
    const [selectedClass, setSelectedClass] = useState<string>('');

    /**
     * Handle continent selection
     */
    const handleContinentChange = (continentName: string) => {
        let updatedContinents: string[] = [];
        if (selectedContinents.includes(continentName)) {
            updatedContinents = selectedContinents.filter(name => name !== continentName);
        } else {
            updatedContinents = [...selectedContinents, continentName];
        }
        setSelectedContinents(updatedContinents);
        setFilter(prev => ({ ...prev, continents: updatedContinents }));
    };

    /**
     * Handle country selection
     */
    const handleCountryChange = (countryCode: string) => {
        let updatedCountries: string[] = [];
        if (selectedCountries.includes(countryCode)) {
            updatedCountries = selectedCountries.filter(code => code !== countryCode);
        } else {
            updatedCountries = [...selectedCountries, countryCode];
        }
        setSelectedCountries(updatedCountries);
        setFilter(prev => ({ ...prev, countries: updatedCountries }));
    };

    /**
     * Handle fill color change for selected continents or countries
     */
    const applyFillColor = () => {
        if (selectedContinents.length > 0) {
            changeFillColor(selectedContinents, color);
        }
        if (selectedCountries.length > 0) {
            changeFillColor(selectedCountries, color);
        }
    };

    /**
     * Handle class name assignment
     */
    const applyClassName = () => {
        if (selectedContinents.length > 0) {
            selectedContinents.forEach(continentName => {
                setCustomClass(continentName, selectedClass);
            });
        }
        if (selectedCountries.length > 0) {
            selectedCountries.forEach(countryCode => {
                setCustomClass(countryCode, selectedClass);
            });
        }
    };

    /**
     * Handle class name removal
     */
    const removeClassName = () => {
        if (selectedContinents.length > 0) {
            selectedContinents.forEach(continentName => {
                removeCustomClass(continentName);
            });
        }
        if (selectedCountries.length > 0) {
            selectedCountries.forEach(countryCode => {
                removeCustomClass(countryCode);
            });
        }
    };

    return (
        <div className="p-4 bg-white shadow-md rounded mb-4">
            <h2 className="text-xl font-semibold mb-2">Filter Controller</h2>

            {/* Continent Selection */}
            <div className="mb-4">
                <h3 className="font-medium">Select Continents:</h3>
                {continents.map((continent: Continent) => (
                    <label key={continent.name} className="block">
                        <input
                            type="checkbox"
                            checked={selectedContinents.includes(continent.name)}
                            onChange={() => handleContinentChange(continent.name)}
                            className="mr-2"
                        />
                        {continent.name}
                    </label>
                ))}
            </div>

            {/* Country Selection */}
            <div className="mb-4">
                <h3 className="font-medium">Select Countries:</h3>
                {/* List all countries */}
                {continents.flatMap(continent => continent.countries).map((country: Country) => (
                    <label key={country.code} className="block">
                        <input
                            type="checkbox"
                            checked={selectedCountries.includes(country.code)}
                            onChange={() => handleCountryChange(country.code)}
                            className="mr-2"
                        />
                        {country.commonName}
                    </label>
                ))}
            </div>

            {/* Fill Color Selector */}
            <div className="mb-4">
                <h3 className="font-medium">Change Fill Color:</h3>
                <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="mr-2"
                />
                <button
                    onClick={applyFillColor}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Apply Color
                </button>
            </div>

            {/* Class Name Assignment */}
            <div className="mb-4">
                <h3 className="font-medium">Assign Class Name:</h3>
                <input
                    type="text"
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    placeholder="Enter class name"
                    className="mr-2 border p-1 rounded"
                />
                <button
                    onClick={applyClassName}
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 mr-2"
                >
                    Assign Class
                </button>
                <button
                    onClick={removeClassName}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                    Remove Class
                </button>
            </div>
        </div>
    );
};

export default FilterController;
