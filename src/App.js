import React from 'react';

import seedPalettes from "./utils/seedPalettes";
import Palette from "./Palette";
import {generatePalette} from "./utils/colorHelpers";


function App() {
    console.log(generatePalette(seedPalettes[4]))
  return (
    <div>
      <Palette {...seedPalettes[4]}/>
    </div>
  );
}

export default App;
