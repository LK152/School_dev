import { createTheme, responsiveFontSizes } from '@mui/material';

let theme = createTheme({
	palette: {
		primary: { main: '#F3905F' },
		secondary: { main: '#FFF' },
	},
	breakpoints: {
		values: {
			xs: 0,
			sm: 600,
			md: 900,
			lg: 1200,
			xl: 1536,
			browser: 441, 
			dialog: 532
		},
	},
});

theme = responsiveFontSizes(theme);

export default theme;
