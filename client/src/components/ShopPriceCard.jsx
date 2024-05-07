// Importing necessary functions and hooks from libraries and files
import { loadStripe } from "@stripe/stripe-js"; // Function to load Stripe
import { useLazyQuery } from "@apollo/client"; // Hook for lazy queries with Apollo Client
import { QUERY_CHECKOUT } from "../utils/queries"; // Query for checkout process
import { useEffect } from "react"; // Hook for side effects in functional components

// Stripe public key for initializing Stripe.js
const stripePromise = loadStripe(
  "pk_test_51PCS10CGe9Scab64Md22bDMnlNW7es6tE0ztjKpqxL9yQgtn3qwHJMwnFfFYUmw7i8BdBdtJBlsVIs2tXuX24TIp00QvHbak8W"
);

// Functional component definition for PricingCard
const PricingCard = ({ plan }) => {
  // Lazy query to get checkout session data
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  // Effect hook to handle redirecting to Stripe checkout page after receiving session data
  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        // Redirect to Stripe checkout page with session ID
        res.redirectToCheckout({
          sessionId: data.createCheckoutSession.session,
        });
      });
    }
  }, [data]);

  // Function to handle payment process
  const handlePayment = async () => {
    // Call the getCheckout lazy query with price ID to initiate checkout
    getCheckout({
      variables: { priceId: "price_1PDJnqCGe9Scab64Pm63UU4l" },
    });
  };

  // Rendering component UI
  return (
    <div
      className={`pt-12 pb-12 px-12 md:p-6 border rounded-lg text-center z-100 ${
        // Dynamically setting background color and shadow based on plan type
        plan.type === "free"
          ? "bg-gray-100 shadow-[0px_4px_25px_0px_rgba(0,0,0,0.25)]"
          : plan.type === "pro"
            ? "bg-red-100 shadow-[0px_4px_25px_0px_rgba(0,0,0,0.25)]"
            : "bg-blue-100 shadow-[0px_4px_25px_0px_rgba(0,0,0,0.25)]"
      }`}
    >
      {/* Plan image */}
      <img
        src={plan.image}
        alt="Plan Image"
        className="mx-auto h-40 w-40 my-2"
      />
      {/* Plan name */}
      <h3 className="text-md md:text-lg font-bold">{plan.name}</h3>
      {/* Plan price */}
      <h2 className="text-3xl md:text-2xl text-amber-600 my-1 md:my-2">
        {plan.price}
      </h2>
      {/* List of plan features */}
      <ul className="">
        {plan.features.map((feature) => (
          <li key={feature} className="text-black text-sm md:text-base">
            {feature}
          </li>
        ))}
      </ul>
      {/* Button to choose the plan and initiate payment */}
      <button
        onClick={handlePayment}
        className="mt-2 md:mt-4 bg-blue-500 text-white px-4 md:px-4 py-1 md:py-2 rounded hover:bg-blue-600"
      >
        CHOOSE
      </button>
    </div>
  );
};

// Exporting the PricingCard component
export default PricingCard;
