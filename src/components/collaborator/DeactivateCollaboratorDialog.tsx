import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
} from "@mui/material";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
}

export default function DeactivateCollaboratorDialog({
  open,
  onClose,
  onConfirm,
  loading = false,
}: Props) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirmar Inativação</DialogTitle>

      <DialogContent>
        <DialogContentText>
          Tem certeza que deseja inativar este colaborador? Ele não será
          removido do sistema, apenas ficará inativo.
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>

        <Button
          onClick={onConfirm}
          color="error"
          variant="contained"
          disabled={loading}
          startIcon={
            loading ? <CircularProgress size={18} color="inherit" /> : null
          }
        >
          Inativar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
