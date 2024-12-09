// src/components/ControlPanel.tsx

import React, { useState } from 'react';
import useMap from "../../src/hooks/useMap.ts";

const ControlPanel: React.FC = () => {
    const { renderedCountries, setRenderedCountries, countries } = useMap();
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

    const getCountryName = (code: string) => {
        const country = countries.find(c => c.code === code);
        return country ? country.commonName : code;
    }

    return (
        <div className="p-4 bg-gr ay-100">
            <h2 className="text-xl font-bold mb-2">Control Panel</h2>
            <div className="flex items-center mb-4">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter Country Code (e.g., US)"
                    className="border p-2 mr-2 rounded"
                />
                <button
                    onClick={handleAddCountry}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Add Country
                </button>
            </div>
            <div>
                <h3 className="text-lg font-semibold">Rendered Countries:</h3>
                <ul className="list-disc list-inside">
                    {renderedCountries.map(code => (
                        <li key={code} className="flex justify-between items-center">
                            {getCountryName(code)}
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
