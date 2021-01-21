import React, { Dispatch } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Action } from 'redux';
import { useDispatch } from 'react-redux';

interface DeleteDialogProps {
  open: boolean,
  action: Action
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const DeleteDialog: React.FC<DeleteDialogProps> = ({ open, action, setOpen }) => {
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    dispatch(action);
    handleClose();
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Raum löschen?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Wollen Sie diesen Raum wirklich löschen?
          </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Abbruch
          </Button>
        <Button onClick={handleDelete} color="secondary" autoFocus>
          Löschen
          </Button>
      </DialogActions>
    </Dialog>
  )
}