import { FC } from "react";

export const ListLoader: FC<{
  count?: number;
}> = ({ count = 6 }) => {
  return (
    <div
      role="status"
      className="animate-pulse divide-y divide-gray-200 px-4 shadow dark:divide-gray-700 dark:border-gray-700"
    >
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="flex items-center justify-between py-4">
          <div>
            <div className="mb-2.5 h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
            <div className="h-2 w-32 rounded-full bg-gray-200 dark:bg-gray-700"></div>
          </div>
          <div className="h-2.5 w-12 rounded-full bg-gray-300 dark:bg-gray-700"></div>
        </div>
      ))}
    </div>
  );
};
