import React from 'react';

import seedPalettes from "./utils/seedPalettes";
import Palette from "./Palette";
import {generatePalette} from "./utils/colorHelpers";


function App() {
  return (
    <div>
      <Palette palette={generatePalette(seedPalettes[4])} />
    </div>
  );
}

export default App;
