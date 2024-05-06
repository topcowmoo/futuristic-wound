import { useState } from "react";
import ShopPriceCard from "../components/ShopPriceCard";

function Shop() {
  const plans = [
    {
      type: "free",
      name: "1 Pull",
      price: "$1.99",
      features: ["Gauranteed 1 Random Monster"],
      image: "https://baketomobucket.s3.amazonaws.com/toothy.svg",
    },
    {
      type: "pro",
      name: "3 Pull",
      price: "$3.99",
      features: ["Gauranteed 3 Random Monsters"],
      image: "https://baketomobucket.s3.amazonaws.com/goof.svg",
    },
    {
      type: "enterprise",
      name: "5 Pull",
      price: "$6.99",
      features: ["Gauranteed 5 Random Monsters"],
      image: "https://baketomobucket.s3.amazonaws.com/plucky.svg",
    },
  ];

  // State to keep track of the currently active plan
  const [activePlan, setActivePlan] = useState(plans[0]);

  return (
    <div className="flex flex-col items-center justify-center h-[620px] p-4 ">
      <div className="[background:#8ECAE6] fixed -z-50 w-[450px] h-[400px] bottom-[200px]"></div>
      <div className="flex ">
        {plans.map((plan) => (
          <button
            key={plan.name}
            className={`mt-20 px-[30px] py-2 text-sm font-semibold rounded-t-md transition-colors duration-300 
                                    ${
                                      activePlan.name === plan.name
                                        ? "bg-blue-500 text-white"
                                        : "bg-white text-blue-500 border border-blue-500"
                                    }`}
            onClick={() => setActivePlan(plan)}
          >
            {plan.name}
          </button>
        ))}
      </div>
      <ShopPriceCard plan={activePlan} />
    </div>
  );
}

export default Shop;
