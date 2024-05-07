import { Link } from "react-router-dom"; // Importing Link component from react-router-dom for navigation

function Success() {
  return (
    <div className="flex justify-center items-center h-[620px]">
      {" "}
      {/* Container div with flex layout */}
      <div className="flex flex-col m-auto justify-center items-center relative top-[50px]">
        {" "}
        {/* Inner div with flex layout */}
        <div className="[background:#FFF] shadow-[0px_4px_48px_0px_rgba(0,0,0,0.25)] rounded-2xl w-[300px] h-[400px] fixed -z-50"></div>{" "}
        {/* Background div with shadow styling */}
        <h1 className="text-center text-2xl font-bold mx-24 ">
          {" "}
          {/* Heading */}
          Thank you for your purchase!
        </h1>
        <Link
          to="/home" // Link to home page
          className="bg-blue-500 text-white p-2 rounded-xl w-24 text-center mt-8" // Styling for home link
        >
          Home
        </Link>
        <Link
          to="/adventure" // Link to adventure page
          className="bg-blue-500 text-white p-2 rounded-xl text-center mt-2" // Styling for adventure link
        >
          Back to Map
        </Link>
      </div>
    </div>
  );
}

export default Success; // Exporting Success component
