import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Transaction } from "@/types/transaction";
import { MoreHoriz as MoreHorizIcon } from "@mui/icons-material";

interface Props {
  title: string;
  columns: { id: string; title: string }[];
  rows: Transaction[];
}

const ExtractTable = ({ title, columns, rows }: Props) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [filter, setFilter] = useState("");

  const handleChangePage = (event, newPage: React.SetStateAction<number>) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: {
    target: { value: string | number };
  }) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function getRowValue<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
  }

  const filteredRows = filter
    ? rows.filter((row) =>
        columns.some((column) => {
          const columnValue =
            column.id === "category"
              ? row.category.name
              : String(getRowValue(row, column.id as keyof Transaction));

          return columnValue.toLowerCase().includes(filter.toLowerCase());
        })
      )
    : rows;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <Typography variant="h3">{title}</Typography>
      <Box sx={{ display: "flex", gap: "16px", alignItems: "center" }}>
        <TextField
          placeholder="Search by date, value, type or category"
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              minHeight: "30px",
              "& input": {
                padding: "0 14px",
                color: "black",
              },
            },
          }}
          variant="outlined"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <SearchOutlinedIcon />
      </Box>
      <TableContainer sx={{ maxHeight: 700, overflow: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.title}>{column.title}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows &&
              filteredRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow key={`row-${index}`}>
                      <TableCell>{row.date}</TableCell>
                      <TableCell>{row.type}</TableCell>
                      <TableCell>{row.category.name}</TableCell>
                      <TableCell>
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                        }).format(row.amount)}
                      </TableCell>
                      <TableCell>
                        <IconButton onClick={() => {}}>
                          <MoreHorizIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
      </TableContainer>
      {filteredRows && (
        <TablePagination
          component={"div"}
          rowsPerPageOptions={[10, 25, 100]}
          rowsPerPage={rowsPerPage}
          count={filteredRows.length}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Rows per page"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} of ${count}`
          }
        />
      )}
    </Box>
  );
};

export default ExtractTable;
