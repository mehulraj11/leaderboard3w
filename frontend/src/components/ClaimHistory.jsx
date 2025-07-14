import React from "react";
import { Clock } from "lucide-react";
const ClaimHistory = ({ claimHistory }) => {
  // console.log(claimHistory);

  return (
    <>
      {claimHistory.length > 0 && (
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6 border border-red-200">
          <div className="flex items-center gap-2 mb-6">
            <Clock className="w-6 h-6 text-indigo-500" />
            <h2 className="text-2xl font-bold text-gray-800">Recent Claims</h2>
          </div>
          <div className="flex flex-col gap-3 overflow-y-auto h-[400px]">
            {claimHistory.map((entry) => (
              <div
                key={entry._id}
                className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg border border-indigo-200"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-indigo-800">
                    {entry.userId.name}
                  </span>
                  <span className="text-lg font-bold text-green-600">
                    +{entry.points}
                  </span>
                </div>
                <div className="text-sm text-gray-600">{entry.timestamp}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ClaimHistory;
