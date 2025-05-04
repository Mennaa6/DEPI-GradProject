import { Button, Typography } from "@material-tailwind/react";
import { FaHome, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AdNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <div className="text-9xl font-bold text-primary-600">404</div>
          <Typography variant="h4" className="mb-2">
            Page Not Found
          </Typography>
          <Typography variant="paragraph" className="text-gray-600 mb-8">
            The page you are looking for doesn't exist or has been moved.
          </Typography>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="filled"
            color="blue"
            className="flex items-center justify-center gap-2"
            onClick={() => navigate("/dashboard")}
          >
            <FaHome size={16} /> Go to Dashboard
          </Button>
          <Button
            variant="outlined"
            color="blue"
            className="flex items-center justify-center gap-2"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft size={16} /> Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdNotFound;
