import React from 'react';

const PercentileTable = ({ data }) => {
  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full border border-gray-300 text-sm text-center">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Percentile</th>
            <th className="border p-2">Total</th>
            <th className="border p-2">1st Half</th>
            <th className="border p-2">2nd Half</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td className="border p-2 font-semibold">{item.category}</td>
              <td className="border p-2">{item.total}</td>
              <td className="border p-2">{item.firstHalf}</td>
              <td className="border p-2">{item.secondHalf}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PercentileTable;
