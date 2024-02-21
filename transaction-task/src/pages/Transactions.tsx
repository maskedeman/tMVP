import { useEffect, useMemo, useState } from "react";
import { Card, CardHeader, Typography } from "@material-tailwind/react";
import api from "../api";
import TransactionModal from "../components/TransactionModal";
import Table from "../components/Resuable/Table";
import { createColumnHelper } from "@tanstack/react-table";
import Tooltip from "../components/Resuable/Tooltip";
import { EyeIcon } from "@heroicons/react/16/solid";

interface Transaction {
  id: number;
  user_id: number;
  date_time: string;
  from_user: string;
  to_user: string;
  amount: number;
  payment_method: string;
  bank_account: string; 
}

const columnHelper = createColumnHelper<Transaction>();

const columns = [
  columnHelper.accessor("date_time", {
    header: "Date(EDT)",
  }),
  columnHelper.accessor("from_user", {
    header: "From",
  }),
  columnHelper.accessor("to_user", {
    header: "To",
  }),
  columnHelper.accessor("amount", {
    header: "Amount",
  }),
  columnHelper.accessor("payment_method", {
    header: "Payment Method",
  }),
  columnHelper.accessor("bank_account", {
    header: "Account",
  }),
  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex gap-2">
        <TransactionModal
          key={row.original.id}
          transactionId={row.original.id}
        >
          <Tooltip content="View Details">
            <div className="cursor-pointer text-green-800">
              <EyeIcon className="h-6 w-6 p-1 rounded-lg border border-green-200" />
            </div>
          </Tooltip>
        </TransactionModal>
      </div>
    ),
  }),
];

const Transactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;
  const [totalEntries, setTotalEntries] = useState<number | undefined>(0); 

  const fetchTransactions = async (page: number) => { 
    try {
      const response = await api.get(`/transaction/list/?page=${page}`);
      setTransactions(response.data.data);
      setTotalEntries(response.data.totalPage * itemsPerPage); 
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    fetchTransactions(currentPage); 
  }, [currentPage]);

  return (
    <div className="w-full h-screen">
      <Card placeholder="" className="h-full w-full">
        <CardHeader
          placeholder=""
          floated={false}
          shadow={false}
          className="rounded-none"
        >
          <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <Typography
              placeholder=""
              className="font-medium text-2xl"
              variant="h5"
              color="blue-gray"
            >
              Transactions
            </Typography>
          </div>
        </CardHeader>

        <Table
          data={transactions}
          columns={columns}
          isLoading={false}
          isError={false}
          totalEntries={totalEntries} 
          showFooter
          allowRow
          containsActions
          className="h-[calc(100vh-232px)]"
          pageChangeHandler={(page) => setCurrentPage(page)} 
          pageSize={itemsPerPage}
          currentPage={currentPage}
        />
      </Card>
    </div>
  );
};

export default Transactions;

