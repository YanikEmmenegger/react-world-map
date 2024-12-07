// src/components/CustomClassSetter.tsx

import React, { useContext, useEffect } from 'react';
import { MapContext } from '../context/MapContext';

const CustomClassSetter: React.FC = () => {
    const context = useContext(MapContext);

    useEffect(() => {
        if (context) {
            // Example: Add a 'fill-blue-500' class to the United States (US)


            // Add more custom classes as needed
            console.log(context.countryShowFlags);
            context.setCustomClass('FR', 'fill-yellow-500');
            context.setFilter(prev => ({ ...prev, countries: [] }));
        }
    }, []);

    return null; // This component doesn't render anything
};

export default CustomClassSetter;
