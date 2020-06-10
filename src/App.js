import React from 'react';

import {Redirect, Route, Switch} from "react-router-dom";

import Palette from "./Palette";

import seedPalettes from "./utils/seedPalettes";
import {generatePalette} from "./utils/colorHelpers";


function App() {
    const getPalette = (paletteId) => {
        const seedPalette = seedPalettes.find(palette => palette.id.toLowerCase() === paletteId.toLowerCase());

        if (!seedPalette) return <Redirect to={'/'}/>;

        return <Palette palette={generatePalette(seedPalette)}/>;
    };

    return (
      <Switch>
          <Route exact path={'/'} render={() => <h1>HELLO FROM INDEX</h1>}/>
          <Route exact path={'/palette/:paletteId'} render={(routeProps) => getPalette(routeProps.match.params.paletteId)}/>
      </Switch>
    // <div>
    //   <Palette palette={generatePalette(seedPalettes[4])} />
    // </div>
    );
}

export default App;
