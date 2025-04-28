import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";

import Badge from "../../ui/badge/Badge";
import { useEffect, useState } from "react";
import { axiosI } from "../../../hooks/useAxios";

interface Order {
  _id: number;
  url: string;
  result: string;
  deviceId: string;
  createdAt: string;
  updatedAt: string;
  error?: string;
}

export default function BasicTableOne() {
  const [history, setHistory] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axiosI
      .get<Order[]>("/api/history")
      .then((response) => {
        setHistory(response.data.reverse().slice(0,5));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching history:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="loader"></div>
      </div>
    );
  }
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                URL
              </TableCell>
              {/* <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Type
              </TableCell> */}
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Date
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Status
              </TableCell>
              {/* <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Budget
              </TableCell> */}
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {history.map((order) => (
              <TableRow key={order._id}>
                <TableCell className="px-5 py-4 sm:px-6 text-start max-w-[100px] sm:max-w-[20vw]">
                  <div className="flex items-center gap-3">
                    {/* User Image can go here */}
                    <div className="max-w-full overflow-hidden">
                      <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90 truncate">
                        {order.url}
                      </span>
                    </div>
                  </div>
                </TableCell>
                {/* <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {order.projectName}
                </TableCell> */}
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <div className="flex -space-x-2">
                    <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                      {order.createdAt.split("T")[0]}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <Badge
                    size="sm"
                    color={order.result === "Safe" ? "success" : "error"}
                  >
                    {order.result}
                  </Badge>
                </TableCell>
                {/* <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {order.budget}
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
