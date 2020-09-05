import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    flex: {
        flex: 1,
    },
};

const Transition = (props) => {
    return <Slide direction="up" {...props} />;
}

function FullScreen(props) {
    console.log(props.data);
    console.log(props.open);
    return (
        <div onClick={props.close}>
            <Dialog
                fullScreen
                open={props.open}
                onClose={props.close}
                TransitionComponent={Transition}
            >

            </Dialog>
        </div>
    );
}

export default withStyles(styles)(FullScreen);
