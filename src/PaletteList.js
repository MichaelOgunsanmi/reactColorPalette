import React from 'react';

import {Link} from "react-router-dom";


const PaletteList = (props) => {
    const {palettes} = props;

    const paletteList = palettes.map( palette => <h4><Link to={`/palette/${palette.id}`}>{palette.paletteName}</Link> </h4>);

    return (
        <div>
            <h1>React Colors</h1>
            {paletteList}
        </div>
    );
};

export default PaletteList;