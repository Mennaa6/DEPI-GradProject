import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaEye,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaFilter,
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
import { ProductContext } from "../../context/ProductContext";
import { useContext } from "react";

const AdProducts = () => {
  const { products, loading, deleteProduct } = useContext(ProductContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const navigate = useNavigate();

  // Categories extracted from mock data
  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

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

  // Handle category filter
  const handleCategoryFilter = (category) => {
    setSelectedCategory(category === "All" ? "" : category);
    setCurrentPage(1);
    setFilterOpen(false);
  };

  // Handle product deletion
  const confirmDelete = (product) => {
    setProductToDelete(product);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    try {
      await deleteProduct(productToDelete._id);
      setDeleteDialogOpen(false);
      setProductToDelete(null);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Filter and sort products
  const filteredProducts = products
    .filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory === "" || product.category === selectedCategory)
    )
    .sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];

      if (typeof aValue === "string") {
        return sortOrder === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else {
        return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
      }
    });

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

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
        <PageTitle title="Products" subtitle="Manage your product inventory" />

        <Button
          size="sm"
          className="flex items-center gap-2 bg-gray-800 mt-4 md:mt-0"
          onClick={() => navigate("/admin/products/new")}
        >
          <FaPlus size={14} /> Add Product
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
                placeholder="Search products..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:ring-primary-500 focus:border-primary-500"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>

            {/* Filters */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <Button
                  variant="outlined"
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={() => setFilterOpen(!filterOpen)}
                >
                  <FaFilter size={14} />
                  Filter
                  {selectedCategory && (
                    <span className="bg-primary-100 text-primary-700 text-xs px-2 py-0.5 rounded-full">
                      {selectedCategory}
                    </span>
                  )}
                </Button>

                {filterOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 animate-fadeIn">
                    {categories.map((category, index) => (
                      <button
                        key={index}
                        onClick={() => handleCategoryFilter(category)}
                        className={`block w-full text-left px-4 py-2 text-sm ${
                          (category === "All" && selectedCategory === "") ||
                          category === selectedCategory
                            ? "bg-primary-50 text-primary-700"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {selectedCategory && (
                <button
                  onClick={() => handleCategoryFilter("All")}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Clear Filter
                </button>
              )}
            </div>
          </div>

          {/* Products Table */}
          {loading ? (
            <div className="animate-pulse">
              {Array(6)
                .fill(0)
                .map((_, index) => (
                  <div key={index} className="border-b border-gray-200 py-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gray-200 rounded"></div>
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
              {filteredProducts.length === 0 ? (
                <div className="text-center py-8">
                  <Typography variant="h6" className="text-gray-500">
                    No products found
                  </Typography>
                  <Typography
                    variant="paragraph"
                    className="text-gray-400 mt-1"
                  >
                    Try adjusting your search or filter criteria
                  </Typography>
                </div>
              ) : (
                <>
                  {/* Desktop View */}
                  <div className="hidden md:block overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Product
                          </th>
                          <th
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                            onClick={() => handleSort("category")}
                          >
                            <div className="flex items-center space-x-1">
                              <span>Category</span>
                              {getSortIcon("category")}
                            </div>
                          </th>
                          <th
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                            onClick={() => handleSort("price")}
                          >
                            <div className="flex items-center space-x-1">
                              <span>Price</span>
                              {getSortIcon("price")}
                            </div>
                          </th>
                          <th
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                            onClick={() => handleSort("stock")}
                          >
                            <div className="flex items-center space-x-1">
                              <span>Stock</span>
                              {getSortIcon("stock")}
                            </div>
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {currentProducts.map((product) => (
                          <tr key={product._id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="w-10 h-10 flex-shrink-0 rounded-md overflow-hidden">
                                  <img
                                    src={product.image}
                                    alt=""
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="ml-4">
                                  <Typography
                                    variant="small"
                                    className="font-medium text-gray-900"
                                  >
                                    {product.name}
                                  </Typography>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-50 text-blue-700">
                                {product.category}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              ${product.price.toFixed(2)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {product.stock > 5 ? (
                                <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-50 text-green-700">
                                  In Stock ({product.stock})
                                </span>
                              ) : product.stock > 0 ? (
                                <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-50 text-yellow-700">
                                  Low Stock ({product.stock})
                                </span>
                              ) : (
                                <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-50 text-red-700">
                                  Out of Stock
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex justify-end space-x-2">
                                <button
                                  onClick={() =>
                                    navigate(`/admin/products/${product._id}`)
                                  }
                                  className="text-gray-600 hover:text-gray-900"
                                >
                                  <FaEye size={16} />
                                </button>
                                <button
                                  onClick={() =>
                                    navigate(
                                      `/admin/products/${product._id}/edit`
                                    )
                                  }
                                  className="text-blue-600 hover:text-blue-900"
                                >
                                  <FaEdit size={16} />
                                </button>
                                <button
                                  onClick={() => confirmDelete(product)}
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
                    {currentProducts.map((product) => (
                      <div
                        key={product._id}
                        className="border-b border-gray-200 py-4"
                      >
                        <div className="flex items-start">
                          <div className="w-16 h-16 flex-shrink-0 rounded-md overflow-hidden">
                            <img
                              src={product.image}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="ml-4 flex-1">
                            <Typography
                              variant="small"
                              className="font-medium text-gray-900"
                            >
                              {product.name}
                            </Typography>
                            <div className="flex items-center mt-1">
                              <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-blue-50 text-blue-700">
                                {product.category}
                              </span>
                              <span className="ml-2 text-sm text-gray-500">
                                ${product.price.toFixed(2)}
                              </span>
                            </div>
                            <div className="mt-2">
                              {product.stock > 10 ? (
                                <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-green-50 text-green-700">
                                  In Stock ({product.stock})
                                </span>
                              ) : product.stock > 0 ? (
                                <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-yellow-50 text-yellow-700">
                                  Low Stock ({product.stock})
                                </span>
                              ) : (
                                <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-red-50 text-red-700">
                                  Out of Stock
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() =>
                                navigate(`/products/${product._id}`)
                              }
                              className="p-1.5 rounded text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                            >
                              <FaEye size={15} />
                            </button>
                            <button
                              onClick={() =>
                                navigate(`/admin/products/${product._id}/edit`)
                              }
                              className="p-1.5 rounded text-blue-600 hover:text-blue-900 hover:bg-blue-50"
                            >
                              <FaEdit size={15} />
                            </button>
                            <button
                              onClick={() => confirmDelete(product)}
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
                        Showing {indexOfFirstProduct + 1} to{" "}
                        {Math.min(indexOfLastProduct, filteredProducts.length)}{" "}
                        of {filteredProducts.length} products
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
                          // Show 5 pages max, with current page centered
                          if (
                            pageNumber === 1 ||
                            pageNumber === totalPages ||
                            (pageNumber >= currentPage - 1 &&
                              pageNumber <= currentPage + 1)
                          ) {
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
                          } else if (
                            (pageNumber === currentPage - 2 &&
                              currentPage > 3) ||
                            (pageNumber === currentPage + 2 &&
                              currentPage < totalPages - 2)
                          ) {
                            return (
                              <span key={pageNumber} className="px-2">
                                ...
                              </span>
                            );
                          }
                          return null;
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
          Are you sure you want to delete "{productToDelete?.name}"? This action
          cannot be undone.
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="gray"
            onClick={() => setDeleteDialogOpen(false)}
            className="mr-2"
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

export default AdProducts;
