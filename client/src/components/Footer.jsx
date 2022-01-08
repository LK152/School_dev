import { Box } from '@mui/material';

const Footer = () => {
	return (
		<Box
			sx={{
				width: '100vw',
				height: 100,
				backgroundColor: '#F3905F',
				position: 'relative',
				bottom: 0,
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
			}}
		>
			<Box textAlign='center'>&copy; {new Date().getFullYear()} LK</Box>
		</Box>
	);
};

export default Footer;
