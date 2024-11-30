import { FaPencil } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const App = () => {
  const [users, setUsers] = useState([]);

  const onDelete = async (Id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/user/delete/${Id}`
      );
      if (response?.data?.success) {
        toast.success("Delete successful!");
        setUsers(users?.filter((item) => item._id !== Id));
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    const unsubscribe = async () => {
      const response = await axios.get("http://localhost:5000/users");
      setUsers(response?.data);
    };
    unsubscribe();
    return () => unsubscribe();
  }, []);

  return (
    <main className={`${users?.length < 8 && " min-h-screen "}`}>
      <section>
        <div className=" p-5  ">
          <div className=" bg-slate-100 p-5  overflow-x-scroll">
            <Link
              to={"add_user"}
              className=" tooltip tooltip-right flex items-center gap-2 bg-white w-fit p-2 rounded-lg shadow-lg"
              data-tip="Add User"
            >
              <span>Add User</span>
              <FaUser />
            </Link>
            <table className="min-w-full border border-gray-200 bg-white text-sm text-left mt-5">
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  <th className="border-b px-4 py-2">ID</th>
                  <th className="border-b px-4 py-2">Name</th>
                  <th className="border-b px-4 py-2">Gmail</th>
                  <th className="border-b px-4 py-2">Gender</th>
                  <th className="border-b px-4 py-2">Status</th>
                  <th className="border-b px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {users?.map((item, index) => (
                  <tr key={item.id} className="border-t hover:bg-gray-50">
                    <td className="border-b  px-4 py-2">{index}</td>
                    <td className="border-b px-4 py-2">{item?.name}</td>
                    <td className="border-b px-4 py-2">{item?.email}</td>
                    <td className="border-b px-4 py-2">{item?.gender}</td>
                    <td className="border-b px-4 py-2">
                      <span
                        className={`inline-block rounded px-2 py-1 text-xs font-semibold ${
                          item.status === "Active"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {item?.status}
                      </span>
                    </td>
                    <td className=" flex items-center border-b gap-2">
                      <Link
                        to={`/update_user/${item?._id}`}
                        className="tooltip tooltip-top  bg-white p-2 rounded-lg shadow-lg text-purple-800"
                        data-tip="Edit"
                      >
                        <FaPencil />
                      </Link>
                      <button
                        onClick={() => onDelete(item?._id)}
                        className=" tooltip tooltip-top text-xl bg-white p-2 rounded-lg shadow-lg text-purple-800"
                        data-tip="Delete"
                      >
                        <IoClose />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
};

export default App;
