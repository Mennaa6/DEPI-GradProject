import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaEye,
  FaSort,
  FaSortUp,
  FaSortDown,
} from "react-icons/fa";
import {
  Button,
  Card,
  CardBody,
  Typography,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import PageTitle from "../components/PageTitle";
import { mockUsers } from "../data/mockData";
import { format } from "date-fns";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    // Simulate API fetch delay
    setTimeout(() => {
      setUsers(mockUsers);
      setLoading(false);
    }, 1000);
  }, []);

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // Handle sort
  const handleSort = (key) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(key);
      setSortOrder("asc");
    }
    setCurrentPage(1);
  };

  // Handle user deletion
  const confirmDelete = (user) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    // In a real app, you would make an API call to delete the user
    setUsers(users.filter((u) => u.id !== userToDelete.id));
    setDeleteDialogOpen(false);
    setUserToDelete(null);
  };

  // Filter and sort users
  const filteredUsers = users
    .filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aValue = sortBy === "joinedAt" ? new Date(a[sortBy]) : a[sortBy];
      const bValue = sortBy === "joinedAt" ? new Date(b[sortBy]) : b[sortBy];

      if (sortBy === "joinedAt") {
        return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
      } else if (typeof aValue === "string") {
        return sortOrder === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else {
        return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
      }
    });

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Get sort icon
  const getSortIcon = (key) => {
    if (sortBy !== key) return <FaSort className="text-gray-400" />;
    if (sortOrder === "asc") return <FaSortUp className="text-primary-500" />;
    return <FaSortDown className="text-primary-500" />;
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <PageTitle title="Users" subtitle="Manage user accounts" />

        <Button
          size="sm"
          className="flex items-center gap-2 bg-gray-800 mt-4 md:mt-0"
          onClick={() => navigate("/admin/users/new")}
        >
          <FaPlus size={14} /> Add User
        </Button>
      </div>

      <Card className="mb-6">
        <CardBody>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            {/* Search */}
            <div className="relative flex-grow max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search users..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:ring-primary-500 focus:border-primary-500"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>

          {/* Users Table */}
          {loading ? (
            <div className="animate-pulse">
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <div key={index} className="border-b border-gray-200 py-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                      <div className="w-24 h-8 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <>
              {filteredUsers.length === 0 ? (
                <div className="text-center py-8">
                  <Typography variant="h6" className="text-gray-500">
                    No users found
                  </Typography>
                  <Typography
                    variant="paragraph"
                    className="text-gray-400 mt-1"
                  >
                    Try a different search term
                  </Typography>
                </div>
              ) : (
                <>
                  {/* Desktop View */}
                  <div className="hidden md:block overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                            onClick={() => handleSort("name")}
                          >
                            <div className="flex items-center space-x-1">
                              <span>Name</span>
                              {getSortIcon("name")}
                            </div>
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Email
                          </th>
                          <th
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                            onClick={() => handleSort("role")}
                          >
                            <div className="flex items-center space-x-1">
                              <span>Role</span>
                              {getSortIcon("role")}
                            </div>
                          </th>
                          <th
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                            onClick={() => handleSort("status")}
                          >
                            <div className="flex items-center space-x-1">
                              <span>Status</span>
                              {getSortIcon("status")}
                            </div>
                          </th>
                          <th
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                            onClick={() => handleSort("joinedAt")}
                          >
                            <div className="flex items-center space-x-1">
                              <span>Joined</span>
                              {getSortIcon("joinedAt")}
                            </div>
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {currentUsers.map((user) => (
                          <tr key={user.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="h-10 w-10 rounded-full overflow-hidden">
                                  <img
                                    src={user.avatar}
                                    alt=""
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                                <div className="ml-4">
                                  <Typography
                                    variant="small"
                                    className="font-medium text-gray-900"
                                  >
                                    {user.name}
                                  </Typography>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Typography
                                variant="small"
                                className="text-gray-500"
                              >
                                {user.email}
                              </Typography>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Typography
                                variant="small"
                                className="text-gray-900"
                              >
                                {user.role}
                              </Typography>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {user.status === "active" ? (
                                <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-50 text-green-700">
                                  Active
                                </span>
                              ) : (
                                <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-50 text-gray-700">
                                  Inactive
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {format(new Date(user.joinedAt), "MMM d, yyyy")}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex justify-end space-x-2">
                                <button
                                  onClick={() =>
                                    navigate(`/admin/users/${user.id}`)
                                  }
                                  className="text-gray-600 hover:text-gray-900"
                                >
                                  <FaEye size={16} />
                                </button>
                                <button
                                  onClick={() =>
                                    navigate(`/admin/users/${user.id}/edit`)
                                  }
                                  className="text-blue-600 hover:text-blue-900"
                                >
                                  <FaEdit size={16} />
                                </button>
                                <button
                                  onClick={() => confirmDelete(user)}
                                  className="text-red-600 hover:text-red-900"
                                >
                                  <FaTrash size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile View */}
                  <div className="md:hidden">
                    {currentUsers.map((user) => (
                      <div
                        key={user.id}
                        className="border-b border-gray-200 py-4"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="h-10 w-10 rounded-full overflow-hidden">
                              <img
                                src={user.avatar}
                                alt=""
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div>
                              <Typography
                                variant="small"
                                className="font-medium text-gray-900"
                              >
                                {user.name}
                              </Typography>
                              <Typography
                                variant="small"
                                className="text-gray-500"
                              >
                                {user.email}
                              </Typography>
                              <div className="flex items-center mt-1 space-x-2">
                                <Typography
                                  variant="small"
                                  className="text-gray-600"
                                >
                                  {user.role}
                                </Typography>
                                <span className="text-gray-300">•</span>
                                {user.status === "active" ? (
                                  <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-green-50 text-green-700">
                                    Active
                                  </span>
                                ) : (
                                  <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-gray-50 text-gray-700">
                                    Inactive
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() =>
                                navigate(`/admin/users/${user.id}`)
                              }
                              className="p-1.5 rounded text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                            >
                              <FaEye size={15} />
                            </button>
                            <button
                              onClick={() =>
                                navigate(`/admin/users/${user.id}/edit`)
                              }
                              className="p-1.5 rounded text-blue-600 hover:text-blue-900 hover:bg-blue-50"
                            >
                              <FaEdit size={15} />
                            </button>
                            <button
                              onClick={() => confirmDelete(user)}
                              className="p-1.5 rounded text-red-600 hover:text-red-900 hover:bg-red-50"
                            >
                              <FaTrash size={15} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-between items-center mt-6">
                      <div className="text-sm text-gray-500">
                        Showing {indexOfFirstUser + 1} to{" "}
                        {Math.min(indexOfLastUser, filteredUsers.length)} of{" "}
                        {filteredUsers.length} users
                      </div>
                      <div className="flex space-x-1">
                        <button
                          onClick={() => paginate(currentPage - 1)}
                          disabled={currentPage === 1}
                          className={`px-3 py-1 rounded ${
                            currentPage === 1
                              ? "text-gray-400 cursor-not-allowed"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          Prev
                        </button>

                        {[...Array(totalPages)].map((_, index) => {
                          const pageNumber = index + 1;
                          return (
                            <button
                              key={pageNumber}
                              onClick={() => paginate(pageNumber)}
                              className={`px-3 py-1 rounded ${
                                currentPage === pageNumber
                                  ? "bg-primary-100 text-primary-700"
                                  : "text-gray-700 hover:bg-gray-100"
                              }`}
                            >
                              {pageNumber}
                            </button>
                          );
                        })}

                        <button
                          onClick={() => paginate(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className={`px-3 py-1 rounded ${
                            currentPage === totalPages
                              ? "text-gray-400 cursor-not-allowed"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </CardBody>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        handler={() => setDeleteDialogOpen(!deleteDialogOpen)}
      >
        <DialogHeader>Confirm Deletion</DialogHeader>
        <DialogBody>
          Are you sure you want to delete the user "{userToDelete?.name}"? This
          action cannot be undone.
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            onClick={() => setDeleteDialogOpen(false)}
            className="mr-2 "
          >
            Cancel
          </Button>
          <Button color="red" onClick={handleDelete}>
            Delete
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default Users;
