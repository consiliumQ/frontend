// import React from 'react';
import { createMuiTheme } from '@material-ui/core';

import RubikBlack from '../fonts/Rubik-Black.woff';
import RubikBold from '../fonts/Rubik-Bold.woff';
import RubikItalic from '../fonts/Rubik-Italic.woff';
import RubikLight from '../fonts/Rubik-Light.woff';
import RubikRegular from '../fonts/Rubik-Regular.woff';

const rubik = {
    fontFamily: 'Rubik',
    src: `
        url(${RubikRegular}) format('woff'),
        url(${RubikLight}) format('woff'),
        url(${RubikItalic}) format('woff'),
        url(${RubikBold}) format('woff'),
        url(${RubikBlack}) format('woff'),
    `,
};

const fontStack = [
    'Rubik',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'Oxygen',
    'Ubuntu',
    'Cantarell',
    'Fira Sans',
    'Droid Sans',
    'Helvetica Neue',
    'sans-serif',
];

const consiliumqTheme = createMuiTheme({
    typography: {
        fontFamily: fontStack.join(', '),
    },
    overrides: {
        MuiCssBaseline: {
            '@global': {
                '@font-face': [rubik],
            },
        },
    },
});

export default consiliumqTheme;
