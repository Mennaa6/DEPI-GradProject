import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaSave, FaTimes, FaImage, FaArrowLeft } from "react-icons/fa";
import {
  Card,
  CardBody,
  Typography,
  Button,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import PageTitle from "../components/PageTitle";
import { mockUsers } from "../data/mockData";

const UserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;
  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    status: "active",
    avatar: "",
  });

  // Available roles and statuses
  const roles = ["Admin", "Manager", "Editor", "User"];
  const statuses = ["active", "inactive"];

  useEffect(() => {
    if (isEditMode) {
      // In a real app, fetch from API using the ID
      const fetchUser = async () => {
        try {
          // Simulate API delay
          setTimeout(() => {
            const foundUser = mockUsers.find((u) => u.id === parseInt(id));
            if (foundUser) {
              setFormData({
                name: foundUser.name,
                email: foundUser.email,
                role: foundUser.role,
                status: foundUser.status,
                avatar: foundUser.avatar,
              });
            }
            setLoading(false);
          }, 1000);
        } catch (error) {
          console.error("Error fetching user:", error);
          setLoading(false);
        }
      };

      fetchUser();
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

  const handleSelectChange = (name, value) => {
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

  const validate = () => {
    const errors = {};

    if (!formData.name.trim()) errors.name = "Name is required";

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid email format";
    }

    if (!formData.role) errors.role = "Role is required";
    if (!formData.status) errors.status = "Status is required";
    if (!formData.avatar.trim()) errors.avatar = "Avatar URL is required";

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
      // In a real app, make API call to create/update user
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay

      // Redirect back to users list or details page
      navigate(isEditMode ? `/admin/users/${id}` : "/users");
    } catch (error) {
      console.error("Error saving user:", error);
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
        <PageTitle title={isEditMode ? "Edit User" : "Add New User"} />

        <Button
          variant="outlined"
          color="gray"
          size="sm"
          className="flex items-center gap-2 mt-4 md:mt-0"
          onClick={() =>
            navigate(isEditMode ? `/admin/users${id}` : "/admin/users")
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
                  Full Name*
                </Typography>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter full name"
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
                  Email Address*
                </Typography>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  className={formErrors.email ? "border-red-500" : ""}
                />
                {formErrors.email && (
                  <Typography variant="small" color="red" className="mt-1">
                    {formErrors.email}
                  </Typography>
                )}
              </div>

              <div>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 font-medium"
                >
                  Role*
                </Typography>
                <Select
                  value={formData.role}
                  onChange={(value) => handleSelectChange("role", value)}
                  error={!!formErrors.role}
                  className={formErrors.role ? "border-red-500" : ""}
                >
                  {roles.map((role) => (
                    <Option key={role} value={role}>
                      {role}
                    </Option>
                  ))}
                </Select>
                {formErrors.role && (
                  <Typography variant="small" color="red" className="mt-1">
                    {formErrors.role}
                  </Typography>
                )}
              </div>

              <div>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 font-medium"
                >
                  Status*
                </Typography>
                <Select
                  value={formData.status}
                  onChange={(value) => handleSelectChange("status", value)}
                  error={!!formErrors.status}
                  className={formErrors.status ? "border-red-500" : ""}
                >
                  <Option value="active">Active</Option>
                  <Option value="inactive">Inactive</Option>
                </Select>
                {formErrors.status && (
                  <Typography variant="small" color="red" className="mt-1">
                    {formErrors.status}
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
                Avatar URL*
              </Typography>
              <div className="flex">
                <Input
                  type="text"
                  name="avatar"
                  value={formData.avatar}
                  onChange={handleChange}
                  placeholder="https://example.com/avatar.jpg"
                  className={`${
                    formErrors.avatar ? "border-red-500" : ""
                  } flex-grow`}
                  icon={<FaImage />}
                />
              </div>
              {formErrors.avatar && (
                <Typography variant="small" color="red" className="mt-1">
                  {formErrors.avatar}
                </Typography>
              )}

              {formData.avatar && (
                <div className="mt-3 border rounded-lg p-2 inline-block">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 font-medium"
                  >
                    Preview:
                  </Typography>
                  <img
                    src={formData.avatar}
                    alt="Preview"
                    className="w-16 h-16 object-cover rounded-full"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://via.placeholder.com/150?text=Avatar";
                    }}
                  />
                </div>
              )}
            </div>

            {!isEditMode && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-medium mb-2"
                >
                  Password Information
                </Typography>
                <Typography variant="small" color="gray" className="mb-2">
                  A temporary password will be generated and sent to the user's
                  email.
                </Typography>
                <Typography variant="small" color="gray">
                  The user will be prompted to change the password on first
                  login.
                </Typography>
              </div>
            )}

            <div className="flex justify-end gap-4">
              <Button
                variant="outlined"
                color="red"
                className="flex items-center gap-2"
                onClick={() =>
                  navigate(isEditMode ? `/admin/users/${id}` : "/users")
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
                  ? "Update User"
                  : "Save User"}
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default UserForm;
