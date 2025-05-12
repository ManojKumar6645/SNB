import { FaHeartbeat, FaRegClock, FaBatteryThreeQuarters, FaTemperatureHigh, FaMapMarkerAlt, } from 'react-icons/fa';
import { IoMdAlert } from 'react-icons/io';
import { GiFarmTractor } from 'react-icons/gi';
import { GoGraph } from 'react-icons/go';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import dog from '../assets/images/animal.png'
// Custom SVG Icons for Animals
const CattleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current text-yellow-600">
    <path d="M12 5c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-3c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8.5c-1.9 0-3.5-1.6-3.5-3.5S10.1 6.5 12 6.5s3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5zm7.5 2.5h-1v-1h1v1zm-15 0h-1v-1h1v1zm13.5-5.5c0-.8-.7-1.5-1.5-1.5s-1.5.7-1.5 1.5.7 1.5 1.5 1.5 1.5-.7 1.5-1.5zm-9 0c0-.8-.7-1.5-1.5-1.5s-1.5.7-1.5 1.5.7 1.5 1.5 1.5 1.5-.7 1.5-1.5zM12 22c-1.1 0-2-.9-2-2h4c0 1.1-.9 2-2 2z" />
  </svg>
);

const DogIcon = () => (
  <img
    src={dog}
    alt="Dog Icon"
    className="w-6 h-6 text-amber-600"
  />
);


const CatIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current text-gray-600">
    <path d="M12 12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm6-1.8C18 6.57 15.35 4 12 4s-6 2.57-6 6.2c0 2.34 1.95 5.44 6 9.14 4.05-3.7 6-6.8 6-9.14zM12 2c4.2 0 8 3.22 8 8.2 0 3.32-2.67 7.25-8 11.8-5.33-4.55-8-8.48-8-11.8C4 5.22 7.8 2 12 2z" />
  </svg>
);

const HorseIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current text-red-600">
    <path d="M19 5h-1.8c-.4-1.2-1.5-2-2.7-2H12c-1.7 0-3 1.3-3 3v1H7v3h2v2H7v3h3v2H7v3h3v-1h4v1h3v-3h-3v-2h3v-3h-2v-2h2V8h-2V7c0-.6.4-1 1-1h2.5c.8 0 1.5.7 1.5 1.5V13h1v-2h1c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2z" />
  </svg>
);

const PoultryIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current text-blue-600">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
    <circle cx="8.5" cy="10.5" r="1.5" />
    <circle cx="15.5" cy="10.5" r="1.5" />
    <path d="M12 16c-1.48 0-2.75-.81-3.45-2H6.88c.8 2.05 2.79 3.5 5.12 3.5s4.32-1.45 5.12-3.5h-1.67c-.7 1.19-1.97 2-3.45 2z" />
  </svg>
);

