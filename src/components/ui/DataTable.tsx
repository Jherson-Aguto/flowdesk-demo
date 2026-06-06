import React, { useState, useMemo } from 'react';
import { Search, ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react';

export interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  align?: 'left' | 'center' | 'right';
  className?: string;
}

interface FilterConfig<T> {
  label: string;
  field: keyof T;
  options: { label: string; value: string }[];
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  searchPlaceholder?: string;
  searchFields?: (keyof T)[];
  filters?: FilterConfig<T>[];
  actions?: (item: T) => React.ReactNode;
  emptyMessage?: string;
}

export function DataTable<T extends { id: string | number }>({
  data,
  columns,
  searchPlaceholder = 'Search records...',
  searchFields = [],
  filters = [],
  actions,
  emptyMessage = 'No matching records found'
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8);

  // Filter and Search
  const filteredData = useMemo(() => {
    return data.filter(item => {
      // 1. Search Query Vetting
      if (searchQuery.trim() !== '' && searchFields.length > 0) {
        const matchesSearch = searchFields.some(field => {
          const val = item[field];
          if (val === undefined || val === null) return false;
          return String(val).toLowerCase().includes(searchQuery.toLowerCase());
        });
        if (!matchesSearch) return false;
      }

      // 2. Dropdown Category Filtering
      for (const filter of filters) {
        const selectedValue = selectedFilters[String(filter.field)];
        if (selectedValue && selectedValue !== 'all') {
          if (String(item[filter.field]).toLowerCase() !== selectedValue.toLowerCase()) {
            return false;
          }
        }
      }

      return true;
    });
  }, [data, searchQuery, searchFields, filters, selectedFilters]);

  // Reset pagination on search/filter update
  useMemo(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedFilters]);

  // Paginated Slices
  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));
  const paginatedData = useMemo(() => {
    const startIdx = (currentPage - 1) * pageSize;
    return filteredData.slice(startIdx, startIdx + pageSize);
  }, [filteredData, currentPage, pageSize]);

  const handleFilterChange = (field: string, value: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getAlignClass = (align?: 'left' | 'center' | 'right') => {
    if (align === 'center') return 'text-center';
    if (align === 'right') return 'text-right';
    return 'text-left';
  };

  return (
    <div className="space-y-4">
      {/* Search and Filters Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Search Input */}
        {searchFields.length > 0 && (
          <div className="relative flex-1 max-w-md">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              <Search className="h-4 w-4" />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full rounded-xl border border-slate-200 bg-white py-2 pr-4 pl-9 text-sm text-slate-600 outline-none transition-all focus:border-blue-500 focus:ring-1 focus:ring-blue-500/10 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:focus:border-blue-500"
            />
          </div>
        )}

        {/* Dynamic Filters */}
        {filters.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-slate-400 dark:text-slate-500 flex items-center gap-1 text-xs font-semibold mr-1">
              <SlidersHorizontal className="h-3.5 w-3.5" /> Filters
            </span>
            {filters.map((filter) => (
              <select
                key={String(filter.field)}
                value={selectedFilters[String(filter.field)] || 'all'}
                onChange={(e) => handleFilterChange(String(filter.field), e.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 outline-none transition-all focus:border-blue-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
              >
                <option value="all">All {filter.label}</option>
                {filter.options.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            ))}
          </div>
        )}
      </div>

      {/* Main Table Card */}
      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-xs soft-shadow dark:border-slate-800/80 dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="w-full min-w-max border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70 text-xs font-semibold tracking-wider text-slate-400 select-none dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-500">
                {columns.map((col, idx) => (
                  <th
                    key={idx}
                    className={`px-6 py-4 font-bold ${getAlignClass(col.align)} ${col.className || ''}`}
                  >
                    {col.header}
                  </th>
                ))}
                {actions && <th className="px-6 py-4 font-bold text-right">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm dark:divide-slate-800/60">
              {paginatedData.length > 0 ? (
                paginatedData.map((item) => (
                  <tr 
                    key={item.id}
                    className="group transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-800/20"
                  >
                    {columns.map((col, idx) => {
                      const value = typeof col.accessor === 'function'
                        ? col.accessor(item)
                        : (item[col.accessor] as React.ReactNode);

                      return (
                        <td
                          key={idx}
                          className={`px-6 py-3.5 text-slate-600 dark:text-slate-300 ${getAlignClass(col.align)} ${col.className || ''}`}
                        >
                          {value}
                        </td>
                      );
                    })}
                    {actions && (
                      <td className="px-6 py-3.5 text-right font-medium">
                        <div className="flex justify-end gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                          {actions(item)}
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length + (actions ? 1 : 0)}
                    className="px-6 py-12 text-center text-slate-400 dark:text-slate-500 font-medium"
                  >
                    {emptyMessage}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Pagination Footer */}
        {filteredData.length > pageSize && (
          <div className="flex items-center justify-between border-t border-slate-100 bg-white px-6 py-4 dark:border-slate-800 dark:bg-slate-900">
            <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
              Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, filteredData.length)} of {filteredData.length} entries
            </span>
            <div className="flex items-center gap-1.5">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-100 text-slate-500 disabled:opacity-40 disabled:hover:bg-transparent hover:bg-slate-50 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-800"
              >
                <ChevronLeft className="h-4.5 w-4.5" />
              </button>
              <span className="text-xs font-bold text-slate-600 dark:text-slate-400 px-2 select-none">
                Page {currentPage} of {totalPages}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-100 text-slate-500 disabled:opacity-40 disabled:hover:bg-transparent hover:bg-slate-50 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-800"
              >
                <ChevronRight className="h-4.5 w-4.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
