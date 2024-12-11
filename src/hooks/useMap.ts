import {useContext} from 'react';
import {MapContext} from '../context/MapContext';
import {MapContextProps} from '../types';

/**
 * Custom hook to access the MapContext.
 * This hook provides consumers with direct access to the map state and utilities.
 *
 * @returns MapContextProps - The current context state and functions.
 * @throws Error if used outside of MapProvider - Ensures that the hook is used correctly.
 */
const useMap = (): MapContextProps => {
    const context = useContext(MapContext);
    if (!context) {
        throw new Error('useMap must be used within a MapProvider');
    }
    return context;
};

export default useMap;
