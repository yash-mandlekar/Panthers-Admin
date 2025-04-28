import { useEffect, useState } from "react";
import { axiosI } from "../../hooks/useAxios";
import { BoxIconLine, GroupIcon } from "../../icons";

export default function EcommerceMetrics() {
  const [users, setUsers] = useState<number>(0);
  const [history, setHistory] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const getData = async () => {
    try {
      const res = await axiosI.get<any>("/api/users");
      setUsers(res.data.length); // Make sure you use res.data
      const res2 = await axiosI.get<any>("/api/history");
      setHistory(res2.data.length);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        {loading ? (
          <div className="w-full h-full flex items-center justify-center">
            <svg id="loading-svg" viewBox="25 25 50 50">
              <circle r="20" cy="50" cx="50"></circle>
            </svg>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
              <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
            </div>
            <div className="flex items-end justify-between mt-5">
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Customers
                </span>
                <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                  {users}
                </h4>
              </div>
              {/* <Badge color="success">
            <ArrowUpIcon />
            11.01%
          </Badge> */}
            </div>
          </>
        )}
      </div>
      {/* <!-- Metric Item End --> */}

      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        {loading ? (
          <div className="w-full h-full flex items-center justify-center">
            <svg id="loading-svg" viewBox="25 25 50 50">
              <circle r="20" cy="50" cx="50"></circle>
            </svg>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
              <BoxIconLine className="text-gray-800 size-6 dark:text-white/90" />
            </div>
            <div className="flex items-end justify-between mt-5">
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Threat Reports
                </span>
                <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                  {history}
                </h4>
              </div>

              {/* <Badge color="error">
            <ArrowDownIcon />
            9.05%
          </Badge> */}
            </div>
          </>
        )}
      </div>
      {/* <!-- Metric Item End --> */}
    </div>
  );
}
