const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t py-4 px-6">
      <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
        <div>
          <p>© {currentYear} VIN-TAGE. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
