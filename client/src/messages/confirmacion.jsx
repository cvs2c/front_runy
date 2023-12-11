import React from "react";
import { Modal, Box } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import styled from "@emotion/styled";

const ModalContainer = styled('div')({
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
})


const ConfirmModal = ({ isOpen, onRequestClose }) => {
    return (
        <Modal
            open={isOpen}
            onClose={onRequestClose}
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 150,
                height: 150,
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 2,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '50%',
                border: 'none'
            }}>
                <CheckCircleIcon sx={{ fontSize: '150px', color:'success.main'  }} />
            </Box>
        </Modal>
    );
};

export default ConfirmModal;