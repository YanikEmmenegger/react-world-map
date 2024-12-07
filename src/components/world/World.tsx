// src/components/world/World.tsx
import React from 'react';
import useMap from '../../hooks/useMap';
import ContinentComponent from '../continents/ContinentComponent';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { twMerge } from 'tailwind-merge';
import ZoomControls from './ZoomControls';

interface WorldProps {
    className?: string;
    controls?: boolean;
}

const World: React.FC<WorldProps> = ({ className, controls = true }) => {
    const { continents, filter } = useMap();

    const filteredContinents = continents.filter((continent) => {
        if (filter.continents.length === 0) return true;
        return filter.continents.includes(continent.name);
    });

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
                wheel={{ step: 0.1 }}
                doubleClick={{ disabled: true }}
                pinch={{ step: 5 }}
                panning={{ velocityDisabled: true }}
                limitToBounds={false}
                centerOnInit={true}
            >
                {({ zoomIn, zoomOut, resetTransform }) => (
                    <>
                        {controls && (
                            <ZoomControls
                                zoomIn={zoomIn}
                                zoomOut={zoomOut}
                                resetTransform={resetTransform}
                            />
                        )}

                        <TransformComponent>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 1009.6727 665.96301"
                                className="world-map content-center mx-auto w-screen h-screen"
                            >
                                {filteredContinents.map((continent) => (
                                    <ContinentComponent key={continent.name} continent={continent} />
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
