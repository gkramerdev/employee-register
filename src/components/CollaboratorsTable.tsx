import {
  Avatar,
  Box,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  TableSortLabel,
  IconButton,
  Pagination,
  Typography,
} from "@mui/material";
import { useState } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import PowerSettingsNewOutlinedIcon from "@mui/icons-material/PowerSettingsNewOutlined";

interface Collaborator {
  id: string;
  name: string;
  email: string;
  department: string;
  status: "active" | "inactive";
}

interface Props {
  data: Collaborator[];
  onEdit: (id: string) => void;
  onDeactivate: (id: string, status: "active" | "inactive") => void;
}

type Order = "asc" | "desc";

export default function CollaboratorsTable({
  data,
  onEdit,
  onDeactivate,
}: Props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(5);

  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Collaborator>("name");

  function handleSort(property: keyof Collaborator) {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  }

  const sortedData = [...data].sort((a, b) => {
    const valueA = a[orderBy];
    const valueB = b[orderBy];

    if (valueA < valueB) return order === "asc" ? -1 : 1;
    if (valueA > valueB) return order === "asc" ? 1 : -1;
    return 0;
  });

  const paginatedData = sortedData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sortDirection={orderBy === "name" ? order : false}>
                <TableSortLabel
                  active={orderBy === "name"}
                  direction={orderBy === "name" ? order : "asc"}
                  onClick={() => handleSort("name")}
                >
                  Nome
                </TableSortLabel>
              </TableCell>

              <TableCell sortDirection={orderBy === "email" ? order : false}>
                <TableSortLabel
                  active={orderBy === "email"}
                  direction={orderBy === "email" ? order : "asc"}
                  onClick={() => handleSort("email")}
                >
                  Email
                </TableSortLabel>
              </TableCell>

              <TableCell
                sortDirection={orderBy === "department" ? order : false}
              >
                <TableSortLabel
                  active={orderBy === "department"}
                  direction={orderBy === "department" ? order : "asc"}
                  onClick={() => handleSort("department")}
                >
                  Departamento
                </TableSortLabel>
              </TableCell>

              <TableCell>Status</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedData.map((row) => (
              <TableRow key={row.id} hover>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar>{row.name.charAt(0)}</Avatar>
                    {row.name}
                  </Box>
                </TableCell>

                <TableCell>{row.email}</TableCell>
                <TableCell>{row.department}</TableCell>

                <TableCell>
                  <Chip
                    label={row.status === "active" ? "Ativo" : "Inativo"}
                    size="small"
                    sx={{
                      fontWeight: 500,
                      backgroundColor:
                        row.status === "active"
                          ? "rgba(0, 230, 118, 0.15)"
                          : "rgba(239, 68, 68, 0.12)",
                      color: row.status === "active" ? "#00C853" : "#ef4444",
                    }}
                  />
                </TableCell>

                <TableCell align="right">
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: 1,
                    }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => onEdit(row.id)}
                      title="Editar"
                      sx={{
                        border: "1px solid #e5e7eb",
                        borderRadius: 1,
                        width: 32,
                        height: 32,
                        color: "#374151",
                        "&:hover": {
                          backgroundColor: "#f9fafb",
                        },
                      }}
                    >
                      <EditOutlinedIcon fontSize="small" />
                    </IconButton>

                    <IconButton
                      size="small"
                      onClick={() => onDeactivate(row.id, row.status)}
                      title={row.status === "active" ? "Inativar" : "Ativar"}
                      sx={{
                        border: "1px solid #e5e7eb",
                        borderRadius: 1,
                        width: 32,
                        height: 32,
                        color: row.status === "active" ? "#ef4444" : "#00C853",
                        "&:hover": {
                          backgroundColor:
                            row.status === "active"
                              ? "rgba(239, 68, 68, 0.1)"
                              : "rgba(0, 230, 118, 0.12)",
                        },
                      }}
                    >
                      <PowerSettingsNewOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* PAGINAÇÃO MODERNA */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 2,
          py: 2,
        }}
      >
        <Typography variant="body2" sx={{ color: "#6b7280" }}>
          {data.length} colaboradores
        </Typography>

        <Pagination
          count={Math.ceil(data.length / rowsPerPage)}
          page={page + 1}
          onChange={(_, value) => setPage(value - 1)}
          shape="rounded"
          color="primary"
        />
      </Box>
    </Paper>
  );
}
