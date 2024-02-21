import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import api from "../api";

interface Props {
  children?: React.ReactNode;
  asChild?: boolean;
  triggerClassName?: string;
  transactionId?: number;
}

interface TransactionDetails {
  id: number;
  user_id: number;
  date_time: string;
  from_user: string;
  to_user: string;
  bank_account: string;
  amount: number;
  payment_method: string;
}

const TransactionModal = ({
  children,
  asChild = false,
  triggerClassName = "",
  transactionId,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [transactionDetails, setTransactionDetails] = useState<TransactionDetails | null>(null);

  const handleDataFetch = async () => {
    try {
      const response = await api.get(`/transaction/details/${transactionId}/`);
      if (response.data.success) {
        setTransactionDetails(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching transaction details:", error);
    }
  };

  useEffect(() => {
    if (open && transactionId) {
      handleDataFetch();
    }
  }, [open, transactionId]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild={asChild} className={triggerClassName}>
        {children}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="overlay" />
        <Dialog.Content className="modal-content space-y-2">
          <div className="flex items-start justify-between px-6 pt-4">
            <Dialog.Title>
              <h2 className="text-sm font-semibold text-gray-500">Transfer</h2>
            </Dialog.Title>
            <Dialog.Close asChild>
              <span className="p-1 hover:bg-teal-100 cursor-pointer border bg-gray-100 rounded-full">
                <RxCross2 className="w-5 h-5" />
              </span>
            </Dialog.Close>
          </div>
          <div>
            {transactionDetails && (
              <div className="mx-6 space-y-2 pb-3">
                <h1 className="text-3xl font-semibold text-gray-900">${transactionDetails.amount}</h1>
                <div className="text-sm text-gray-400">
                  <h2 className="text-gray-800 font-medium">From {transactionDetails.from_user}</h2>
                  <span className="text-xs">{transactionDetails.date_time}</span>
                </div>
                <div className="text-sm text-gray-400">
                  <h2 className="text-gray-800 font-medium">To {transactionDetails.to_user}</h2>
                  <span className="text-xs">{transactionDetails.date_time}</span>
                </div>
              </div>
            )}
            <div className="border" />
            <div className="mx-6 py-4 space-y-3">
              {transactionDetails && (
                <div>
                  <h2 className="pb-2">Notes</h2>
                  <input
                    type="textarea"
                    id="notes"
                    name="notes"
                    className="border border-gray-300 rounded-md w-full p-2 h-12"
                    placeholder="Add notes..."
                  />
                </div>
              )}
              <div className="text-sm text-gray-700 font-medium">
                + Add an attachment
              </div>
              {transactionDetails && (
                <div>
                  <span className="text-xs text-gray-600">Bank Description</span>
                  <h2 className="text-2xl text-gray-800 font-semibold">
                    {transactionDetails.bank_account}
                  </h2>
                </div>
              )}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default TransactionModal;
