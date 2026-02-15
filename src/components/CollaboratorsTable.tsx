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
  TablePagination,
  Button,
  TableSortLabel,
} from "@mui/material";
import { useState } from "react";

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
  onDeactivate: (id: string) => void;
}

type Order = "asc" | "desc";

export default function CollaboratorsTable({
  data,
  onEdit,
  onDeactivate,
}: Props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Collaborator>("name");

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
              <TableCell>Ações</TableCell>
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
                    color={row.status === "active" ? "success" : "default"}
                    size="small"
                  />
                </TableCell>

                <TableCell>
                  <Button size="small" onClick={() => onEdit(row.id)}>
                    Editar
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    disabled={row.status === "inactive"}
                    onClick={() => onDeactivate(row.id)}
                  >
                    Inativar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={data.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Paper>
  );
}
