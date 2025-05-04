import { Avatar, Button, Spinner } from "@material-tailwind/react";
import { MdLocationOn, MdOutlineDone, MdDelete, MdClose } from "react-icons/md";
import Order from "../components/Order";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [userData, setUserData] = useState({});
  const [userAddresses, setUserAddresses] = useState([]);
  const [addAddress, setAddAddress] = useState(false);
  const [newAddress, setNewAddress] = useState("");
  const [invalidAdress, setInvalidAdress] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    // if (!window.localStorage.getItem("id")) {
    //   navigate("/login");
    // }

    const userId = Number(JSON.parse(window.localStorage.getItem("id")));
    fetch("https://spotted-thankful-mambo.glitch.me/users")
      .then((res) => res.json())
      .then((data) => {
        data.forEach((element) => {
          if (element.id == userId) {
            setUserData(element);
            setUserAddresses(element.addresses);
            element.orders.forEach((orderId) => {
              fetch(
                `https://spotted-thankful-mambo.glitch.me/orders/${orderId}`
              )
                .then((res) => res.json())
                .then((data) => setOrders((prev) => [...prev, data]))
                .catch((error) => console.log(error));
            });
          }
          setLoading(false);
        });
      });
  }, []);

  function handleNewAdress() {
    if (newAddress.length === 0) {
      setInvalidAdress(true);
      return;
    }
    const update = [...userAddresses, newAddress];
    setUserAddresses(update);
    setAddAddress(false);
    fetch(
      `https://spotted-thankful-mambo.glitch.me/users/${JSON.parse(
        window.localStorage.getItem("id")
      )}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          addresses: update, // updated addresses array
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  }

  function handleDelete(addTodelete) {
    const updatedAddresses = userAddresses.filter((item) => {
      return item != addTodelete;
    });
    console.log(updatedAddresses);
    setUserAddresses(updatedAddresses);

    fetch(
      `https://spotted-thankful-mambo.glitch.me/users/${JSON.parse(
        window.localStorage.getItem("id")
      )}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          addresses: updatedAddresses, // updated addresses array
        }),
      }
    )
      .then((response) => response.json())
      .catch((error) => console.error("Error:", error));
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner color="brown" className="h-16 w-16" />
      </div>
    );
  }

  return (
    <div className="flex justify-around sm:m-8 m-3 ">
      <div className=" w-full flex flex-col justify-center rounded-lg border border-gray-600 h-fit pt-6 pb-6 bg-white">
        <div className="flex flex-col gap-4 h-[90%]">
          <div className="flex justify-around">
            <div className="flex gap-3 w-[96%] text-[0.9em]">
              <Avatar
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                alt="avatar"
                size="lg"
              />
              <div className="flex flex-col gap-1">
                <p>{userData.firstName + " " + userData.lastName}</p>
                <div className="flex flex-col justify-between sm:flex-row sm:w-[102%]">
                  <p>Email: {userData.email},</p>
                  <p>Phone: {userData.phone}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <hr className="w-[96%] border border-gray-200" />
          </div>
          <div className="flex md:justify-around w-[96%] text-[0.85em]">
            <div className="sm:grid sm:grid-cols-3 flex flex-col gap-4 w-[96%]">
              {userAddresses.map((element, index) => {
                return (
                  <div
                    className="flex justify-between sm:w-[80%] w-[50%] ml-1"
                    key={index}
                  >
                    <div
                      className="md:border border-gray-400 rounded p-1 sm:text-sm w-[90%] cursor-pointer"
                      key={index}
                    >
                      <MdLocationOn className="inline-flex" size={16} />
                      {element}
                    </div>
                    <MdDelete
                      className="rounded-sm mt-1 cursor-pointer hover:bg-gray-400"
                      size={18}
                      onClick={() => handleDelete(element)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex justify-around">
            <div className="w-[96%]">
              <div className="flex flex-col gap-4">
                {addAddress && (
                  <div className="flex justify-between w-[40%]">
                    <input
                      type="text"
                      className="w-[80%] text-gray-900 bg-transparent border border-gray-400 rounded-md p-1 "
                      placeholder="New Adress"
                      onChange={(e) => {
                        setNewAddress(e.target.value);
                        if (newAddress.length > 0) {
                          setInvalidAdress(false);
                        }
                      }}
                      value={newAddress}
                    />
                    <MdOutlineDone
                      size={20}
                      className="border border-gray-900 rounded-sm mt-1 cursor-pointer hover:bg-gray-400"
                      onClick={handleNewAdress}
                    />

                    <MdClose
                      className="border border-gray-900 rounded-sm mt-1 cursor-pointer hover:bg-gray-400"
                      size={20}
                      onClick={() => setAddAddress(false)}
                    />
                  </div>
                )}
                {invalidAdress && (
                  <h1 className="text-red-700 text-[0.7em]">
                    Adress Can Not be Empty
                  </h1>
                )}
                <Button
                  variant="outlined"
                  className="w-[33%] text-[0.65em] sm:text-[0.5em] md:text-[0.7em] sm:w-[18%] p-2 border-gray-500"
                  onClick={() => setAddAddress(true)}
                >
                  + Add New Adress
                </Button>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <hr className="w-[96%] border border-gray-200" />
          </div>

          <p className="ml-6">Your Orders</p>

          <div className="flex flex-col gap-5 justify-center items-center">
            {orders.length ? (
              orders.map((element) => (
                <Order
                  order={element}
                  payment={userData.payment}
                  key={element.id}
                />
              ))
            ) : (
              <h1> No orders yet</h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