const Dashboard = () => {
  // Sample data - replace with your actual data
  const stats = {
    totalDevices: 584,
    active: 487,
    inactive: 97,
    healthy: 412,
    unhealthy: 75,
    batteryLow: 63,
    lastUpdated: '2 minutes ago'
  };

  const animalDistribution = [
    { type: 'Cattle', count: 215, icon: <CattleIcon /> },
    { type: 'Dogs', count: 143, icon: <DogIcon /> },
    { type: 'Cats', count: 98, icon: <CatIcon /> },
    { type: 'Horses', count: 67, icon: <HorseIcon /> },
    { type: 'Poultry', count: 61, icon: <PoultryIcon /> }
  ];

  const alertTypes = [
    { type: 'Health Alert', count: 28, icon: <IoMdAlert className="text-red-500 text-2xl" /> },
    { type: 'Geo-fence Breach', count: 15, icon: <FaMapMarkerAlt className="text-yellow-500 text-2xl" /> },
    { type: 'Low Battery', count: 63, icon: <FaBatteryThreeQuarters className="text-orange-500 text-2xl" /> },
    { type: 'Temperature Alert', count: 9, icon: <FaTemperatureHigh className="text-purple-500 text-2xl" /> }
  ];

  // Animation variants
  const cardVariants = {
    offscreen: { y: 20, opacity: 0 },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.2,
        duration: 0.4
      }
    }
  };

  const statCardVariants = {
    hover: { scale: 1.01, transition: { duration: 0.2 } },
    tap: { scale: 0.98 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <motion.header
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
          Animal Smart Neckband Dashboard
        </h3>
        <p className="text-gray-600 flex items-center gap-2 mt-1 text-sm">
          <FaRegClock className="text-indigo-500" /> Last updated: {stats.lastUpdated}
        </p>
      </motion.header>

      {/* Main Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Devices */}
        <motion.div
          className="bg-white rounded-xl shadow-lg p-6 flex items-center border-l-4 border-indigo-500 hover:shadow-xl transition-shadow"
          variants={statCardVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <div className="bg-indigo-100 p-4 rounded-full mr-4">
            <GiFarmTractor className="text-indigo-600 text-2xl" />
          </div>
          <div>
            <p className="text-gray-500">Total Devices</p>
            <h3 className="text-xl font-bold">{stats.totalDevices}</h3>
          </div>
        </motion.div>

        {/* Active Devices */}
        <motion.div
          className="bg-white rounded-xl shadow-lg p-6 flex items-center border-l-4 border-green-500 hover:shadow-xl transition-shadow"
          variants={statCardVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <div className="bg-green-100 p-4 rounded-full mr-4">
            <FaHeartbeat className="text-green-600 text-2xl" />
          </div>
          <div>
            <p className="text-gray-500">Active Devices</p>
            <h3 className="text-xl font-bold">{stats.active}</h3>
            <p className="text-sm text-green-600">{Math.round((stats.active / stats.totalDevices) * 100)}% of total</p>
          </div>
        </motion.div>

        {/* Healthy Devices */}
        <motion.div
          className="bg-white rounded-xl shadow-lg p-6 flex items-center border-l-4 border-blue-500 hover:shadow-xl transition-shadow"
          variants={statCardVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <div className="bg-blue-100 p-4 rounded-full mr-4">
            <FaHeartbeat className="text-blue-600 text-2xl" />
          </div>
          <div>
            <p className="text-gray-500">Healthy Animals</p>
            <h3 className="text-xl font-bold">{stats.healthy}</h3>
            <p className="text-sm text-blue-600">{Math.round((stats.healthy / stats.active) * 100)}% of active</p>
          </div>
        </motion.div>

        {/* Alerts */}
        <motion.div
          className="bg-white rounded-xl shadow-lg p-6 flex items-center border-l-4 border-red-500 hover:shadow-xl transition-shadow"
          variants={statCardVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <div className="bg-red-100 p-4 rounded-full mr-4">
            <IoMdAlert className="text-red-600 text-2xl" />
          </div>
          <div>
            <p className="text-gray-500">Unhealthy Animals</p>
            <h3 className="text-xl font-bold">{stats.unhealthy}</h3>
            <p className="text-sm text-red-600">{Math.round((stats.unhealthy / stats.active) * 100)}% of active</p>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Animal Distribution */}
        <motion.div
          className="bg-white rounded-xl shadow-lg p-6 lg:col-span-1 hover:shadow-xl transition-shadow"
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.2 }}
          variants={cardVariants}
        >
          <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
            <span className="bg-indigo-100 p-2 rounded-full">
              <DogIcon className="text-indigo-500" />
            </span>
            Animal Distribution
          </h2>
          <div className="space-y-4">
            {animalDistribution.map((animal, index) => (
              <motion.div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                whileHover={{ x: 5 }}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-full ${animal.type === 'Cattle' ? 'bg-yellow-100' :
                    animal.type === 'Dogs' ? 'bg-amber-100' :
                      animal.type === 'Cats' ? 'bg-gray-100' :
                        animal.type === 'Horses' ? 'bg-red-100' :
                          'bg-blue-100'
                    }`}>
                    {animal.icon}
                  </div>
                  <span className="font-medium">{animal.type}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-800">{animal.count}</span>
                  <span className="text-gray-500 text-sm">
                    ({Math.round((animal.count / stats.totalDevices) * 100)}%)
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Alert Types */}
        <motion.div
          className="bg-white rounded-xl shadow-lg p-6 lg:col-span-1 hover:shadow-xl transition-shadow"
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.2 }}
          variants={cardVariants}
        >
          <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
            <span className="bg-red-100 p-2 rounded-full">
              <IoMdAlert className="text-red-500" />
            </span>
            Alert Types
          </h2>
          <div className="space-y-4">
            {alertTypes.map((alert, index) => (
              <motion.div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                whileHover={{ x: 5 }}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-gray-100 p-3 rounded-full">
                    {alert.icon}
                  </div>
                  <span className="font-medium">{alert.type}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-800">{alert.count}</span>
                  <span className="text-gray-500 text-sm">
                    ({Math.round((alert.count / stats.totalDevices) * 100)}%)
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Status Overview */}
        <motion.div
          className="bg-white rounded-xl shadow-lg p-6 lg:col-span-1 hover:shadow-xl transition-shadow"
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.2 }}
          variants={cardVariants}
        >
          <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
            <span className="bg-indigo-100 p-2 rounded-full">
              <GoGraph className="text-indigo-500" />
            </span>
            Status Overview
          </h2>
          <div className="space-y-6">
            {/* Active/Inactive */}
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Active Devices</span>
                <span className="text-sm font-medium text-green-600">{stats.active}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <motion.div
                  className="bg-green-600 h-2.5 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(stats.active / stats.totalDevices) * 100}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                ></motion.div>
              </div>
            </div>

            {/* Healthy/Unhealthy */}
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Healthy Animals</span>
                <span className="text-sm font-medium text-blue-600">{stats.healthy}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <motion.div
                  className="bg-blue-600 h-2.5 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(stats.healthy / stats.active) * 100}%` }}
                  transition={{ duration: 1, delay: 0.4 }}
                ></motion.div>
              </div>
            </div>

            {/* Battery Status */}
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Low Battery Devices</span>
                <span className="text-sm font-medium text-orange-500">{stats.batteryLow}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <motion.div
                  className="bg-orange-500 h-2.5 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(stats.batteryLow / stats.totalDevices) * 100}%` }}
                  transition={{ duration: 1, delay: 0.6 }}
                ></motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Device List */}

      {/* Device List */}
      <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">All Devices</h2>

        {/* Table Container with Hidden Scrollbar */}
        <div className="relative w-full overflow-x-auto shadow-lg rounded-lg bg-white ">
          <div className="overflow-x-auto max-h-[70vh] scrollbar-thin scrollbar-thumb-purple-300 scrollbar-hide">
            <table className="min-w-full text-sm text-left text-gray-600">
              <thead className="sticky top-0 z-10 text-xs uppercase bg-purple-50 text-purple-600 font-semibold border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3">Device ID</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Animal</th>
                  <th className="px-6 py-3">Health</th>
                  <th className="px-6 py-3">Battery</th>
                  <th className="px-6 py-3">Last Update</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {[1, 2, 3, 4, 5].map((id) => (
                  <tr
                    key={id}
                    className="hover:bg-purple-50 transition-all duration-200 ease-in-out"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">NB-{id}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full 
                ${id % 5 !== 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-500'}`}
                      >
                        {id % 5 !== 0 ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4">{['Cattle', 'Dog', 'Horse', 'Cat', 'Poultry'][id % 5]}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full 
                ${id % 5 !== 0 ? 'bg-blue-100 text-blue-600' : 'bg-red-100 text-red-500'}`}
                      >
                        {id % 5 !== 0 ? 'Healthy' : 'Unhealthy'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2.5">
                          <div
                            className={`h-2.5 rounded-full 
                    ${id % 5 === 0 ? 'bg-red-500' : id % 5 === 1 ? 'bg-yellow-500' : 'bg-green-500'}`}
                            style={{
                              width: `${id % 5 === 0 ? 15 : id % 5 === 1 ? 35 : 85}%`,
                            }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-500">
                          {id % 5 === 0 ? '15%' : id % 5 === 1 ? '35%' : '85%'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {id % 5 === 0 ? '2 days ago' : '2 hours ago'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>


        <div className="mt-4 text-center">
          <button className="text-indigo-600 hover:text-indigo-900 text-sm font-medium flex items-center justify-center gap-1 mx-auto">
            View all {stats.totalDevices} devices <FiArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;