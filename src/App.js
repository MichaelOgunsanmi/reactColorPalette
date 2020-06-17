import React, {useEffect, useState} from 'react';

import {Redirect, Route, Switch} from "react-router-dom";
import {CSSTransition, TransitionGroup} from "react-transition-group";

import Palette from "./Palette";
import PaletteList from "./PaletteList";
import SingleColorPalette from "./SingleColorPalette";
import NewPaletteForm from "./NewPaletteForm";

import seedPalettes from "./utils/seedPalettes";
import {generatePalette} from "./utils/colorHelpers";

import './App.css';



function App() {
    const savedPalettes = JSON.parse(localStorage.getItem('palettes')) || seedPalettes;
    const [palettes, setPalettes] = useState(savedPalettes);

    useEffect(() => {
      localStorage.setItem('palettes', JSON.stringify(palettes));
    }, [palettes]);


    const getPalette = (paletteId, colorId) => {
        const seedPalette = palettes.find(palette => palette.id.toLowerCase() === paletteId.toLowerCase());

        if (!seedPalette) return (
            <div className={'page'}>
                <Redirect to={'/'}/>
            </div>
        );

        let palette = generatePalette(seedPalette);

        if (!colorId) return (
            <div className={'page'}>
                <Palette palette={palette}/>
            </div>
        );

        const shades = getShades(palette.colors, colorId);

        if (shades.length < 1) return (
            <div className={'page'}>
                <Redirect to={`/palette/${paletteId}`}/>
            </div>
        );

        palette = {...palette, colors: shades};

        return (
            <div className={'page'}>
                <SingleColorPalette palette={palette}/>
            </div>
        );

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

    const deletePalette = (paletteId) => {
        setPalettes(palettes.filter(palette => palette.id !== paletteId));
    };


    return (
        <Route render={({location}) => (
            <TransitionGroup>
                <CSSTransition key={location.key} timeout={500} classNames={'fade'}>
                    <Switch location={location}>
                        <Route exact path={'/palette/new'} render={(routeProps) =>
                            <div className={'page'}>
                                <NewPaletteForm
                                savePalette={savePalette}
                                paletteNames={palettes.map(palette => palette.paletteName)}
                                starterColors={palettes[0].colors}
                                allColors={palettes.map(palette => palette.colors).flat()}
                                {...routeProps} />
                            </div>}
                        />
                        <Route exact path={'/'} render={(routeProps) =>
                            <div className={'page'}>
                                <PaletteList palettes={palettes} deletePalette={deletePalette} {...routeProps}/>
                            </div>}
                        />
                        <Route exact path={'/palette/:paletteId'} render={(routeProps) => getPalette(routeProps.match.params.paletteId)}/>
                        <Route exact path={'/palette/:paletteId/:colorId'} render={(routeProps) =>
                            getPalette(routeProps.match.params.paletteId, routeProps.match.params.colorId)}
                        />
                    </Switch>
                </CSSTransition>
            </TransitionGroup>
        )}/>
    );
}

export default App;
