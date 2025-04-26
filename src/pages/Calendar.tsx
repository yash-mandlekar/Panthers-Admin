import { useState } from "react";
import ComponentCard from "../components/common/ComponentCard";
import PageMeta from "../components/common/PageMeta";
import Input from "../components/form/input/InputField";
import Label from "../components/form/Label";
import { axiosI } from "../hooks/useAxios";

const Calendar: React.FC = () => {
  const [url, setUrl] = useState("");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleSubmit = () => {
    if (!url) return;
    setLoading(true);
    axiosI
      .post("/api/predict", { url })
      .then((response) => {
        setData(response.data);
        setIsModalOpen(true); // Open modal after getting response
        console.log("Response data:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching prediction:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <PageMeta
        title="Scan URL | PhishShield"
        description="Scan a URL for phishing or safety threats using PhishShield."
      />
      <ComponentCard title="Enter a URL to Scan">
        <div className="space-y-6">
          <div>
            <Label>URL</Label>
            <Input
              type="url"
              value={url}
              onChange={handleUrlChange}
              placeholder="https://example.com"
            />
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`py-2 px-14 rounded-lg shadow-md transition duration-300 ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            >
              {loading ? "Scanning..." : "Scan"}
            </button>
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div
            className="fixed inset-0 z-10 flex items-center justify-center bg-black/50"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md p-6">
              <div className="flex items-center gap-4">
                <div
                  className={`flex items-center justify-center size-12 rounded-full ${
                    data?.prediction === "benign"
                      ? "bg-green-100"
                      : "bg-red-100"
                  }`}
                >
                  {data?.prediction === "benign" ? (
                    <svg
                      className="size-6 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="size-6 text-red-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v3.75m0 3.75h.008v.008H12v-.008zm9.303 3.376c.866 1.5-.217 3.374-1.948 3.374H4.646c-1.73 0-2.813-1.874-1.948-3.374L10.051 3.378c.866-1.5 3.032-1.5 3.898 0l8.354 14.748z"
                      />
                    </svg>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900" id="modal-title">
                    {data?.prediction === "benign" ? "URL is Safe" : "Phishing Detected!"}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {data?.prediction === "benign"
                      ? "The scanned URL appears safe."
                      : "Warning! This URL is suspected to be phishing."}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-md bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </ComponentCard>
    </>
  );
};

export default Calendar;
