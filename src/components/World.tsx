// src/components/World.tsx

import React, {useEffect, useRef} from 'react';
import useMap from '../hooks/useMap';
import CountryComponent from './CountryComponent';
import {twMerge} from 'tailwind-merge';
import * as d3 from 'd3';

interface WorldProps {
    className?: string;
    children?: React.ReactNode;
}

/**
 * World component that renders the SVG map with all rendered countries.
 * Integrates D3.js for infinite zooming and smooth panning functionalities.
 */
const World: React.FC<WorldProps> = ({className, children}) => {
    const {countries, renderedCountries, setZoomFunctions} = useMap();
    const svgRef = useRef<SVGSVGElement | null>(null);
    const gRef = useRef<SVGGElement | null>(null);
    const zoomBehavior = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null);

    // Filter countries based on renderedCountries
    const countriesToRender = countries.filter(country => renderedCountries.includes(country.code));

    // Initialize D3 Zoom for infinite zooming and smooth panning
    useEffect(() => {
        if (!svgRef.current || !gRef.current) return;

        // Define zoom behavior with infinite zooming by setting a very high maxScale
        zoomBehavior.current = d3.zoom<SVGSVGElement, unknown>()
            .scaleExtent([0.1, 1000]) // Allows users to zoom out to 0.1x and in up to 1000x
            .translateExtent([[-Infinity, -Infinity], [Infinity, Infinity]]) // Allows panning to any direction infinitely
            .on('zoom', (event) => {
                d3.select(gRef.current).attr('transform', event.transform);
            });

        // Apply zoom behavior to the SVG
        d3.select(svgRef.current).call(zoomBehavior.current);

        // Define zoom functions
        const zoomIn = () => {
            if (zoomBehavior.current && svgRef.current) {
                d3.select(svgRef.current)
                    .transition()
                    .duration(750)
                    .call((t) => zoomBehavior.current!.scaleBy(t, 1.5));
            }
        };

        const zoomOut = () => {
            if (zoomBehavior.current && svgRef.current) {
                d3.select(svgRef.current)
                    .transition()
                    .duration(750)
                    .call((t) => zoomBehavior.current!.scaleBy(t, 0.666)); // Inverse of 1.5 for consistency
            }
        };

        const resetZoom = () => {
            if (zoomBehavior.current && svgRef.current) {
                d3.select(svgRef.current)
                    .transition()
                    .duration(750)
                    .call((t) => zoomBehavior.current!.transform(t, d3.zoomIdentity));
            }
        };

        // Set zoom functions in the context
        setZoomFunctions(zoomIn, zoomOut, resetZoom);

        // Cleanup on unmount
        return () => {
            if (zoomBehavior.current) {
                d3.select(svgRef.current).on('.zoom', null);
            }
        };
    }, [setZoomFunctions]);

    return (
        <div
            className={twMerge(
                'relative w-full h-full flex items-center justify-center overflow-hidden',
                className
            )}
        >
            {/* SVG Container */}
            <svg
                ref={svgRef}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1009.6727 665.96301"
                className="world-map content-center bg-transparent mx-auto w-screen h-screen"
            >
                <g ref={gRef}>
                    {countriesToRender.map((country) => (
                        <CountryComponent key={country.code} country={country}/>
                    ))}
                    {children}
                </g>
            </svg>
        </div>
    );
};

export default React.memo(World);
