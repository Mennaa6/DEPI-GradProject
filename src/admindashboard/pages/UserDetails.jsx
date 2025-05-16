import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaEdit,
  FaTrash,
  FaArrowLeft,
  FaEnvelope,
  FaIdBadge,
  FaCalendarAlt,
  FaCircle,
} from "react-icons/fa";
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
import { format } from "date-fns";

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  const { getSingleUser, deleteUser } = useContext(ProductContext);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getSingleUser(id);
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user:", error);
        setError("Failed to load user details");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id, getSingleUser]);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteUser(id);
      navigate("/admin/users");
    } catch (error) {
      console.error("Error deleting user:", error);
      setError("Failed to delete user");
      setIsDeleting(false);
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
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <div className="h-64 bg-gray-200 rounded-lg"></div>
              </div>
              <div className="md:w-2/3">
                <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-6"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>
                <div className="flex gap-2">
                  <div className="h-10 w-20 bg-gray-200 rounded"></div>
                  <div className="h-10 w-20 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }
  if (error) {
    return (
      <div className="text-center py-12">
        <Typography variant="h4" color="red" className="mb-4">
          {error}
        </Typography>
        <Button
          variant="outlined"
          color="gray"
          onClick={() => navigate("/admin/users")}
        >
          Back to Users
        </Button>
      </div>
    );
  }
  if (!user) {
    return (
      <div className="text-center py-12">
        <Typography variant="h4" color="blue-gray" className="mb-2">
          User Not Found
        </Typography>
        <Typography variant="paragraph" className="text-gray-600 mb-6">
          The user you are looking for does not exist or has been removed.
        </Typography>
        <Button
          color="blue"
          variant="text"
          className="flex items-center gap-2 mx-auto"
          onClick={() => navigate("/admin/users")}
        >
          <FaArrowLeft /> Back to Users
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <PageTitle title="User Profile" />

        <div className="flex gap-2 mt-4 md:mt-0">
          <Button
            variant="outlined"
            color="gray"
            size="sm"
            className="flex items-center gap-2"
            onClick={() => navigate("/admin/users")}
          >
            <FaArrowLeft size={14} /> Back
          </Button>
          <Button
            variant="outlined"
            color="blue"
            size="sm"
            className="flex items-center gap-2"
            onClick={() => navigate(`/admin/users/${id}/edit`)}
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Overview */}
        <Card className="overflow-hidden">
          <div className="h-28 bg-gradient-to-r from-primary-600 to-primary-400"></div>
          <CardBody className="p-6 -mt-12">
            <div className="flex flex-col items-center">
              <img
                src={user.image}
                alt={user.name}
                className="w-24 h-24 rounded-full border-4 border-white object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://via.placeholder.com/400x400?text=No+Image";
                }}
              />
              <Typography variant="h5" color="blue-gray" className="mt-4 mb-1">
                {user.name}
              </Typography>
              <Typography
                variant="small"
                className="font-medium text-gray-600 mb-4"
              >
                {user.role}
              </Typography>
            </div>

            <div className="border-t border-gray-200 mt-6 pt-6">
              <div className="mb-4">
                <div className="flex items-center">
                  <FaEnvelope className="text-gray-500 mr-3" />
                  <Typography
                    variant="small"
                    className="font-medium text-gray-700"
                  >
                    Email
                  </Typography>
                </div>
                <Typography variant="small" className="ml-8 mt-1">
                  {user.email}
                </Typography>
              </div>

              <div className="mb-4">
                <div className="flex items-center">
                  <FaIdBadge className="text-gray-500 mr-3" />
                  <Typography
                    variant="small"
                    className="font-medium text-gray-700"
                  >
                    Role
                  </Typography>
                </div>
                <Typography variant="small" className="ml-8 mt-1">
                  {user.role}
                </Typography>
              </div>

              <div>
                <div className="flex items-center">
                  <FaCalendarAlt className="text-gray-500 mr-3" />
                  <Typography
                    variant="small"
                    className="font-medium text-gray-700"
                  >
                    Joined
                  </Typography>
                </div>
                <Typography variant="small" className="ml-8 mt-1">
                  {format(new Date(user.createdAt), "MMMM d, yyyy")}
                </Typography>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Activity and Stats */}
        <Card className="lg:col-span-2">
          <CardBody>
            <Typography variant="h6" color="blue-gray" className="mb-4">
              Recent Activity
            </Typography>
            <div className="border-l-2 border-gray-200 pl-4 ml-2">
              {/* Activity timeline - in a real app, fetch from API */}
              <div className="relative mb-6">
                <div className="w-3 h-3 rounded-full bg-primary-500 absolute -left-[26px] top-1.5"></div>
                <Typography
                  variant="small"
                  className="font-medium text-gray-800"
                >
                  Logged in
                </Typography>
                <Typography variant="small" className="text-gray-600">
                  Today, 9:30 AM
                </Typography>
              </div>

              <div className="relative mb-6">
                <div className="w-3 h-3 rounded-full bg-primary-500 absolute -left-[26px] top-1.5"></div>
                <Typography
                  variant="small"
                  className="font-medium text-gray-800"
                >
                  Updated profile information
                </Typography>
                <Typography variant="small" className="text-gray-600">
                  Yesterday, 2:15 PM
                </Typography>
              </div>

              <div className="relative mb-6">
                <div className="w-3 h-3 rounded-full bg-primary-500 absolute -left-[26px] top-1.5"></div>
                <Typography
                  variant="small"
                  className="font-medium text-gray-800"
                >
                  Completed onboarding
                </Typography>
                <Typography variant="small" className="text-gray-600">
                  {format(new Date(user.createdAt), "MMMM d, yyyy")}
                </Typography>
              </div>
            </div>

            <div className="mt-8">
              <Typography variant="h6" color="blue-gray" className="mb-4">
                Stats
              </Typography>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4">
                  <Typography variant="small" className="text-gray-600 mb-1">
                    Orders
                  </Typography>
                  <Typography
                    variant="h4"
                    className="font-semibold text-gray-800"
                  >
                    24
                  </Typography>
                </div>

                <div className="border rounded-lg p-4">
                  <Typography variant="small" className="text-gray-600 mb-1">
                    Reviews
                  </Typography>
                  <Typography
                    variant="h4"
                    className="font-semibold text-gray-800"
                  >
                    7
                  </Typography>
                </div>

                <div className="border rounded-lg p-4">
                  <Typography variant="small" className="text-gray-600 mb-1">
                    Total Spent
                  </Typography>
                  <Typography
                    variant="h4"
                    className="font-semibold text-gray-800"
                  >
                    $1,254
                  </Typography>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        handler={() => setDeleteDialogOpen(!deleteDialogOpen)}
      >
        <DialogHeader>Confirm Deletion</DialogHeader>
        <DialogBody>
          Are you sure you want to delete the user "{user.name}"? This action
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

export default UserDetails;
