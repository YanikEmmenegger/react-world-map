// src/components/World.tsx

import React from 'react';
import useMap from '../hooks/useMap';
import CountryComponent from './CountryComponent';
import {twMerge} from 'tailwind-merge';
import ZoomControls from './ZoomControls'; // Optional: If implementing zoom controls
import {TransformComponent, TransformWrapper} from 'react-zoom-pan-pinch';

interface WorldProps {
    className?: string;
    controls?: boolean; // Whether to show zoom controls
}

/**
 * World component that renders the SVG map with all rendered countries.
 */
const World: React.FC<WorldProps> = ({className, controls = true}) => {
    const {countries, renderedCountries} = useMap();

    // Filter countries based on renderedCountries
    const countriesToRender = countries.filter(country => renderedCountries.includes(country.code));

    return (
        <div
            className={twMerge(
                'relative w-full h-full flex items-center justify-center overflow-hidden',
                className
            )}
        >
            <TransformWrapper
                initialScale={1}
                minScale={0.1}
                maxScale={1000}
                wheel={{step: 0.1}}
                doubleClick={{disabled: true}}
                pinch={{step: 5}}
                panning={{velocityDisabled: true}}
                limitToBounds={false}
                centerOnInit={true}
                // Ensure that click events do not trigger panning
                //panning={{ disable: true }}
            >
                {({zoomIn, zoomOut, resetTransform}) => (
                    <>
                        {controls && <ZoomControls zoomIn={zoomIn} zoomOut={zoomOut} resetTransform={resetTransform}/>}
                        <TransformComponent>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 1009.6727 665.96301"
                                className="world-map content-center bg-transparent mx-auto w-screen h-screen"
                            >
                                {countriesToRender.map((country) => (
                                    <CountryComponent key={country.code} country={country}/>
                                ))}
                            </svg>
                        </TransformComponent>
                    </>
                )}
            </TransformWrapper>
        </div>
    );
};

export default React.memo(World);
