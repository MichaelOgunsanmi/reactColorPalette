import React from 'react';

import {Route, Switch} from "react-router-dom";

import Palette from "./Palette";

import seedPalettes from "./utils/seedPalettes";
import {generatePalette} from "./utils/colorHelpers";


function App() {
  return (
      <Switch>
          <Route exact path={'/'} render={() => <h1>HELLO FROM INDEX</h1>}/>
          <Route exact path={'/palette/:paletteId'} render={() => <h1>HELLO FROM Palette</h1>}/>
      </Switch>
    // <div>
    //   <Palette palette={generatePalette(seedPalettes[4])} />
    // </div>
  );
}

export default App;
