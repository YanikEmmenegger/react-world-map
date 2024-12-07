// src/components/world/World.test.tsx
import React from 'react';
import { render } from '@testing-library/react';
import { MapProvider } from '../../context/MapContext';
import World from './World';
import { continents } from '../../data';

test('renders World component without crashing', () => {
    render(
        <MapProvider continentsData={continents}>
            <World />
        </MapProvider>
    );
});
