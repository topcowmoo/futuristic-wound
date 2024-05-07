import { Link } from "react-router-dom";

function Success() {
  return (
    <div className="2xl:flex 2xl:justify-center 2xl:items-center 2xl:h-[620px]">
      <div className="2xl:flex 2xl:flex-col 2xl:m-auto 2xl:justify-center 2xl:items-center 2xl:relative 2xl:top-[50px]">
        <div className="2xl:[background:#FFF] 2xl:shadow-[0px_4px_48px_0px_rgba(0,0,0,0.25)] 2xl:rounded-2xl 2xl:w-[300px] 2xl:h-[400px] 2xl:fixed 2xl:-z-50"></div>
        <h1 className="2xl:text-center 2xl:text-2xl 2xl:font-bold 2xl:mx-24">
          Thank you for your purchase!
        </h1>
        <Link
          to="/home"
          className="2xl:bg-blue-500 2xl:text-white 2xl:p-2 2xl:rounded-xl 2xl:w-24 2xl:text-center 2xl:mt-8"
        >
          Home
        </Link>
        <Link
          to="/adventure"
          className="2xl:bg-blue-500 2xl:text-white 2xl:p-2 2xl:rounded-xl 2xl:text-center 2xl:mt-2"
        >
          Back to Map
        </Link>
      </div>
    </div>
  );
}

export default Success;
