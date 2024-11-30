import { toast } from "react-toastify";
import axios from "axios";
import { TfiControlBackward } from "react-icons/tfi";
import { Link } from "react-router-dom";
const Add_User = () => {
  const onSaveUser = async (e) => {
    e.preventDefault();
    try {
      const form = e.target;
      const formdata = new FormData(form);
      const UserData = {
        name: formdata.get("name"),
        email: formdata.get("email"),
        gender: formdata.get("gender"),
        status: formdata.get("status"),
      };
      const response = await axios.post(
        `${import.meta.env.VITE_DOMAIN}/user`,
        UserData
      );
      if (response?.data?.success) {
        form.reset();
        toast.success(response?.data?.message);
      } else {
        toast.success(response?.data?.message);
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <main className=" py-10  bg-slate-100 min-h-screen">
      <section>
        <div className="">
          <Link to={"/"} className=" flex items-center gap-2">
            <TfiControlBackward />
            <span>Add User</span>
          </Link>
        </div>
        <div className="  flex flex-col items-center">
          <h1 className=" text-3xl font-semibold">New User</h1>
          <p className=" mt-2 text-xl opacity-60">
            Use the below form to create a new account
          </p>
          <form onSubmit={onSaveUser} className=" mt-10 w-full">
            <div className="">
              <h1 className=" opacity-50">Name</h1>
              <input
                type="text"
                name="name"
                className=" pl-2 h-12 outline-none rounded-md mt-1 w-full"
                placeholder="Enter your name"
              />
            </div>
            <div className="">
              <h1 className=" opacity-50">Email</h1>
              <input
                type="email"
                name="email"
                className=" pl-2 h-12 outline-none rounded-md mt-1 w-full"
                placeholder="Enter your email"
              />
            </div>

            <div className=" mt-5">
              <div className=" grid grid-cols-3 gap-5 ">
                <div className="">
                  <h1>Gender</h1>
                </div>

                <div className=" flex items-center gap-5">
                  <input type="radio" name="gender" value={"male"} />
                  <h1>Male</h1>
                </div>

                <div className=" flex items-center gap-5">
                  <input type="radio" name="gender" value={"female"} />
                  <h1>Female</h1>
                </div>

                <div className="">
                  <h1>Status</h1>
                </div>
                <div className=" flex items-center gap-5">
                  <input type="radio" name="status" value={"active"} />
                  <h1>Active</h1>
                </div>
                <div className=" flex items-center gap-5">
                  <input type="radio" name="status" value={"inactive"} />
                  <h1>Inactive</h1>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className=" mt-5 bg-green-600 w-full h-12 text-white"
            >
              Save
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Add_User;
