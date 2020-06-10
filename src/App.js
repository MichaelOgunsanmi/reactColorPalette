import React from 'react';

import {Redirect, Route, Switch} from "react-router-dom";

import Palette from "./Palette";
import PaletteList from "./PaletteList";
import SingleColorBox from "./SingleColorBox";

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
          <Route exact path={'/'} render={(routeProps) => <PaletteList palettes={seedPalettes} {...routeProps}/>}/>
          <Route exact path={'/palette/:paletteId'} render={(routeProps) => getPalette(routeProps.match.params.paletteId)}/>
          <Route exact path={'/palette/:paletteId/:colorId'} render={() => <SingleColorBox/>}/>
      </Switch>
    );
}

export default App;
