import {
	Grid,
	Container,
	Card,
	CardContent,
	List,
	ListItem,
	Button,
	ListItemText,
	Typography,
} from '@mui/material';
import { useState } from 'react';

const DataOptions = () => {
    const [classModal, setClassModal] = useState(false);

	return (
		<Container sx={{ my: 10 }}>
			<Grid container>
				<Grid item xs>
					<Card>
						<CardContent>
							<List component='nav' sx={{ pb: 0 }}>
								<ListItem
									secondaryAction={<Button>新增班級</Button>}
								>
									<ListItemText
										primary={<Typography>班級</Typography>}
									/>
								</ListItem>
							</List>
						</CardContent>
					</Card>
				</Grid>
				<Grid item xs>
					<Card>
						<CardContent></CardContent>
					</Card>
				</Grid>
			</Grid>
		</Container>
	);
};

export default DataOptions;
