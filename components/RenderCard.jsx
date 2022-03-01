import { Delete } from '@mui/icons-material';
import {
	Button,
	Card,
	CardContent,
	Divider,
	IconButton,
	List,
	ListItem,
	ListItemText,
	Typography,
	Collapse,
} from '@mui/material';
import { ExpandMore, ExpandLess, Add } from '@mui/icons-material';

const RenderCard = (props) => {
	const {
		type,
		title,
		handleDialogOpen,
		listItems,
		handleDelete,
		collapseAllState,
		handleCollapseAll,
		collapseStates,
		topics,
		subTopics,
		handleSubTopicDialogOpen,
		handleCollapse,
		handleSubTopicDelete,
	} = props;

	if (type === 'subTopics') {
		return (
			<Card raised>
				<CardContent>
					<ListItem
						secondaryAction={
							<Button onClick={handleCollapseAll}>
								{collapseAllState ? '縮小' : '放大'}
								全部
							</Button>
						}
					>
						<ListItemText
							primary={
								<Typography variant='h4'>副主題</Typography>
							}
						/>
					</ListItem>
					<Divider />
					<List
						component='nav'
						sx={{
							pb: 0,
							overflow: 'auto',
							maxHeight: 300,
						}}
					>
						{topics && topics?.length !== 0 ? (
							topics?.map((topic) => {
								return (
									<div key={topic}>
										<ListItem
											secondaryAction={
												<>
													<IconButton
														onClick={() =>
															handleCollapse(
																topic
															)
														}
													>
														{collapseStates[
															topic
														] ? (
															<ExpandLess />
														) : (
															<ExpandMore />
														)}
													</IconButton>
													<IconButton
														onClick={() =>
															handleSubTopicDialogOpen(
																topic
															)
														}
													>
														<Add />
													</IconButton>
												</>
											}
											sx={{
												backgroundColor:
													'rgba(0, 0, 0, .1)',
											}}
										>
											<ListItemText
												primary={
													<Typography>
														{topic}
													</Typography>
												}
											/>
										</ListItem>
										<Collapse
											in={collapseStates[topic]}
											timeout='auto'
											unmountOnExit
										>
											<Divider />
											<List component='div'>
												{subTopics?.[topic] !==
												undefined ? (
													subTopics?.[topic]
														.length !== 0 &&
													subTopics?.[topic].map(
														(subTopic) => {
															return (
																<ListItem
																	key={
																		subTopic
																	}
																	secondaryAction={
																		<IconButton
																			onClick={() =>
																				handleSubTopicDelete(
																					topic,
																					subTopic
																				)
																			}
																		>
																			<Delete />
																		</IconButton>
																	}
																>
																	<ListItemText
																		primary={
																			<Typography>
																				{
																					subTopic
																				}
																			</Typography>
																		}
																	/>
																</ListItem>
															);
														}
													)
												) : (
													<ListItem>
														<ListItemText
															primary={
																<Typography>
																	無副主題
																</Typography>
															}
														/>
													</ListItem>
												)}
											</List>
										</Collapse>
									</div>
								);
							})
						) : (
							<ListItem>
								<ListItemText
									primary={<Typography>無主題</Typography>}
								/>
							</ListItem>
						)}
					</List>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card raised>
			<CardContent>
				<ListItem
					secondaryAction={
						<Button onClick={() => handleDialogOpen(type)}>
							新增{title}
						</Button>
					}
				>
					<ListItemText
						primary={<Typography variant='h4'>{title}</Typography>}
					/>
				</ListItem>
				<Divider />
				<List
					component='nav'
					sx={{
						pb: 0,
						overflow: 'auto',
						maxHeight: 300,
					}}
				>
					{listItems && listItems?.length !== 0 ? (
						listItems.map((li) => {
							return (
								<ListItem
									key={li}
									secondaryAction={
										<IconButton
											onClick={() =>
												handleDelete(type, li)
											}
										>
											<Delete />
										</IconButton>
									}
								>
									<ListItemText
										primary={<Typography>{li}</Typography>}
									/>
								</ListItem>
							);
						})
					) : (
						<ListItem>
							<ListItemText
								primary={<Typography>無{title}</Typography>}
							/>
						</ListItem>
					)}
				</List>
			</CardContent>
		</Card>
	);
};

export default RenderCard;
