// src/hooks/useMap.ts
import { useContext } from 'react';
import { MapContext } from '../context/MapContext';
import { MapContextProps } from '../types';

const useMap = (): MapContextProps => {
    const context = useContext(MapContext);
    if (!context) {
        throw new Error('useMap must be used within a MapProvider');
    }
    return context;
};

export default useMap;
