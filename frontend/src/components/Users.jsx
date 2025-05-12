import React, { useState } from 'react';
import { FiEdit2, FiTrash2, FiPlus, FiArrowUp, FiArrowDown, FiChevronRight, FiHome, FiUser, FiX, FiCheck, FiChevronDown, FiSave, FiAlertTriangle, FiSearch } from 'react-icons/fi';

const Users = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [showAddRoleModal, setShowAddRoleModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [roleAssignment, setRoleAssignment] = useState({
        userId: '',
        role: 'User'
    });
    const [userToDelete, setUserToDelete] = useState(null);
    const [editUserData, setEditUserData] = useState({
        username: '',
        email: '',
        mobile: '',
        address: '',
        role: ''
    });
    const rowsPerPage = 10;

    const roles = ['Admin', 'Editor', 'User'];

    const data = [
        { id: 1, username: 'johndoe', email: 'john@example.com', mobile: '9876543210', address: '123 Main St, City', role: 'Admin' },
        { id: 2, username: 'janesmith', email: 'jane@example.com', mobile: '8765432109', address: '456 Oak Ave, Town', role: 'User' },
        { id: 3, username: 'robertj', email: 'robert@example.com', mobile: '7654321098', address: '789 Pine Rd, Village', role: 'Editor' },
        { id: 4, username: 'alicew', email: 'alice@example.com', mobile: '6543210987', address: '321 Elm Blvd, County', role: 'User' },
        { id: 5, username: 'bobm', email: 'bob@example.com', mobile: '5432109876', address: '654 Maple Ln, District', role: 'User' },

        { id: 5, username: 'bobm', email: 'bob@example.com', mobile: '5432109876', address: '654 Maple Ln, District', role: 'User' },
    ];

    const sortedData = data;
    const totalPages = Math.ceil(sortedData.length / rowsPerPage);

    const handleEditUser = (user) => {
        setSelectedUser(user.id);
        setEditUserData({
            username: user.username,
            email: user.email,
            mobile: user.mobile,
            address: user.address,
            role: user.role
        });
        setShowEditModal(true);
    };

    const handleDeleteClick = (userId) => {
        setUserToDelete(userId);
        setShowDeleteModal(true);
    };

    const handleAddRoleDefine = () => {
        setShowAddRoleModal(true);
    };

    const handleRoleAssignmentChange = (e) => {
        const { name, value } = e.target;
        setRoleAssignment(prev => ({ ...prev, [name]: value }));
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditUserData(prev => ({ ...prev, [name]: value }));
    };

    const handleAssignRole = (e) => {
        e.preventDefault();
        console.log("Role assigned:", roleAssignment);
        // Add your role assignment logic here
        setShowAddRoleModal(false);
        setRoleAssignment({
            userId: '',
            role: 'User'
        });
    };

    const handleUpdateUser = (e) => {
        e.preventDefault();
        console.log("User updated:", editUserData);
        // Add your user update logic here
        setShowEditModal(false);
    };

    const handleConfirmDelete = () => {
        console.log("User deleted:", userToDelete);
        // Add your delete logic here
        setShowDeleteModal(false);
        setUserToDelete(null);
    };

    const paginatedData = sortedData.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    return (
        <div className='min-h-screen bg-gray-50 p-4 md:p-4'>
            <div className="container mx-auto px-4 py-2">
                <div className='bg-gradient-to-r from-purple-700 to-purple-900 text-white rounded-xl p-3 mb-4'>
                    {/* Breadcrumb */}
                    <nav className="flex " aria-label="Breadcrumb">
                        <ol className="inline-flex items-center space-x-1 md:space-x-3">
                            <li className="inline-flex items-center">
                                <a href="#" className="inline-flex items-center text-sm font-medium text-white-700 hover:text-gray-200">
                                    <FiHome className="mr-2 h-4 w-4" />
                                    Home
                                </a>
                            </li>
                            <li>
                                <div className="flex items-center">
                                    <FiChevronRight className="h-4 w-4 text-white-400" />
                                    <a href="#" className="ml-1 text-sm font-medium text-white-700 hover:text-gray-200 md:ml-2">Users</a>
                                </div>
                            </li>
                            <li aria-current="page">
                                <div className="flex items-center">
                                    <FiChevronRight className="h-4 w-4 text-white-400" />
                                    <span className="ml-1 text-sm font-medium text-white-200 md:ml-2">Management</span>
                                </div>
                            </li>
                        </ol>
                    </nav>
                </div>
                {/* Action Buttons */}
                <div className="p-4 border-b bg-purple-50 border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <h2 className="text-xl font-semibold text-purple-800">User Management</h2>
                    <div className="relative flex-1 max-w-xl">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiSearch className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search devices..."
                            className="pl-10 w-full border border-gray-300 rounded-lg py-1 px-4 focus:ring-1 focus:ring-purple-500 focus:border-purple-500  outline-none"
                        />
                    </div>
                    <div className="flex space-x-2">

                        <button
                            onClick={handleAddRoleDefine}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                        >
                            <FiPlus className="mr-2 h-4 w-4" />
                            Define User Role
                        </button>
                    </div>
                </div>

                {/* User Table */}
                <div className="bg-white shadow-lg rounded-xl overflow-hidden">
                    <div className="overflow-x-auto scrollbar-hide">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-purple-50">
                                <tr>
                                    {['SrNo', 'Username', 'Email', 'Mobile', 'Address', 'Role', 'Actions'].map((key) => (
                                        <th
                                            key={key}
                                            className="px-4 py-3 text-left text-xs font-bold text-purple-800 uppercase tracking-wider"
                                        >
                                            <div className="flex items-center justify-between">
                                                <span>{key.replace(/_/g, ' ')}</span>
                                                {key !== 'Actions' && (
                                                    <div className="ml-2 flex flex-col">
                                                        <FiArrowUp
                                                            className="h-3 w-3 mb-0.5 text-gray-300 hover:text-gray-400"
                                                        />
                                                        <FiArrowDown
                                                            className="h-3 w-3 text-gray-300 hover:text-gray-400"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {paginatedData.map((user, index) => (
                                    <tr key={user.id} className="hover:bg-purple-50 transition-colors">
                                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {(currentPage - 1) * rowsPerPage + index + 1}
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {user.username}
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {user.email}
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {user.mobile}
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {user.address}
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <span className={`px-2 py-1 rounded-full text-xs ${user.role === 'Admin' ? 'bg-purple-100 text-purple-800' :
                                                user.role === 'Editor' ? 'bg-blue-100 text-blue-800' :
                                                    'bg-gray-100 text-gray-800'
                                                }`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <div className="flex space-x-2">
                                                <button
                                                    className="text-purple-600 hover:text-purple-800 p-1 rounded-md hover:bg-purple-50"
                                                    title="Edit"
                                                    onClick={() => handleEditUser(user)}
                                                >
                                                    <FiEdit2 className="h-4 w-4" />
                                                </button>
                                                <button
                                                    className="text-red-600 hover:text-red-800 p-1 rounded-md hover:bg-red-50"
                                                    title="Delete"
                                                    onClick={() => handleDeleteClick(user.id)}
                                                >
                                                    <FiTrash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
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
                                    <span className="font-medium">{Math.min(currentPage * rowsPerPage, sortedData.length)}</span> of{' '}
                                    <span className="font-medium">{sortedData.length}</span> results
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

                {/* Add Role Define Modal */}
                {showAddRoleModal && (
                    <div className="fixed z-50 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                            {/* Background overlay */}
                            <div
                                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                                aria-hidden="true"
                                onClick={() => setShowAddRoleModal(false)}
                            ></div>

                            {/* Modal container */}
                            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                {/* Header */}
                                <div className="bg-gradient-to-r from-purple-600 to-purple-600 px-4 py-4 sm:px-4 sm:py-3">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg leading-6 font-medium text-white" id="modal-title">
                                            Assign Role to User
                                        </h3>
                                        <button
                                            onClick={() => setShowAddRoleModal(false)}
                                            className="text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-white"
                                        >
                                            <FiX className="h-6 w-6" />
                                        </button>
                                    </div>
                                </div>

                                {/* Form content */}
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6">
                                    <form onSubmit={handleAssignRole}>
                                        <div className="space-y-6">
                                            {/* User selection */}
                                            <div>
                                                <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-1">
                                                    Select User
                                                    <span className="text-red-500">*</span>
                                                </label>
                                                <div className="mt-1 relative rounded-md shadow-sm">
                                                    <select
                                                        name="userId"
                                                        id="userId"
                                                        value={roleAssignment.userId}
                                                        onChange={handleRoleAssignmentChange}
                                                        className="block w-full pl-3 pr-10 py-3 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md transition"
                                                        required
                                                    >
                                                        <option value="">Select a user</option>
                                                        {data.map(user => (
                                                            <option key={user.id} value={user.id}>
                                                                {user.username} ({user.email})
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>

                                            {/* Role selection */}
                                            <div>
                                                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                                                    Select Role
                                                    <span className="text-red-500">*</span>
                                                </label>
                                                <div className="mt-1 relative rounded-md shadow-sm">
                                                    <select
                                                        name="role"
                                                        id="role"
                                                        value={roleAssignment.role}
                                                        onChange={handleRoleAssignmentChange}
                                                        className="block w-full pl-3 pr-10 py-3 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md transition"
                                                        required
                                                    >
                                                        {roles.map(role => (
                                                            <option key={role} value={role}>
                                                                {role}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action buttons */}
                                        <div className="mt-8 flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-3">
                                            <button
                                                type="button"
                                                onClick={() => setShowAddRoleModal(false)}
                                                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:mt-0 sm:w-auto sm:text-sm transition"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-500 text-base font-medium text-white hover:from-purple-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:w-auto sm:text-sm transition"
                                            >
                                                <span>Assign Role</span>
                                                <FiCheck className="ml-2 h-5 w-5" />
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Edit User Modal */}
                {showEditModal && (
                    <div className="fixed z-50 inset-0 overflow-y-auto" aria-labelledby="edit-user-modal" role="dialog" aria-modal="true">
                        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                            {/* Background overlay with click-to-close */}
                            <div
                                className="fixed inset-0 bg-gray-900 bg-opacity-50 transition-opacity backdrop-blur-sm"
                                aria-hidden="true"
                                onClick={() => setShowEditModal(false)}
                            ></div>

                            {/* Modal container */}
                            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                            <div className="inline-block align-bottom bg-white rounded-t-lg sm:rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
                                {/* Header with gradient background */}
                                <div className="bg-gradient-to-r from-purple-600 to-purple-600 px-3 py-3 sm:px-4 sm:py-3">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xl font-semibold text-white leading-6" id="edit-user-modal">
                                            Edit User Details
                                        </h3>
                                        <button
                                            onClick={() => setShowEditModal(false)}
                                            className="text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-white rounded-full p-1"
                                        >
                                            <FiX className="h-6 w-6" />
                                        </button>
                                    </div>
                                </div>

                                {/* Form content */}
                                <div className="bg-white px-6 py-5 sm:p-6">
                                    <form onSubmit={handleUpdateUser}>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            {/* Username */}
                                            <div className="sm:col-span-1">
                                                <label htmlFor="edit-username" className="block text-sm font-medium text-gray-700 mb-1">
                                                    Username <span className="text-red-500">*</span>
                                                </label>
                                                <div className="mt-1 relative rounded-md shadow-sm">
                                                    <input
                                                        type="text"
                                                        name="username"
                                                        id="edit-username"
                                                        value={editUserData.username}
                                                        onChange={handleEditInputChange}
                                                        className="block w-full pl-4 pr-10 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            {/* Email */}
                                            <div className="sm:col-span-1">
                                                <label htmlFor="edit-email" className="block text-sm font-medium text-gray-700 mb-1">
                                                    Email <span className="text-red-500">*</span>
                                                </label>
                                                <div className="mt-1 relative rounded-md shadow-sm">
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        id="edit-email"
                                                        value={editUserData.email}
                                                        onChange={handleEditInputChange}
                                                        className="block w-full pl-4 pr-10 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            {/* Mobile Number */}
                                            <div className="sm:col-span-1">
                                                <label htmlFor="edit-mobile" className="block text-sm font-medium text-gray-700 mb-1">
                                                    Mobile Number <span className="text-red-500">*</span>
                                                </label>
                                                <div className="mt-1 relative rounded-md shadow-sm">
                                                    <input
                                                        type="tel"
                                                        name="mobile"
                                                        id="edit-mobile"
                                                        value={editUserData.mobile}
                                                        onChange={handleEditInputChange}
                                                        className="block w-full pl-4 pr-10 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            {/* Role */}
                                            <div className="sm:col-span-1">
                                                <label htmlFor="edit-role" className="block text-sm font-medium text-gray-700 mb-1">
                                                    Role <span className="text-red-500">*</span>
                                                </label>
                                                <div className="mt-1 relative rounded-md shadow-sm">
                                                    <select
                                                        name="role"
                                                        id="edit-role"
                                                        value={editUserData.role}
                                                        onChange={handleEditInputChange}
                                                        className="block w-full pl-4 pr-10 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition appearance-none"
                                                        required
                                                        disabled
                                                    >
                                                        {roles.map(role => (
                                                            <option key={role} value={role}>{role}</option>
                                                        ))}
                                                    </select>
                                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                        <FiChevronDown className="h-5 w-5 text-gray-400" />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Address (full width) */}
                                            <div className="sm:col-span-2">
                                                <label htmlFor="edit-address" className="block text-sm font-medium text-gray-700 mb-1">
                                                    Address <span className="text-red-500">*</span>
                                                </label>
                                                <div className="mt-1 relative rounded-md shadow-sm">
                                                    <textarea
                                                        name="address"
                                                        id="edit-address"
                                                        rows={3}
                                                        value={editUserData.address}
                                                        onChange={handleEditInputChange}
                                                        className="block w-full pl-4 pr-10 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                                                        required
                                                    ></textarea>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action buttons */}
                                        <div className="mt-8 flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-4">
                                            <button
                                                type="button"
                                                onClick={() => setShowEditModal(false)}
                                                className="mt-3 w-full inline-flex justify-center items-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:mt-0 sm:w-auto sm:text-sm transition"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className="w-full inline-flex justify-center items-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-500 text-base font-medium text-white hover:from-purple-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:w-auto sm:text-sm transition"
                                            >
                                                <FiSave className="mr-2 h-5 w-5" />
                                                Update User
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Delete Confirmation Modal */}
                {showDeleteModal && (
                    <div className="fixed z-50 inset-0 overflow-y-auto" aria-labelledby="delete-confirmation-modal" role="dialog" aria-modal="true">
                        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                            {/* Darker overlay with blur effect */}
                            <div
                                className="fixed inset-0 bg-gray-900 bg-opacity-75 backdrop-blur-sm transition-opacity"
                                aria-hidden="true"
                                onClick={() => setShowDeleteModal(false)}
                            ></div>

                            {/* Modal container */}
                            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full">
                                {/* Modal content */}
                                <div className="bg-white px-4 py-4 sm:p-5">
                                    <div className="flex flex-col items-center sm:flex-row sm:items-start">
                                        {/* Animated warning icon */}
                                        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full bg-red-50 animate-pulse sm:mx-0 sm:h-14 sm:w-14">
                                            <FiAlertTriangle className="h-8 w-8 text-red-600 sm:h-7 sm:w-7" />
                                        </div>

                                        <div className="mt-4 text-center sm:mt-0 sm:ml-6 sm:text-left">
                                            <h3 className="text-xl font-semibold text-gray-900" id="delete-confirmation-modal">
                                                Confirm Deletion
                                            </h3>
                                            <div className="mt-3">
                                                <p className="text-gray-600">
                                                    You are about to permanently delete <span className="font-medium">{selectedUser?.username || "this user"}</span>.
                                                </p>
                                                <p className="mt-2 text-sm text-red-600 font-medium">
                                                    This action cannot be undone and all associated data will be lost.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Action buttons */}
                                <div className="bg-gray-50 px-6 py-4 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        type="button"
                                        onClick={handleConfirmDelete}
                                        className="w-full inline-flex justify-center items-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-base font-medium text-white hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm transition-all duration-150"
                                    >
                                        <FiTrash2 className="mr-2 h-5 w-5" />
                                        Delete Permanently
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowDeleteModal(false)}
                                        className="mt-3 w-full inline-flex justify-center items-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition"
                                    >
                                        <FiX className="mr-2 h-5 w-5" />
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Users;