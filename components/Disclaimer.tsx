import React from 'react';
import { WarningIcon } from './icons';

const Disclaimer: React.FC = () => {
  return (
    <div className="w-full max-w-2xl mt-8 bg-yellow-50 border-2 border-yellow-300 text-yellow-900 px-4 py-3 rounded-lg relative shadow-lg" role="alert">
      <div className="flex items-start">
        <div className="py-1">
          <WarningIcon className="h-6 w-6 text-yellow-500 mr-4"/>
        </div>
        <div>
          <strong className="font-bold">Disclaimer: For Educational Use Only</strong>
          <p className="block sm:inline sm:ml-2 text-sm text-yellow-700">
            Never consume a wild mushroom based on this or any other app's identification. AI is not infallible and misidentification can be fatal. Always consult with a human expert before eating any wild fungi.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;