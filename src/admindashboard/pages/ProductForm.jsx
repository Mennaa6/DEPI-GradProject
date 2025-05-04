import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaSave, FaTimes, FaImage, FaArrowLeft } from "react-icons/fa";
import {
  Card,
  CardBody,
  Typography,
  Button,
  Input,
  Textarea,
  Select,
  Option,
} from "@material-tailwind/react";
import PageTitle from "../components/PageTitle";
import { mockProducts } from "../data/mockData";

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;
  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    image: "",
  });

  // Available categories
  const categories = [
    ...new Set(mockProducts.map((product) => product.category)),
  ];

  useEffect(() => {
    if (isEditMode) {
      // In a real app, fetch from API using the ID
      const fetchProduct = async () => {
        try {
          // Simulate API delay
          setTimeout(() => {
            const foundProduct = mockProducts.find(
              (p) => p.id === parseInt(id)
            );
            if (foundProduct) {
              setFormData({
                name: foundProduct.name,
                category: foundProduct.category,
                price: foundProduct.price.toString(),
                stock: foundProduct.stock.toString(),
                description: foundProduct.description,
                image: foundProduct.image,
              });
            }
            setLoading(false);
          }, 1000);
        } catch (error) {
          console.error("Error fetching product:", error);
          setLoading(false);
        }
      };

      fetchProduct();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when field is changed
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null,
      });
    }
  };

  const handleCategoryChange = (value) => {
    setFormData({
      ...formData,
      category: value,
    });

    // Clear error when field is changed
    if (formErrors.category) {
      setFormErrors({
        ...formErrors,
        category: null,
      });
    }
  };

  const validate = () => {
    const errors = {};

    if (!formData.name.trim()) errors.name = "Product name is required";
    if (!formData.category) errors.category = "Category is required";

    if (!formData.price) {
      errors.price = "Price is required";
    } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      errors.price = "Price must be a positive number";
    }

    if (!formData.stock) {
      errors.stock = "Stock is required";
    } else if (
      isNaN(Number(formData.stock)) ||
      Number(formData.stock) < 0 ||
      !Number.isInteger(Number(formData.stock))
    ) {
      errors.stock = "Stock must be a non-negative integer";
    }

    if (!formData.description.trim())
      errors.description = "Description is required";
    if (!formData.image.trim()) errors.image = "Image URL is required";

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setSaving(true);

    try {
      // In a real app, make API call to create/update product
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay

      // Redirect back to products list or details page
      navigate(isEditMode ? `/products/${id}` : "/products");
    } catch (error) {
      console.error("Error saving product:", error);
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div>
        <div className="flex items-center mb-6">
          <div className="h-8 w-40 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <Card className="animate-pulse">
          <CardBody>
            <div className="space-y-4">
              <div className="h-12 bg-gray-200 rounded"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <PageTitle title={isEditMode ? "Edit Product" : "Add New Product"} />

        <Button
          variant="outlined"
          color="gray"
          size="sm"
          className="flex items-center gap-2 mt-4 md:mt-0"
          onClick={() =>
            navigate(isEditMode ? `/admin/products${id}` : "/admin/products")
          }
        >
          <FaArrowLeft size={14} /> Back
        </Button>
      </div>

      <Card>
        <CardBody>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 font-medium"
                >
                  Product Name*
                </Typography>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter product name"
                  className={formErrors.name ? "border-red-500" : ""}
                />
                {formErrors.name && (
                  <Typography variant="small" color="red" className="mt-1">
                    {formErrors.name}
                  </Typography>
                )}
              </div>

              <div>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 font-medium"
                >
                  Category*
                </Typography>
                <Select
                  value={formData.category}
                  onChange={handleCategoryChange}
                  error={!!formErrors.category}
                  className={formErrors.category ? "border-red-500" : ""}
                >
                  {categories.map((category) => (
                    <Option key={category} value={category}>
                      {category}
                    </Option>
                  ))}
                </Select>
                {formErrors.category && (
                  <Typography variant="small" color="red" className="mt-1">
                    {formErrors.category}
                  </Typography>
                )}
              </div>

              <div>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 font-medium"
                >
                  Price ($)*
                </Typography>
                <Input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  className={formErrors.price ? "border-red-500" : ""}
                />
                {formErrors.price && (
                  <Typography variant="small" color="red" className="mt-1">
                    {formErrors.price}
                  </Typography>
                )}
              </div>

              <div>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 font-medium"
                >
                  Stock*
                </Typography>
                <Input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="0"
                  step="1"
                  min="0"
                  className={formErrors.stock ? "border-red-500" : ""}
                />
                {formErrors.stock && (
                  <Typography variant="small" color="red" className="mt-1">
                    {formErrors.stock}
                  </Typography>
                )}
              </div>
            </div>

            <div className="mb-6">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-medium"
              >
                Description*
              </Typography>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter product description"
                className={formErrors.description ? "border-red-500" : ""}
                rows={4}
              />
              {formErrors.description && (
                <Typography variant="small" color="red" className="mt-1">
                  {formErrors.description}
                </Typography>
              )}
            </div>

            <div className="mb-6">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-medium"
              >
                Image URL*
              </Typography>
              <div className="flex">
                <Input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className={`${
                    formErrors.image ? "border-red-500" : ""
                  } flex-grow`}
                  icon={<FaImage />}
                />
              </div>
              {formErrors.image && (
                <Typography variant="small" color="red" className="mt-1">
                  {formErrors.image}
                </Typography>
              )}

              {formData.image && (
                <div className="mt-3 border rounded-lg p-2 inline-block">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 font-medium"
                  >
                    Preview:
                  </Typography>
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://via.placeholder.com/150?text=Image+Error";
                    }}
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end gap-4">
              <Button
                variant="outlined"
                color="red"
                className="flex items-center gap-2"
                onClick={() =>
                  navigate(
                    isEditMode ? `/admin/products/${id}` : "/admin/products"
                  )
                }
                disabled={saving}
              >
                <FaTimes size={14} /> Cancel
              </Button>
              <Button
                type="submit"
                color="green"
                className="flex items-center gap-2"
                disabled={saving}
              >
                <FaSave size={14} />{" "}
                {saving
                  ? "Saving..."
                  : isEditMode
                  ? "Update Product"
                  : "Save Product"}
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default ProductForm;
