import React, { useState } from 'react';
import { 
  FiCalendar, 
  FiFilter, 
  FiChevronDown, 
  FiChevronRight, 
  FiHome, 
  FiArrowUp, 
  FiArrowDown, 
  FiSearch,
  FiX,
  FiRefreshCw
} from 'react-icons/fi';

// Extended sample data with 5 additional columns
const tableData = [
  {
    SRNO: 1536,
    DEVICE_ID: 'NB-001',
    ANIMAL_ID: 'A-1001',
    ANIMAL_TYPE: 'Cow',
    LOCATION: 'Farm A',
    SYSTEM_TIMESTAMP: '04/16/2025 12:16:01',
    DEVICE_NO: 'p25014',
    ESP_SRNO: 'ESP32-D0WD Rev 301',
    BODY_TEMPERATURE: '43.31',
    HEART_RATE: 125,
    SPO2: 100,
    ACTIVITY_LEVEL: 'High',
    FEED_INTAKE: '3.2',
    WATER_CONSUMPTION: '15.5',
    MILK_PRODUCTION: '8.2',
    GPS_COORDINATES: '28.6139° N, 77.2090° E'
  },
  // Add more data entries following the same structure
  ...Array.from({ length: 19 }, (_, i) => ({
    SRNO: 1535 - i,
    DEVICE_ID: `NB-${String(100 + i).padStart(3, '0')}`,
    ANIMAL_ID: `A-${1000 + i}`,
    ANIMAL_TYPE: ['Cow', 'Buffalo', 'Goat', 'Sheep', 'Horse'][i % 5],
    LOCATION: ['Farm A', 'Farm B', 'Farm C', 'Pasture'][i % 4],
    SYSTEM_TIMESTAMP: `04/${15 - Math.floor(i / 3)}/2025 ${10 + (i % 5)}:${String(30 - (i % 30)).padStart(2, '0')}:${String(59 - (i % 59)).padStart(2, '0')}`,
    DEVICE_NO: `p${25014 - i}`,
    ESP_SRNO: 'ESP32-D0WD Rev 301',
    BODY_TEMPERATURE: `${(42 + Math.random() * 2).toFixed(2)}`,
    HEART_RATE: 60 + Math.floor(Math.random() * 100),
    SPO2: 90 + Math.floor(Math.random() * 10),
    ACTIVITY_LEVEL: ['Low', 'Medium', 'High'][i % 3],
    FEED_INTAKE: `${(2 + Math.random() * 2).toFixed(1)}`,
    WATER_CONSUMPTION: `${(10 + Math.random() * 10).toFixed(1)}`,
    MILK_PRODUCTION: i % 5 === 0 ? 'N/A' : `${(5 + Math.random() * 5).toFixed(1)}`,
    GPS_COORDINATES: `${(28 + Math.random()).toFixed(4)}° N, ${(77 + Math.random()).toFixed(4)}° E`
  }))
];

