import React from 'react';
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Module from './Module';
import DownloadIcon from '@material-ui/icons/Download';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import '../../../css/dialog.css';
const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

export const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant='h6'>{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label='close'
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

export const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

export const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

interface Props {
  module: {
    likes?: number;
    module_name?: string;
    description?: string;
    hashtags: string[];
  };
}

const DialogModule = (props: Props) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const downloadModule = async () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ module_name: props.module.module_name }),
    };
    const response = await fetch(
      '//127.0.0.1:5000/install_module',
      requestOptions
    );
    const modules = await response.json();
  };

  return (
    <div>
      <Button variant='outlined' color='primary' onClick={handleClickOpen}>
        <div className='moduleMiniView'>
          <div>{props.module.module_name}</div>
          <div className='moduleLikes'>
            <FavoriteIcon color='secondary' fontSize='small' />
            {props.module.likes}
          </div>
        </div>
      </Button>
      <Dialog
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={open}
      >
        <DialogTitle id='customized-dialog-title' onClose={handleClose}>
          {props.module.module_name}
        </DialogTitle>
        <DialogContent dividers>
          <Module
            discription={props.module.description}
            hashtags={props.module.hashtags}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color='primary'>
            {props.module.likes} <FavoriteBorderIcon />
          </Button>
          <Button autoFocus onClick={downloadModule} color='primary'>
            <DownloadIcon />
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default DialogModule;
