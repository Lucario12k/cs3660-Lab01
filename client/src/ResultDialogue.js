import { useState } from 'react';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";

function ResultDialogue(props) {
    const [open, setOpen] = useState(true);

    const handleToClose = () => {
        setOpen(false);
        props.onClose();
    };

    return (
        <Dialog className="ResultDialogue" open={open} onClose={handleToClose}>
            <DialogTitle
                sx={props.success ? {
                    backgroundColor: 'success.light',
                } : {
                    backgroundColor: 'error.light',
                }}
            >{props.title}</DialogTitle>
            <DialogContent>
                {props.contents}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleToClose}
                    color="primary" autoFocus>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ResultDialogue;