const AnimalDetail = () => {
  const [dateFilter, setDateFilter] = useState({
    from: '',
    to: ''
  });
  const [columnFilters, setColumnFilters] = useState({
    ANIMAL_ID: '',
    ANIMAL_TYPE: '',
    LOCATION: '',
    ACTIVITY_LEVEL: ''
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [showFilters, setShowFilters] = useState(false);

  const handleDateFilterChange = (e) => {
    const { name, value } = e.target;
    setDateFilter(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleColumnFilter = (key, value) => {
    setColumnFilters(prev => ({
      ...prev,
      [key]: value
    }));
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setDateFilter({ from: '', to: '' });
    setColumnFilters({
      ANIMAL_ID: '',
      ANIMAL_TYPE: '',
      LOCATION: '',
      ACTIVITY_LEVEL: ''
    });
    setSearchQuery('');
    setCurrentPage(1);
  };

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = React.useMemo(() => {
    let sortableData = [...tableData];
    if (sortConfig.key) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [tableData, sortConfig]);

  const filteredData = sortedData.filter(item => {
    // Date filter
    if (dateFilter.from || dateFilter.to) {
      const itemDate = new Date(item.SYSTEM_TIMESTAMP);
      const fromDate = dateFilter.from ? new Date(dateFilter.from) : null;
      const toDate = dateFilter.to ? new Date(dateFilter.to) : null;

      if (fromDate && itemDate < fromDate) return false;
      if (toDate && itemDate > new Date(toDate.getTime() + 86400000)) return false;
    }

    // Column filters
    for (const [key, value] of Object.entries(columnFilters)) {
      if (value && !item[key].toString().toLowerCase().includes(value.toLowerCase())) {
        return false;
      }
    }

    // Global search
    if (searchQuery) {
      const searchableValues = Object.values(item).join(' ').toLowerCase();
      if (!searchableValues.includes(searchQuery.toLowerCase())) {
        return false;
      }
    }

    return true;
  });

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const columns = [
    { key: 'DEVICE_ID', label: 'Device ID' },
    { key: 'ANIMAL_ID', label: 'Animal ID' },
    { key: 'ANIMAL_TYPE', label: 'Type' },
    { key: 'LOCATION', label: 'Location' },
    { key: 'SYSTEM_TIMESTAMP', label: 'Timestamp' },
    { key: 'BODY_TEMPERATURE', label: 'Temp (°C)' },
    { key: 'HEART_RATE', label: 'Heart Rate' },
    { key: 'SPO2', label: 'SPO2' },
    { key: 'ACTIVITY_LEVEL', label: 'Activity' },
    { key: 'FEED_INTAKE', label: 'Feed (kg)' },
    { key: 'WATER_CONSUMPTION', label: 'Water (L)' },
    { key: 'MILK_PRODUCTION', label: 'Milk (L)' },
    { key: 'GPS_COORDINATES', label: 'Location' }
  ];

  // Get unique values for filter dropdowns
  const uniqueAnimalTypes = [...new Set(tableData.map(item => item.ANIMAL_TYPE))];
  const uniqueLocations = [...new Set(tableData.map(item => item.LOCATION))];
  const uniqueActivityLevels = [...new Set(tableData.map(item => item.ACTIVITY_LEVEL))];

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      {/* Header with Breadcrumb */}
      <div className='bg-gradient-to-r from-purple-700 to-purple-900 text-white rounded-xl p-3 mb-4'>
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <a href="#" className="inline-flex items-center text-sm font-medium text-white hover:text-gray-200">
                <FiHome className="mr-2 h-4 w-4" />
                Dashboard
              </a>
            </li>
            <li>
              <div className="flex items-center">
                <FiChevronRight className="h-4 w-4 text-gray-200" />
                <a href="#" className="ml-1 text-sm font-medium text-white hover:text-gray-200 md:ml-2">Animal Details</a>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <FiChevronRight className="h-4 w-4 text-gray-200" />
                <span className="ml-1 text-sm font-medium text-gray-200 md:ml-2">Data Sheet</span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Filter Controls */}
        <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-purple-50">
          <h2 className="text-xl font-semibold text-purple-800">Animal Health Monitoring Data</h2>
          <div className="relative flex-1 max-w-xl">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search devices..."
              className="pl-10 w-full border border-gray-300 rounded-lg py-1 px-4 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 outline-none"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${showFilters ? 'bg-purple-100 text-purple-700' : 'bg-purple-600 text-white hover:bg-purple-700'}`}
            >
              <FiFilter />
              <span className="hidden sm:inline">Filters</span>
            </button>
            <button
              onClick={resetFilters}
              className="flex items-center gap-2 px-3 py-2 text-gray-700 rounded-lg bg-gray-100 hover:bg-gray-200"
            >
              <FiRefreshCw />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="p-4 border-b border-gray-200 bg-white/90 backdrop-blur-sm transition-all duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Date Range */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <FiCalendar className="text-purple-500" /> Date Range
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="date"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-purple-400 outline-none"
                      value={dateFilter.from}
                      onChange={(e) => setDateFilter({ ...dateFilter, from: e.target.value })}
                    />
                    {dateFilter.from && (
                      <button
                        onClick={() => setDateFilter({ ...dateFilter, from: '' })}
                        className="absolute top-2.5 right-2 text-gray-400 hover:text-red-400"
                      >
                        <FiX size={16} />
                      </button>
                    )}
                  </div>
                  <div className="relative flex-1">
                    <input
                      type="date"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-purple-400 outline-none"
                      value={dateFilter.to}
                      onChange={(e) => setDateFilter({ ...dateFilter, to: e.target.value })}
                    />
                    {dateFilter.to && (
                      <button
                        onClick={() => setDateFilter({ ...dateFilter, to: '' })}
                        className="absolute top-2.5 right-2 text-gray-400 hover:text-red-400"
                      >
                        <FiX size={16} />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Animal ID */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Animal ID</label>
                <input
                  type="text"
                  placeholder="Filter by Animal ID"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-purple-400 outline-none"
                  value={columnFilters.ANIMAL_ID}
                  onChange={(e) => handleColumnFilter('ANIMAL_ID', e.target.value)}
                />
              </div>

              {/* Animal Type */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Animal Type</label>
                <select
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-purple-400 outline-none"
                  value={columnFilters.ANIMAL_TYPE}
                  onChange={(e) => handleColumnFilter('ANIMAL_TYPE', e.target.value)}
                >
                  <option value="">All Types</option>
                  {uniqueAnimalTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Location</label>
                <select
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-purple-400 outline-none"
                  value={columnFilters.LOCATION}
                  onChange={(e) => handleColumnFilter('LOCATION', e.target.value)}
                >
                  <option value="">All Locations</option>
                  {uniqueLocations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>

              {/* Activity Level */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Activity Level</label>
                <select
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-purple-400 outline-none"
                  value={columnFilters.ACTIVITY_LEVEL}
                  onChange={(e) => handleColumnFilter('ACTIVITY_LEVEL', e.target.value)}
                >
                  <option value="">All Levels</option>
                  {uniqueActivityLevels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>

              {/* Rows Per Page */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Rows Per Page</label>
                <select
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-purple-400 outline-none"
                  value={rowsPerPage}
                  onChange={(e) => {
                    setRowsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Table with Hidden Scrollbar */}
        <div className="overflow-x-auto scrollbar-hide">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-purple-50">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className="px-4 py-3 text-left text-xs font-bold text-purple-800 uppercase tracking-wider cursor-pointer hover:bg-purple-100 group"
                    onClick={() => requestSort(column.key)}
                  >
                    <div className="flex items-center justify-between">
                      <span>{column.label}</span>
                      <div className="ml-2 flex flex-col">
                        <FiArrowUp
                          className={`h-3 w-3 mb-0.5 ${sortConfig.key === column.key && sortConfig.direction === 'asc' ? 'text-purple-600' : 'text-gray-300 group-hover:text-gray-400'}`}
                        />
                        <FiArrowDown
                          className={`h-3 w-3 ${sortConfig.key === column.key && sortConfig.direction === 'desc' ? 'text-purple-600' : 'text-gray-300 group-hover:text-gray-400'}`}
                        />
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedData.length > 0 ? (
                paginatedData.map((item, index) => (
                  <tr key={index} className="hover:bg-purple-50 transition-colors">
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.DEVICE_ID}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{item.ANIMAL_ID}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`px-2 py-1 rounded-full text-xs ${item.ANIMAL_TYPE === 'Cow' ? 'bg-purple-100 text-purple-800' :
                        item.ANIMAL_TYPE === 'Buffalo' ? 'bg-blue-100 text-blue-800' :
                          item.ANIMAL_TYPE === 'Goat' ? 'bg-green-100 text-green-800' :
                            item.ANIMAL_TYPE === 'Sheep' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                        }`}>
                        {item.ANIMAL_TYPE}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{item.LOCATION}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{item.SYSTEM_TIMESTAMP}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <span className={`inline-block w-2 h-2 rounded-full mr-2 ${parseFloat(item.BODY_TEMPERATURE) > 42.5 ? 'bg-red-500' : 'bg-green-500'
                          }`}></span>
                        <span className={`font-medium ${parseFloat(item.BODY_TEMPERATURE) > 42.5 ? 'text-red-600' : 'text-green-600'
                          }`}>
                          {item.BODY_TEMPERATURE} °C
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <div className="w-12 bg-gray-200 rounded-full h-2 mr-2">
                          <div
                            className={`h-2 rounded-full ${item.HEART_RATE > 120 ? 'bg-red-500' :
                              item.HEART_RATE < 80 ? 'bg-blue-500' : 'bg-green-500'
                              }`}
                            style={{ width: `${Math.min(100, item.HEART_RATE / 2)}%` }}
                          ></div>
                        </div>
                        <span className={`font-medium ${item.HEART_RATE > 120 ? 'text-red-600' :
                          item.HEART_RATE < 80 ? 'text-blue-600' : 'text-green-600'
                          }`}>
                          {item.HEART_RATE}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`font-medium ${item.SPO2 < 95 ? 'text-yellow-600' : 'text-green-600'
                        }`}>
                        {item.SPO2}%
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`px-2 py-1 rounded-full text-xs ${item.ACTIVITY_LEVEL === 'High' ? 'bg-green-100 text-green-800' :
                        item.ACTIVITY_LEVEL === 'Medium' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                        {item.ACTIVITY_LEVEL}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{item.FEED_INTAKE} kg</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{item.WATER_CONSUMPTION} L</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.MILK_PRODUCTION === 'N/A' ? (
                        <span className="text-gray-400">N/A</span>
                      ) : (
                        <span className="text-indigo-600 font-medium">{item.MILK_PRODUCTION} L</span>
                      )}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-purple-600 hover:text-purple-800 text-xs underline">
                        View Map
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="px-6 py-4 text-center text-sm text-gray-500">
                    No records found matching your filters
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{(currentPage - 1) * rowsPerPage + 1}</span> to{' '}
                <span className="font-medium">{Math.min(currentPage * rowsPerPage, filteredData.length)}</span> of{' '}
                <span className="font-medium">{filteredData.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">First</span>
                  «
                </button>
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Previous</span>
                  ‹
                </button>

                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${currentPage === pageNum
                        ? 'z-10 bg-purple-50 border-purple-500 text-purple-600'
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                        }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Next</span>
                  ›
                </button>
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Last</span>
                  »
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimalDetail;