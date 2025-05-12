import React, { useState } from 'react';
import {
  FiSearch, FiCalendar, FiChevronDown, FiWifi, FiFilter,
  FiHome, FiArrowUp, FiArrowDown, FiRefreshCw, FiX, FiChevronRight, FiCpu, FiList
} from 'react-icons/fi';

const DeviceDataTable = () => {
  // Sample data (same as before)
  const allData = [
    {
      SrNo: 177052,
      System_Timestamp: '2025-05-08 13:27:03',
      Device_No: '2409015',
      Network_Timestamp: '2025-05-08 13:27:34.0000',
      Body_Temperature: '39.17',
      Heart_Rate: 0,
      SpO2: 0,
      Location: '17.634993,75.902125',
      Ideal_Temperature_AT: '38.5',
      Battery: '93',
      NetworkStatus: 'WiFi',
      Device_Status: 'Active',
    },
    ...Array.from({ length: 99 }, (_, i) => ({
      SrNo: 177051 - i,
      System_Timestamp: `2025-05-${String(8 - Math.floor(i / 20)).padStart(2, '0')} ${13 - Math.floor(i / 4)}:${26 - (i % 3)}:${59 - (i % 10)}`,
      Device_No: `24090${15 + (i % 3)}`,
      Network_Timestamp: `2025-05-${String(8 - Math.floor(i / 20)).padStart(2, '0')} ${13 - Math.floor(i / 4)}:${26 - (i % 3)}:${59 - (i % 10)}.${String(1000 + (i * 123) % 9000).substring(1)}`,
      Body_Temperature: `${38 + Math.random() * 1.5}`.substring(0, 4),
      Heart_Rate: i % 4 === 0 ? 0 : 60 + Math.floor(Math.random() * 60),
      SpO2: i % 4 === 0 ? 0 : 90 + Math.floor(Math.random() * 10),
      Location: `17.634${990 + (i % 10)},75.902${120 + (i % 10)}`,
      Ideal_Temperature_AT: `${38 + Math.random() * 0.7}`.substring(0, 4),
      Battery: `${90 - (i % 10)}`,
      NetworkStatus: ['WiFi', '4G', 'LoRa'][i % 3],
      Device_Status: ['Active', 'Inactive', 'Maintenance'][i % 3],
    }))
  ];

  // State management (same as before)
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState({ from: '', to: '' });
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [columnFilters, setColumnFilters] = useState({
    Device_Status: '',
    NetworkStatus: '',
    Battery: '',
    Temperature: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  // Filter and sort data (same as before)
  const filteredData = allData.filter(item => {
    const matchesSearch = Object.values(item).some(val =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    );

    const itemDate = new Date(item.System_Timestamp);
    const fromDate = dateFilter.from ? new Date(dateFilter.from) : null;
    const toDate = dateFilter.to ? new Date(dateFilter.to) : null;
    const matchesDate = (!fromDate || itemDate >= fromDate) &&
      (!toDate || itemDate <= new Date(toDate.getTime() + 86400000));

    const matchesDeviceStatus = !columnFilters.Device_Status ||
      item.Device_Status === columnFilters.Device_Status;
    const matchesNetworkStatus = !columnFilters.NetworkStatus ||
      item.NetworkStatus === columnFilters.NetworkStatus;

    const matchesBattery = !columnFilters.Battery || (
      columnFilters.Battery === 'low' ? parseInt(item.Battery) < 20 :
        columnFilters.Battery === 'medium' ? parseInt(item.Battery) >= 20 && parseInt(item.Battery) < 50 :
          parseInt(item.Battery) >= 50
    );

    const matchesTemperature = !columnFilters.Temperature || (
      columnFilters.Temperature === 'high' ? parseFloat(item.Body_Temperature) > 39.5 :
        columnFilters.Temperature === 'low' ? parseFloat(item.Body_Temperature) < 38.0 :
          parseFloat(item.Body_Temperature) >= 38.0 && parseFloat(item.Body_Temperature) <= 39.5
    );

    return matchesSearch && matchesDate && matchesDeviceStatus &&
      matchesNetworkStatus && matchesBattery && matchesTemperature;
  });

  const sortedData = React.useMemo(() => {
    let sortableData = [...filteredData];
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
  }, [filteredData, sortConfig]);

  // Pagination (same as before)
  const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Helper functions (same as before)
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleColumnFilter = (column, value) => {
    setColumnFilters(prev => ({ ...prev, [column]: value }));
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setDateFilter({ from: '', to: '' });
    setColumnFilters({
      Device_Status: '',
      NetworkStatus: '',
      Battery: '',
      Temperature: ''
    });
    setSortConfig({ key: null, direction: 'asc' });
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-4">
      {/* Header with Breadcrumb (same as before) */}
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
                <a href="#" className="ml-1 text-sm font-medium text-white hover:text-gray-200 md:ml-2">SNB Data</a>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <FiChevronRight className="h-4 w-4 text-gray-200" />
                <span className="ml-1 text-sm font-medium text-gray-200 md:ml-2">Data </span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Search and Filter Bar */}
        <div className="p-4 border-b bg-purple-50 border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-xl font-semibold text-purple-800">Device Data</h2>

          <div className="relative flex-1 max-w-xl">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search devices..."
              className="pl-10 w-full border border-gray-300 rounded-lg py-1 px-4 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${showFilters ? 'bg-purple-100 text-purple-700' : 'bg-purple-600 text-white hover:bg-purple-700'}`}
            >
              <FiFilter />
              <span>Filters</span>
            </button>

            <button
              onClick={resetFilters}
              className="flex items-center gap-2 px-3 py-2 text-gray-700 rounded-lg bg-gray-100 hover:bg-gray-200"
            >
              <FiRefreshCw />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="p-4 sm:p-6 border-b border-gray-200 bg-white/60 backdrop-blur-sm transition-all duration-300">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {/* Date Range */}
              <div className="space-y-0">
                <label className="text-sm font-semibold text-gray-700 flex items-center">
                  <FiCalendar className="text-purple-500" /> Date Range
                </label>
                <div className="flex py-1.5 sm:flex-row">
                  <div className="relative flex-1">
                    <input
                      type="date"
                      className="w-11/12 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-purple-400 outline-none"
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
                      className="w-11/12 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-purple-400 outline-none"
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

              {/* Device Status */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <FiCpu className="text-green-500" /> Device Status
                </label>
                <select
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-green-400 outline-none"
                  value={columnFilters.Device_Status}
                  onChange={(e) => handleColumnFilter('Device_Status', e.target.value)}
                >
                  <option value="">All Statuses</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Maintenance">Maintenance</option>
                </select>
              </div>

              {/* Network Status */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <FiWifi className="text-blue-500" /> Network Status
                </label>
                <select
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
                  value={columnFilters.NetworkStatus}
                  onChange={(e) => handleColumnFilter('NetworkStatus', e.target.value)}
                >
                  <option value="">All Networks</option>
                  <option value="WiFi">WiFi</option>
                  <option value="4G">4G</option>
                  <option value="LoRa">LoRa</option>
                </select>
              </div>

              {/* Rows Per Page */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <FiList className="text-indigo-500" /> Rows Per Page
                </label>
                <select
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400 outline-none"
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

        {/* Table Container (same as before) */}
        <div className="overflow-x-auto scrollbar-hide">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-purple-50">
              <tr>
                {['SrNo', 'System_Timestamp', 'Device_No', 'Network_Timestamp', 'Body_Temperature', 'Heart_Rate', 'SpO2', 'Location', 'Ideal_Temperature', 'Battery', 'NetworkStatus', 'Device_Status'].map((key) => (
                  <th
                    key={key}
                    className="px-4 py-3 text-left text-xs font-bold text-purple-800 uppercase tracking-wider cursor-pointer hover:bg-purple-100 group"
                    onClick={() => requestSort(key)}
                  >
                    <div className="flex items-center justify-between">
                      <span>{key.replace(/_/g, ' ')}</span>
                      <div className="ml-2 flex flex-col">
                        <FiArrowUp
                          className={`h-3 w-3 mb-0.5 ${sortConfig.key === key && sortConfig.direction === 'asc' ? 'text-purple-600' : 'text-gray-300 group-hover:text-gray-400'}`}
                        />
                        <FiArrowDown
                          className={`h-3 w-3 ${sortConfig.key === key && sortConfig.direction === 'desc' ? 'text-purple-600' : 'text-gray-300 group-hover:text-gray-400'}`}
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
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.SrNo}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{item.System_Timestamp}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-purple-600">{item.Device_No}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{item.Network_Timestamp}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <span className={`inline-block w-2 h-2 rounded-full mr-2 ${parseFloat(item.Body_Temperature) > 39.5 ? 'bg-red-500' :
                          parseFloat(item.Body_Temperature) < 38.0 ? 'bg-blue-500' : 'bg-green-500'
                          }`}></span>
                        <span className={`font-medium ${parseFloat(item.Body_Temperature) > 39.5 ? 'text-red-600' :
                          parseFloat(item.Body_Temperature) < 38.0 ? 'text-blue-600' : 'text-green-600'
                          }`}>
                          {item.Body_Temperature} °C
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`font-medium ${item.Heart_Rate === 0 ? 'text-gray-400' :
                        item.Heart_Rate > 100 ? 'text-red-600' :
                          item.Heart_Rate < 60 ? 'text-blue-600' : 'text-green-600'
                        }`}>
                        {item.Heart_Rate === 0 ? '--' : item.Heart_Rate}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`font-medium ${item.SpO2 === 0 ? 'text-gray-400' :
                        item.SpO2 < 95 ? 'text-yellow-600' : 'text-green-600'
                        }`}>
                        {item.SpO2 === 0 ? '--' : `${item.SpO2}%`}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-purple-600 hover:text-purple-800 text-xs underline">
                        View Map
                      </button>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{item.Ideal_Temperature_AT} °C</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`font-medium ${parseInt(item.Battery) < 20 ? 'text-red-600' :
                        parseInt(item.Battery) < 50 ? 'text-yellow-600' : 'text-green-600'
                        }`}>
                        {item.Battery}%
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <FiWifi className={`mr-1 ${item.NetworkStatus === 'WiFi' ? 'text-green-500' :
                          item.NetworkStatus === '4G' ? 'text-blue-500' : 'text-purple-500'
                          }`} />
                        {item.NetworkStatus}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`px-2 py-1 rounded-full text-xs ${item.Device_Status === 'Active' ? 'bg-green-100 text-green-800' :
                        item.Device_Status === 'Inactive' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                        {item.Device_Status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={12} className="px-6 py-4 text-center text-sm text-gray-500">
                    No records found matching your filters
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination and Rows Per Page */}
        <div className="bg-white px-4 py-3 flex flex-col sm:flex-row justify-between items-center border-t border-gray-200 gap-3">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">{(currentPage - 1) * rowsPerPage + 1}</span> to{' '}
            <span className="font-medium">{Math.min(currentPage * rowsPerPage, sortedData.length)}</span> of{' '}
            <span className="font-medium">{sortedData.length}</span> results
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">Rows:</span>
              <select
                className="border border-gray-300 rounded-md py-1 px-2 text-sm w-16"
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

            <div className="flex">
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="px-2 py-1 border border-gray-300 rounded-l-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                «
              </button>
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-2 py-1 border-t border-b border-gray-300 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                ‹
              </button>
              <span className="px-2 py-1 border-t border-b border-gray-300 text-sm font-medium text-gray-700 bg-white">
                {currentPage}
              </span>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-2 py-1 border-t border-b border-gray-300 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                ›
              </button>
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="px-2 py-1 border border-gray-300 rounded-r-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                »
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceDataTable;