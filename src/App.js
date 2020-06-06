import React from 'react';

import seedPalettes from "./seedPalettes";
import Palette from "./Palette";


function App() {
  return (
    <div>
      <Palette {...seedPalettes[4]}/>
    </div>
  );
}

export default App;