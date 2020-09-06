import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import { withStyles } from '@material-ui/core/styles';
import Photo from './Photo'

const styles = {
    flex: {
        flex: 1,
    },
};

const Transition = (props) => {
    return <Slide direction="up" {...props} />;
}

function FullScreen(props) {
    return (
        <div data-testid="dialog" onClick={props.close}>
            <Dialog
                fullScreen
                open={props.open}
                onClose={props.close}
                TransitionComponent={Transition}
            >
                <Photo selectedPhoto={props.photo} />
            </Dialog>
        </div>
    );
}

export default withStyles(styles)(FullScreen);
