// ExampleApp.tsx


import {MapProvider, World} from "../../src";

const App = () => {



    return (


        <MapProvider defaultCssClass={"active:stroke-1 active:stroke-amber-500 focus:stroke-1 focus:stroke-amber-500"}>
            <div className={"bg-red-300 w-3/4 h-screen overflow-auto"}><World className={"bg-transparent"}/>
            </div>

            </MapProvider>
    );
};

export default App;
