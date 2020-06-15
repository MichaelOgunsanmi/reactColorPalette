import React, {useState} from 'react';

import {Redirect, Route, Switch} from "react-router-dom";

import Palette from "./Palette";
import PaletteList from "./PaletteList";
import SingleColorPalette from "./SingleColorPalette";
import NewPaletteForm from "./NewPaletteForm";

import seedPalettes from "./utils/seedPalettes";
import {generatePalette} from "./utils/colorHelpers";








function App() {
    const [palettes, setPalettes] = useState(seedPalettes);

    const getPalette = (paletteId, colorId) => {
        const seedPalette = palettes.find(palette => palette.id.toLowerCase() === paletteId.toLowerCase());

        if (!seedPalette) return <Redirect to={'/'}/>;

        let palette = generatePalette(seedPalette);

        if (!colorId) return <Palette palette={palette}/>;

        const shades = getShades(palette.colors, colorId);

        if (shades.length < 1) return <Redirect to={`/palette/${paletteId}`}/>;

        palette = {...palette, colors: shades};

        return <SingleColorPalette palette={palette}/>
    };

    const getShades = (paletteColors, colorId) => {
        let shades = [];

        for (let key in paletteColors)
            shades = shades.concat(paletteColors[key].filter(color => color.id === colorId));

        return shades.splice(1);
    };

    const savePalette = (newPalette) => {
        setPalettes([...palettes, newPalette]);
    };


    return (
      <Switch>
          <Route exact path={'/palette/new'} render={(routeProps) => <NewPaletteForm
                  savePalette={savePalette}
                  paletteNames={palettes.map(palette => palette.paletteName)}
                  starterColors={palettes[0].colors}
                  allColors={palettes.map(palette => palette.colors).flat()}
                  {...routeProps}
              />}
          />
          <Route exact path={'/'} render={(routeProps) => <PaletteList palettes={palettes} {...routeProps}/>}/>
          <Route exact path={'/palette/:paletteId'} render={(routeProps) => getPalette(routeProps.match.params.paletteId)}/>
          <Route exact path={'/palette/:paletteId/:colorId'} render={(routeProps) =>
              getPalette(routeProps.match.params.paletteId, routeProps.match.params.colorId)}
          />
      </Switch>
    );
}

export default App;
