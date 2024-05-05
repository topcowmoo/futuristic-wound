function PricingCard({ plan }) {
  return (
    <div
      className={`pt-12 pb-12 px-12 md:p-6 border rounded-lg text-center z-100 ${
        plan.type === "free"
          ? "bg-gray-100 shadow-[0px_4px_25px_0px_rgba(0,0,0,0.25)]"
          : plan.type === "pro"
          ? "bg-red-100 shadow-[0px_4px_25px_0px_rgba(0,0,0,0.25)]"
          : "bg-blue-100 shadow-[0px_4px_25px_0px_rgba(0,0,0,0.25)]"
      }`}
    >
      <img
        src={plan.image}
        alt="Plan Image"
        className="mx-auto h-40 w-40 my-2"
      />
      <h3 className="text-md md:text-lg font-bold">{plan.name}</h3>
      <h2 className="text-3xl md:text-2xl text-amber-600 my-1 md:my-2">
        {plan.price}
      </h2>
      <ul className="">
        {plan.features.map((feature) => (
          <li key={feature} className="text-black text-sm md:text-base">
            {feature}
          </li>
        ))}
      </ul>
      <button className="mt-2 md:mt-4 bg-blue-500 text-white px-4 md:px-4 py-1 md:py-2 rounded hover:bg-blue-600">
        CHOOSE
      </button>
    </div>
  );
}

export default PricingCard;
