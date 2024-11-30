const Footer = () => {
  return (
    <footer className=" bg-zinc-200 py-10">
      <div className=" grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-5 text-center">
        <div className=" space-y-5">
          <h1 className=" text-2xl font-semibold">User Management System</h1>
          <p className=" opacity-70">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Recusandae
            optio reiciendis libero earum eaque vel cum excepturi hic
            necessitatibus omnis corporis distinctio adipisci consequuntur, in
            labore magnam assumenda sequi delectus?
          </p>
        </div>
        <div className="space-y-5">
          <h1 className=" text-3xl font-semibold">Contact</h1>
          <ul className="opacity-70">
            <li>+8801700554293</li>
            <li>+8801945055264</li>
            <li>hirockdutta0@gmail.com</li>
          </ul>
        </div>
        <div className="space-y-5  max-lg:col-span-2 max-md:col-span-1">
          <h1 className=" text-3xl font-semibold">Contact</h1>
          <ul className="opacity-70">
            <li>+8801700554293</li>
            <li>+8801945055264</li>
            <li>hirockdutta0@gmail.com</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
