// ExampleApp.tsx


import {MapProvider, World} from "../../src";
import ControlPanel from "./test.tsx";
import Customzoomcontrols from "./customzoomcontrols.tsx";

const App = () => {


    return (
        <div className={"w-1/4 mx-auto min-h-64 h-auto"}>


            <MapProvider
                initialFillColors={{
                    AD: '#ff0000',
                    US: '#0000ff',
                    CH: '#00ff00',
                }}
                initialFillType={{
                    CH: 'flag',
                }}
                initialOnClickHandlers={{
                    US: (country) => alert(`Clicked on ${country.commonName}`),
                }}
                initialFlagOnHover={{
                    US: true,
                }}
                initialCssClasses={{
                    CH: 'highlight',
                }}
                tooltipConfig={{
                    enabled: true,
                    renderContent: (country) => (
                        <div>
                            <strong>{country.commonName}</strong>
                            <p>Population: {country.population.toLocaleString()}</p>
                            <p>Capital: {country.capital}</p>
                        </div>
                    ),
                }}
                defaultFillColor="#cccccc"
                defaultFillType="flag"
                defaultOnClickHandler={(country) => console.log(`Clicked on ${country.commonName}`)}
                defaultFlagOnHover={false}
                defaultCssClass=""
            >
                <ControlPanel/>
                <Customzoomcontrols/>
                <World className={"bg-red-300"}/>

            </MapProvider>
        </div>
    );
};

export default App;
