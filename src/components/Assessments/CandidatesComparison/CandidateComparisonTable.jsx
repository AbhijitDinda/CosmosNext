import React from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

export default function CandidateComparisonTable({ apiResponse }) {
  console.log("assessment_data", apiResponse);

  const { assessment_data, users_data } = apiResponse?.data;

  const testNames = assessment_data?.test_names; // Extract test names dynamically
  const users = users_data; // List of candidates and their results

  return (
    <div className="p-6 bg-gray-50 font-OpenSans">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Candidate Test Results
        </h2>
        <p className="text-sm text-gray-500">
          Below is the list of candidates and their respective test results.
        </p>
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        {users && users.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-200">
            {/* Table Header */}
            <thead className="bg-gray-100">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-xl text-gray-700 uppercase tracking-wider"
                >
                  Candidate Id
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-xl text-gray-700 uppercase tracking-wider"
                >
                  Candidate Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-xl text-gray-700 uppercase tracking-wider"
                >
                  Email
                </th>
                {testNames.map((testName, index) => (
                  <th
                    key={index}
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-xl text-gray-700 uppercase tracking-wider"
                  >
                    {testName}
                  </th>
                ))}
              </tr>
            </thead>
            {/* Table Body */}
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.candidate_id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black text-left">
                    {user.candidate_id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black text-left">
                    {user.user_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-black text-left">
                    {user.user_email}
                  </td>
                  {assessment_data.test_ids.map((testId, index) => (
                    <td
                      key={index}
                      className="px-6 py-4 whitespace-nowrap text-sm text-black text-left"
                    >
                      <ul>
                        {user[`test_${testId}_result`]
                          ? user[`test_${testId}_result`]
                              .split(", ") // Split the string by ", "
                              .map((result, i) => (
                                <li key={i} className="mb-1">
                                  <span></span> {result}
                                </li>
                              ))
                          : "N/A"}
                      </ul>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-4 text-gray-500">
            No Complete candidates found.
          </div>
        )}
      </div>
    </div>
  );
}
