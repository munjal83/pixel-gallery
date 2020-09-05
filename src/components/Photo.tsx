import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Typography from '@material-ui/core/Typography';

const styles = {
	gridList: {
		width: '100vw',
		height: '100vh',
		padding: '0 auto',
	},
	icon: {
		color: 'white',
	},
	titleBar: {
		background:
			'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
			'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
	},
};

function Photo(props) {
	return (
		<div className="container">
			<GridList cellHeight={600} style={styles.gridList}>
				<GridListTile>
					<img src={props.selectedPhoto.image_url} alt='' />
					<GridListTileBar
						title={"Views: " + props.selectedPhoto.times_viewed}
						titlePosition="top"

						actionPosition="left"
						style={styles.titleBar}
					/>
					<GridListTileBar
						title={props.selectedPhoto.name}
						subtitle={<span>by: {props.selectedPhoto.user.fullname}</span>}
					/>
				</GridListTile>
				<GridListTile style={{ height: 'auto' }}>
					<Typography variant="display1" gutterBottom>
						{props.selectedPhoto.description}
					</Typography>
				</GridListTile>
			</GridList>
		</div>
	);
}

export default withStyles(styles)(Photo);
