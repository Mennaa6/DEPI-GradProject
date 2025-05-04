import { Typography } from "@material-tailwind/react";

const PageTitle = ({ title, subtitle }) => {
  return (
    <div className="mb-6">
      <Typography variant="h4" color="blue-gray" className="font-bold">
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="paragraph" color="gray" className="mt-1">
          {subtitle}
        </Typography>
      )}
    </div>
  );
};

export default PageTitle;
