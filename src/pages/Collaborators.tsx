import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebaseConfig";
import CollaboratorsTable from "../components/CollaboratorsTable";
import { deleteCollaborator } from "../services/collaboratorService";
import DeactivateCollaboratorDialog from "../components/collaborator/DeactivateCollaboratorDialog";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

interface Collaborator {
  id: string;
  name: string;
  email: string;
  department: string;
  status: "active" | "inactive";
  createdAt?: any;
}

export default function Collaborators() {
  const navigate = useNavigate();
  const location = useLocation();

  const [search, setSearch] = useState("");
  const [data, setData] = useState<Collaborator[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [loadingList, setLoadingList] = useState(true);

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    if (location.state?.snackbar) {
      setSnackbar({
        open: true,
        message: location.state.snackbar.message,
        severity: location.state.snackbar.severity,
      });

      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  useEffect(() => {
    const q = query(
      collection(db, "collaborators"),
      orderBy("createdAt", "desc"),
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const collaborators = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Collaborator, "id">),
      }));

      setData(collaborators);
      setLoadingList(false);
    });

    return () => unsubscribe();
  }, []);

  const filteredData = useMemo(() => {
    return data.filter((collaborator) =>
      collaborator.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [data, search]);

  function handleToggleStatus(id: string, status: "active" | "inactive") {
    if (status === "active") {
      setSelectedId(id);
      setOpenDialog(true);
      return;
    }

    handleConfirmDelete(id, status);
  }

  function handleCloseDialog() {
    setSelectedId(null);
    setOpenDialog(false);
  }

  async function handleConfirmDelete(
    id: string,
    status: "active" | "inactive",
  ) {
    setDeleting(true);

    const result = await deleteCollaborator(id, status);

    setDeleting(false);
    setOpenDialog(false);
    setSelectedId(null);

    if (result.success) {
      setSnackbar({
        open: true,
        severity: "success",
        message:
          status === "active"
            ? "Colaborador inativado com sucesso!"
            : "Colaborador ativado com sucesso!",
      });
    } else {
      setSnackbar({
        open: true,
        severity: "error",
        message: "Erro ao atualizar status do colaborador.",
      });
    }
  }

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h5" fontWeight={600} sx={{ letterSpacing: 0.2 }}>
          Colaboradores
        </Typography>

        <Button
          variant="contained"
          sx={{
            backgroundColor: "#00E676",
            color: "#ffffff",
            textTransform: "none",
            borderRadius: 2,
            px: 3,
          }}
          onClick={() => navigate("/collaborators/new")}
        >
          Novo colaborador
        </Button>
      </Box>
      <Box sx={{ position: "relative", mb: 2 }}>
        <TextField
          placeholder="Buscar colaborador"
          size="small"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <SearchOutlinedIcon
          sx={{
            position: "absolute",
            right: 10,
            top: "50%",
            transform: "translateY(-50%)",
            color: "#9ca3af",
            fontSize: 20,
            pointerEvents: "none",
          }}
        />
      </Box>
      {loadingList ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight={240}
        >
          <CircularProgress size={28} />
        </Box>
      ) : (
        <CollaboratorsTable
          data={filteredData}
          onEdit={(id) => navigate(`/collaborators/${id}`)}
          onDeactivate={handleToggleStatus}
        />
      )}

      <DeactivateCollaboratorDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onConfirm={() => handleConfirmDelete(selectedId!, "active")}
        loading={deleting}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={1500}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
