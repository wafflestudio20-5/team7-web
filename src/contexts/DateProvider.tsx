import React, { createContext, useContext, useMemo, useState } from 'react';

type filterType = {
  dateFilter: string;
  setDateFilter: React.Dispatch<React.SetStateAction<string>>;
};
const initialFilter: filterType = {
  dateFilter: '',
  setDateFilter: () => undefined,
};

const dateFilterContext = createContext<filterType>(initialFilter);

export default function DateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [dateFilter, setDateFilter] = useState('today');

  const filterSet = useMemo(
    () => ({
      dateFilter,
      setDateFilter,
    }),
    [dateFilter, setDateFilter]
  );

  return (
    <dateFilterContext.Provider value={filterSet}>
      {children}
    </dateFilterContext.Provider>
  );
}

export function useDateFilter() {
  const value = useContext(dateFilterContext);
  if (value === undefined) {
    throw new Error('context error');
  }
  return value;
}
