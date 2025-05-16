import React, { useEffect, useState } from "react";
import { Avatar, Button, Spinner } from "@material-tailwind/react";
import { MdLocationOn, MdOutlineDone, MdDelete, MdClose } from "react-icons/md";
import Order from "../components/Order";

const UserProfile = () => {
  const [userData, setUserData] = useState({});
  const [userAddresses, setUserAddresses] = useState([]);
  const [addAddress, setAddAddress] = useState(false);
  const [newAddress, setNewAddress] = useState("");
  const [invalidAddress, setInvalidAddress] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = JSON.parse(window.localStorage.getItem("user")).id;
    if (userId) {
      fetch(`https://depis3.vercel.app/api/users/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          setUserData(data.User);
          if (userData) {
            fetch(`https://depis3.vercel.app/api/orders/${userId}`)
              .then((res) => res.json())
              .then((data) => {
                setOrders(data);
              });
          }
          setLoading(false);
        });
    }
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner color="blue" className="h-16 w-16" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
          {/* User Info Section */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-start gap-4">
              <Avatar
                src={
                  userData.image ||
                  "https://res.cloudinary.com/dvlmrrmdx/image/upload/v1747390819/836_gyc3ug.jpg"
                }
                alt="avatar"
                size="lg"
                className="border border-gray-200"
              />
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900 mb-1">
                  {userData.name || "User Profile"}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-sm text-gray-600">
                  <p className="flex items-center">
                    <span className="text-gray-500 mr-2">Email:</span>{" "}
                    {userData.email}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Addresses Section */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                My Addresses
              </h3>
              {!addAddress && (
                <Button
                  variant="outlined"
                  className="flex items-center gap-1 text-xs py-2 px-3 border-blue-500 text-blue-500"
                  onClick={() => setAddAddress(true)}
                >
                  <span className="text-lg">+</span> Add New Address
                </Button>
              )}
            </div>

            {addAddress && (
              <div className="mb-4 p-4 border border-gray-200 rounded-lg bg-gray-50 animate-fadeIn">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    className={`flex-1 border ${
                      invalidAddress ? "border-red-300" : "border-gray-300"
                    } rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="Enter new address"
                    value={newAddress}
                    onChange={(e) => {
                      setNewAddress(e.target.value);
                      if (e.target.value.length > 0) {
                        setInvalidAddress(false);
                      }
                    }}
                  />
                  <div className="flex gap-2">
                    <Button
                      variant="filled"
                      className="bg-blue-500 text-xs py-2 px-3 flex items-center gap-1"
                      onClick={() => {
                        if (newAddress.length === 0) {
                          setInvalidAddress(true);
                          return;
                        }
                        const update = [...userAddresses, newAddress];
                        setUserAddresses(update);
                        setNewAddress("");
                        setAddAddress(false);
                      }}
                    >
                      <MdOutlineDone size={16} /> Save
                    </Button>
                    <Button
                      variant="text"
                      className="text-gray-500 text-xs py-2 px-3 flex items-center gap-1"
                      onClick={() => {
                        setAddAddress(false);
                        setInvalidAddress(false);
                        setNewAddress("");
                      }}
                    >
                      <MdClose size={16} /> Cancel
                    </Button>
                  </div>
                </div>
                {invalidAddress && (
                  <p className="text-red-500 text-xs mt-1">
                    Address cannot be empty
                  </p>
                )}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {userAddresses.length > 0 ? (
                userAddresses.map((address, index) => (
                  <div
                    key={index}
                    className="flex group items-start border border-gray-200 rounded-lg p-3 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200"
                  >
                    <MdLocationOn className="text-blue-500 text-lg flex-shrink-0 mt-0.5 mr-2" />
                    <div className="flex-1 text-sm text-gray-700">
                      {address}
                    </div>
                    <button
                      className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-opacity duration-200"
                      onClick={() => {
                        const updatedAddresses = userAddresses.filter(
                          (_, i) => i !== index
                        );
                        setUserAddresses(updatedAddresses);
                      }}
                    >
                      <MdDelete size={18} />
                    </button>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-4 text-gray-500 text-sm">
                  No addresses saved yet
                </div>
              )}
            </div>
          </div>

          {/* Orders Section */}
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              My Orders
            </h3>
            <div className="space-y-6">
              {orders && orders.length > 0 ? (
                orders.map((order, index) => (
                  <Order key={index} order={order} setOrders={setOrders} />
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No orders found
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
