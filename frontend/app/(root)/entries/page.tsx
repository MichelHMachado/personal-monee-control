"use client";

import {
  Box,
  Button,
  Grid2 as Grid,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useTheme,
} from "@mui/material";

import { useEffect, useState } from "react";

import TransactionForm from "@/components/Transactions/TransactionForm";
import { withAuth } from "@/components/Auth/WithAuth";
import ExtractTable from "@/components/Transactions/ExtractTable";
import { getAllTransactions } from "@/lib/actions/transactions.actions";
import { Transaction } from "@/types/transaction";
import { formatDate } from "@/utils/formatDate";
import { TransactionFormValues } from "@/lib/definitions";
import CustomButton from "@/components/CustomButton/CustomButton";

const Entries = () => {
  const theme = useTheme();
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    setEditingTransaction(null);
  };
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      type: "",
      category: { name: "" },
      date: "",
      amount: 0,
      uuid: "",
    },
  ]);
  const [editingTransaction, setEditingTransaction] =
    useState<TransactionFormValues | null>(null);

  const columns = [
    { id: "date", title: "Date" },
    { id: "type", title: "Type" },
    { id: "category", title: "Category" },
    { id: "amount", title: "Amount" },
    { id: "edit", title: "Edit" },
  ];

  const fetchTransactions = async () => {
    try {
      const result: Transaction[] = await getAllTransactions(100);

      const fetchedTransactions = result.map(
        ({ type, category, date, amount, uuid }) => ({
          type,
          category,
          date: formatDate(date),
          amount,
          uuid,
        })
      );

      setTransactions(fetchedTransactions);
    } catch (error) {
      console.error("error fetching transactions: ", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleEditTransaction = (transaction: TransactionFormValues) => {
    setEditingTransaction(transaction);
    handleOpenModal();
  };

  return (
    <Grid
      sx={{
        flexGrow: 1,
        background: theme.palette.gradient.primary,
        color: "black",
        padding: "16px",
        height: "100%",
        py: "24px",
      }}
      container
      width={"100%"}
    >
      <Grid size={4}>
        <Box>
          <Typography>Balance</Typography>
          <Box>BalanceComponent</Box>

          <CustomButton onClick={handleOpenModal}>Insert Entry</CustomButton>
        </Box>
      </Grid>
      <Grid size={8}>
        <Box sx={{ position: "relative" }}>
          <ExtractTable
            onEdit={handleEditTransaction}
            columns={columns}
            rows={transactions}
            title={"Transactions Extract"}
          />
          <Dialog
            open={openModal}
            onClose={handleCloseModal}
            aria-hidden={!openModal ? "true" : undefined}
          >
            <DialogTitle>Insert Entry</DialogTitle>
            <DialogContent>
              <TransactionForm
                onTransactionAdded={fetchTransactions}
                handleCloseModal={handleCloseModal}
                initialData={editingTransaction || undefined}
              />
            </DialogContent>
            <DialogActions>
              <Button type="button" onClick={handleCloseModal} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Grid>
    </Grid>
  );
};

export default withAuth(Entries);
