// ExampleApp.tsx


import {MapProvider} from "../../src/context/MapContext.tsx";
import World from "../../src/components/World.tsx";
import ControlPanel from "./test.tsx";

const App = () => {


    return (

            <MapProvider

                initialRenderedCountries={['AU', 'US', 'CH']} // Only Andorra, USA, Switzerland
                initialFillColors={{
                    AD: '#ff0000',
                    US: '#0000ff',
                    CH: '#00ff00'
                }}
                initialFillType={{
                    CH: 'color', // Switzerland will display its flag as fill
                }}
                initialOnClickHandlers={{
                    //US: (country) => alert(`Clicked on ${country.commonName}`),
                }}
                initialFlagOnHover={{
                    US: true, // USA will display its flag on hover
                }}

                initialCssClasses={{
                    CH: 'highlight', // Add 'highlight' class to Switzerland
                }}
                tooltipConfig={{
                    enabled: true,
                    renderContent: (country) => (
                        <div className={"bg-cyan-200 p-2 "}>
                            <strong>{country.commonName}</strong>
                            <p>Population: {country.population.toLocaleString()}</p>
                            <p>Capital: {country.capital}</p>
                        </div>
                    ),
                }}
                defaultFillColor="#f00f00"
                defaultFillType="color"
                //defaultOnClickHandler={(country) => console.log(`Clicked on ${country.commonName}`)}
                defaultFlagOnHover={false}
                defaultCssClass="stroke-[0.1] z-10 hover:z-50 stroke-amber-500 hover:stroke-black"
            >                <ControlPanel />

                <World controls={true} />
            </MapProvider>
    );
};

export default App;
