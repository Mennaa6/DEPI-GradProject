import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FaEdit, FaTrash, FaArrowLeft } from "react-icons/fa";
import {
  Card,
  CardBody,
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import PageTitle from "../components/PageTitle";
import { ProductContext } from "../../context/ProductContext";
import { useContext } from "react";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  const { getSingleProduct, deleteProduct } = useContext(ProductContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getSingleProduct(id);
        setProduct(productData);
      } catch (error) {
        console.error("Error fetching product:", error);
        setError("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, getSingleProduct]);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteProduct(id);
      navigate("/admin/products");
    } catch (error) {
      console.error("Error deleting product:", error);
      setError("Failed to delete product");
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <PageTitle title="Product Details" />

          <div className="flex gap-2 mt-4 md:mt-0">
            <Button
              variant="outlined"
              color="gray"
              size="sm"
              className="flex items-center gap-2"
              onClick={() => navigate("/admin/products")}
            >
              <FaArrowLeft size={14} /> Back
            </Button>
            <Button
              variant="outlined"
              color="blue"
              size="sm"
              className="flex items-center gap-2"
              onClick={() => navigate(`/admin/products/${id}/edit`)}
            >
              <FaEdit size={14} /> Edit
            </Button>
            <Button
              variant="outlined"
              color="red"
              size="sm"
              className="flex items-center gap-2"
              onClick={() => setDeleteDialogOpen(true)}
            >
              <FaTrash size={14} /> Delete
            </Button>
          </div>
        </div>

        <Card className="mb-6 overflow-hidden">
          <CardBody className="p-0">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-2/5 lg:w-1/3 bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 md:h-full object-cover object-center"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/400x400?text=No+Image";
                  }}
                />
              </div>
              <div className="p-6 md:w-3/5 lg:w-2/3">
                <div className="mb-4">
                  <Typography variant="h4" color="blue-gray" className="mb-2">
                    {product.name}
                  </Typography>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-50 text-blue-700">
                      {product.category}
                    </span>
                    {product.stock > 10 ? (
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-50 text-green-700">
                        In Stock ({product.stock})
                      </span>
                    ) : product.stock > 0 ? (
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-yellow-50 text-yellow-700">
                        Low Stock ({product.stock})
                      </span>
                    ) : (
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-red-50 text-red-700">
                        Out of Stock
                      </span>
                    )}
                  </div>
                </div>

                <div className="mb-6">
                  <Typography variant="h6" color="blue-gray" className="mb-2">
                    Price
                  </Typography>
                  <Typography
                    variant="h4"
                    color="blue-gray"
                    className="font-bold"
                  >
                    $
                    {typeof product.price === "number"
                      ? product.price.toFixed(2)
                      : product.price}
                  </Typography>
                </div>

                <div className="mb-6">
                  <Typography variant="h6" color="blue-gray" className="mb-2">
                    Description
                  </Typography>
                  <Typography variant="paragraph" className="text-gray-700">
                    {product.description}
                  </Typography>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <Typography
                      variant="small"
                      className="font-medium text-gray-600 mb-1"
                    >
                      ID
                    </Typography>
                    <Typography variant="paragraph">#{product._id}</Typography>
                  </div>
                  <div>
                    <Typography
                      variant="small"
                      className="font-medium text-gray-600 mb-1"
                    >
                      Category
                    </Typography>
                    <Typography variant="paragraph">
                      {product.category}
                    </Typography>
                  </div>
                  <div>
                    <Typography
                      variant="small"
                      className="font-medium text-gray-600 mb-1"
                    >
                      Stock
                    </Typography>
                    <Typography variant="paragraph">
                      {product.stock} units
                    </Typography>
                  </div>
                  {product.subcategory && (
                    <div>
                      <Typography
                        variant="small"
                        className="font-medium text-gray-600 mb-1"
                      >
                        Subcategory
                      </Typography>
                      <Typography variant="paragraph">
                        {product.subcategory}
                      </Typography>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={deleteDialogOpen}
          handler={() => setDeleteDialogOpen(!deleteDialogOpen)}
        >
          <DialogHeader>Confirm Deletion</DialogHeader>
          <DialogBody>
            Are you sure you want to delete "{product.name}"? This action cannot
            be undone.
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="gray"
              onClick={() => setDeleteDialogOpen(false)}
              className="mr-2"
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button color="red" onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </Dialog>
      </div>
    );
  }
};

export default ProductDetails;
