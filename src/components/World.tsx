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
 * World component:
 * Renders the main SVG map containing all countries.
 * Integrates D3.js for panning and zooming.
 */
const World: React.FC<WorldProps> = ({className, children}) => {
    // Access map context for countries and zoom function setters.
    const {countries, renderedCountries, setZoomFunctions} = useMap();

    // Refs to the SVG and group element for attaching D3 behaviors.
    const svgRef = useRef<SVGSVGElement | null>(null);
    const gRef = useRef<SVGGElement | null>(null);

    // Ref to store the zoom behavior instance.
    const zoomBehavior = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null);

    // Filter countries to only those that should be rendered.
    const countriesToRender = countries.filter(country => renderedCountries.includes(country.alpha2Code));

    // Initialize the D3 Zoom behavior for infinite zooming and smooth panning.
    useEffect(() => {
        if (!svgRef.current || !gRef.current) return;

        // Set up zoom behavior with very large scaleExtent and translateExtent for "infinite" zoom.
        zoomBehavior.current = d3.zoom<SVGSVGElement, unknown>()
            .scaleExtent([0.1, 1000]) // allows extreme zoom in/out
            .translateExtent([[-Infinity, -Infinity], [Infinity, Infinity]]) // infinite panning
            .on('zoom', (event) => {
                // Update the transform of the group element as we zoom/pan.
                d3.select(gRef.current).attr('transform', event.transform);
            });

        // Apply the zoom behavior to the SVG element.
        d3.select(svgRef.current).call(zoomBehavior.current);

        // Define convenient zoom control functions to be used outside (through context).
        const zoomIn = () => {
            if (zoomBehavior.current && svgRef.current) {
                d3.select(svgRef.current)
                    .transition()
                    .duration(750)
                    // scaleBy zooms in by a factor of 1.5
                    .call((t) => zoomBehavior.current!.scaleBy(t, 1.5));
            }
        };

        const zoomOut = () => {
            if (zoomBehavior.current && svgRef.current) {
                d3.select(svgRef.current)
                    .transition()
                    .duration(750)
                    // scale out by a factor of 1/1.5
                    .call((t) => zoomBehavior.current!.scaleBy(t, 0.666));
            }
        };

        const resetZoom = () => {
            if (zoomBehavior.current && svgRef.current) {
                d3.select(svgRef.current)
                    .transition()
                    .duration(750)
                    // Reset the zoom transform to the identity (original view).
                    .call((t) => zoomBehavior.current!.transform(t, d3.zoomIdentity));
            }
        };

        // Register these functions in the map context so they can be accessed elsewhere.
        setZoomFunctions(zoomIn, zoomOut, resetZoom);

        // Clean up event listeners on component unmount.
        return () => {
            if (zoomBehavior.current) {
                d3.select(svgRef.current).on('.zoom', null);
            }
        };
    }, [setZoomFunctions]);

    // These dimensions define the natural size of the SVG.
    // "viewBox" ensures the map scales responsively while maintaining aspect ratio.
    const viewBoxWidth = 1009.6727;
    const viewBoxHeight = 665.96301;

    return (
        <div
            className={twMerge(
                'relative flex items-center justify-center w-full h-full min-w-0 min-h-0',
                className
            )}
        >
            {/* The SVG acts as the main container for the map graphic. */}
            <svg
                ref={svgRef}
                xmlns="http://www.w3.org/2000/svg"
                viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
                preserveAspectRatio="xMidYMid meet"
                className="world-map bg-transparent w-screen h-screen"
            >
                <g ref={gRef}>
                    {/* Render each country as a CountryComponent, passing its data. */}
                    {countriesToRender.map((country) => (
                        <CountryComponent key={country.alpha2Code} country={country}/>
                    ))}
                    {children}
                </g>
            </svg>
        </div>
    );
};

export default React.memo(World);
