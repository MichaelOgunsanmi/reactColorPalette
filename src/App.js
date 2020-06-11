import React from 'react';

import {Redirect, Route, Switch} from "react-router-dom";

import Palette from "./Palette";
import PaletteList from "./PaletteList";
import SingleColorBox from "./SingleColorBox";

import seedPalettes from "./utils/seedPalettes";
import {generatePalette} from "./utils/colorHelpers";



const getPalette = (paletteId, colorId) => {
    const seedPalette = seedPalettes.find(palette => palette.id.toLowerCase() === paletteId.toLowerCase());

    if (!seedPalette) return <Redirect to={'/'}/>;

    let palette = generatePalette(seedPalette);

    if (!colorId) return <Palette palette={palette}/>;

    const shades = getShades(palette.colors, colorId);

    if (shades.length < 1) return <Redirect to={`/palette/${paletteId}`}/>;

    palette = {...palette, colors: shades};

    return <SingleColorBox palette={palette}/>
};

const getShades = (paletteColors, colorId) => {
    let shades = [];

    for (let key in paletteColors)
        shades = shades.concat(paletteColors[key].filter(color => color.id === colorId));

    return shades.splice(1);
};


function App() {
    return (
      <Switch>
          <Route exact path={'/'} render={(routeProps) => <PaletteList palettes={seedPalettes} {...routeProps}/>}/>
          <Route exact path={'/palette/:paletteId'} render={(routeProps) => getPalette(routeProps.match.params.paletteId)}/>
          <Route exact path={'/palette/:paletteId/:colorId'} render={(routeProps) => getPalette(routeProps.match.params.paletteId, routeProps.match.params.colorId)}/>
      </Switch>
    );
}

export default App;
