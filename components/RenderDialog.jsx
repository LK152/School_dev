import {
	Dialog,
	DialogTitle,
	DialogContent,
	TextField,
	DialogActions,
	Button,
} from '@mui/material';

const RenderDialog = (props) => {
	const {
		open,
		onClose,
		inputChange,
		inputValue,
		handleSubmit,
		type,
		setTarget,
		handleSubTopicAdd,
		handleGroupAdd,
	} = props;
	const renderTitle = {
		classes: '班級',
		numbers: '座號',
		topics: '主題',
	};

	if (type === 'subTopics') {
		return (
			<Dialog
				open={open}
				onClose={() => {
					setTarget('');
					onClose();
				}}
			>
				<form id='subTopics' onSubmit={handleSubTopicAdd}>
					<DialogTitle>新增副主題</DialogTitle>
					<DialogContent>
						<TextField
							name='subTopics'
							value={inputValue}
							onChange={inputChange}
							variant='standard'
							autoComplete='off'
							placeholder='副主題'
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={onClose}>取消</Button>
						<Button
							id='subTopics'
							disabled={inputValue === ''}
							onClick={handleSubTopicAdd}
						>
							新增
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		);
	} else if (type === 'groups') {
		return (
			<Dialog open={open} onClose={onClose}>
				<DialogTitle>新增組別</DialogTitle>
				<DialogContent>
					<TextField
						name='groups'
						value={inputValue.groups}
						onChange={inputChange}
						variant='standard'
						autoComplete='off'
						placeholder='組別'
						sx={{ mr: 1 }}
					/>
					<TextField
						name='location'
						value={inputValue.location}
						onChange={inputChange}
						variant='standard'
						autoComplete='off'
						placeholder='地點'
						sx={{ ml: 1 }}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={onClose}>取消</Button>
					<Button
						disabled={
							inputValue.groups === '' ||
							inputValue.location === ''
						}
						onClick={handleGroupAdd}
					>
						新增
					</Button>
				</DialogActions>
			</Dialog>
		);
	}

	return (
		<Dialog open={open} onClose={onClose}>
			<form id={type} onSubmit={handleSubmit}>
				<DialogTitle>新增{renderTitle[type]}</DialogTitle>
				<DialogContent>
					<TextField
						name={type}
						value={inputValue}
						onChange={inputChange}
						variant='standard'
						autoComplete='off'
						placeholder={renderTitle[type]}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={onClose}>取消</Button>
					<Button
						id={type}
						disabled={inputValue === ''}
						onClick={handleSubmit}
					>
						新增
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
};

export default RenderDialog;
