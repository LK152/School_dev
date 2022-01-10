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
			<Box textAlign='center'>
				<strong style={{ color: '#FFF' }}>
					臺北市立麗山高級中學
				</strong>
			</Box>
			<Box textAlign='center'>
				<a
					href='http://163.21.208.45/content.php?c=220'
					style={{ textDecoration: 'none', color: '#FFF' }}
				>
					<strong>114012 台北市內湖區環山路二段100號</strong>
				</a>
			</Box>

			<Box textAlign='center' style={{ color: '#FFF'}}>&copy; {new Date().getFullYear()} LK</Box>
		</Box>
	);
};

export default Footer;
