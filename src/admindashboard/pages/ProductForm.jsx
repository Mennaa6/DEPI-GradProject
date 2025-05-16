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
import { ProductContext } from "../../context/ProductContext";
import { useContext } from "react";

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;
  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  //get the functions
  const { getSingleProduct, addProduct, updateProduct, products } =
    useContext(ProductContext);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    subcategory: "",
    stock: "",
    available: true,
    rating: "",
  });

  // Available categories

  const categories = [...new Set(products.map((product) => product.category))];

  const subcategories = [
    ...new Set(products.map((product) => product.subcategory)),
  ];

  useEffect(() => {
    const fetchProduct = async () => {
      if (isEditMode) {
        try {
          const product = await getSingleProduct(id);
          setFormData({
            name: product.name,
            description: product.description,
            price: product.price.toString(),
            category: product.category,
            subcategory: product.subcategory,
            stock: product.stock.toString(),
            available: product.available,
            rating: product.rating,
          });
          setImagePreview(product.image);
        } catch (error) {
          console.error("Error fetching product:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProduct();
  }, [id, isEditMode, getSingleProduct]);

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setFormErrors({
        ...formErrors,
        image: "Please select an image file",
      });
      return;
    }
    setImageFile(file);
    setFormErrors({
      ...formErrors,
      image: null,
    });

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
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

  const handleSubCategoryChange = (value) => {
    setFormData({
      ...formData,
      subcategory: value,
    });

    // Clear error when field is changed
    if (formErrors.subcategory) {
      setFormErrors({
        ...formErrors,
        subcategory: null,
      });
    }
  };

  const validate = () => {
    const errors = {};

    if (!formData.name.trim()) errors.name = "Product name is required";
    if (!formData.category) errors.category = "Category is required";
    if (!formData.subcategory) errors.subcategory = "Category is required";

    if (!formData.price) {
      errors.price = "Price is required";
    } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      errors.price = "Price must be a positive number";
    }

    if (!formData.rating) {
      errors.rating = "Rating is required";
    } else if (
      isNaN(Number(formData.rating)) ||
      Number(formData.rating) <= 0 ||
      Number(formData.rating) > 5
    ) {
      errors.rating = "Price must be a positive number and not more than 5";
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
    if (!isEditMode && !imageFile) errors.image = "Please select an image";
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
      const productData = {
        ...formData,
        image: imageFile,
      };

      if (isEditMode) {
        await updateProduct(id, productData);
      } else {
        await addProduct(productData);
      }

      navigate("/admin/products");
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
            navigate(
              isEditMode ? `/admin/products/${id}/edit` : "/admin/products"
            )
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
                  Sub-Category*
                </Typography>
                <Select
                  value={formData.subcategory}
                  onChange={handleSubCategoryChange}
                  error={!!formErrors.subcategory}
                  className={formErrors.subcategory ? "border-red-500" : ""}
                >
                  {subcategories.map((subcategory) => (
                    <Option key={subcategory} value={subcategory}>
                      {subcategory}
                    </Option>
                  ))}
                </Select>
                {formErrors.subcategory && (
                  <Typography variant="small" color="red" className="mt-1">
                    {formErrors.subcategory}
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
                  Rating*
                </Typography>
                <Input
                  type="number"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  className={formErrors.rating ? "border-red-500" : ""}
                />
                {formErrors.rating && (
                  <Typography variant="small" color="red" className="mt-1">
                    {formErrors.rating}
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
                Product Image{!isEditMode && "*"}
              </Typography>
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                <div className="flex-1">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className={formErrors.image ? "border-red-500" : ""}
                  />
                  {formErrors.image && (
                    <Typography variant="small" color="red" className="mt-1">
                      {formErrors.image}
                    </Typography>
                  )}
                </div>

                {imagePreview && (
                  <div className="border rounded-lg p-2">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-1 font-medium"
                    >
                      Preview:
                    </Typography>
                    <img
                      src={imagePreview}
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
            </div>
            <div className="flex justify-end gap-4">
              <Button
                variant="outlined"
                color="red"
                className="flex items-center gap-2"
                onClick={() => navigate("/admin/products")}
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
                <FaSave size={14} />
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
