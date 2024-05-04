

function PricingCard({ plan }) {
    return (
        <div className={`p-4 md:p-6 border rounded-lg text-center ${plan.type === 'free' ? 'bg-gray-100' : plan.type === 'pro' ? 'bg-red-100' : 'bg-blue-100'}`}>
            <img src={plan.image} alt="Plan Image" className="mx-auto h-20 w-20 my-2" />
            <h3 className="text-md md:text-lg font-bold">{plan.name}</h3>
            <h2 className="text-3xl md:text-2xl text-amber-600 my-1 md:my-2">{plan.price}</h2>
            <ul className="">
                {plan.features.map(feature => (
                    <li key={feature} className="text-black text-sm md:text-base">{feature}</li>
                ))}
            </ul>
            <button className="mt-2 md:mt-4 bg-blue-500 text-white px-3 md:px-4 py-1 md:py-2 rounded hover:bg-blue-600">
                CHOOSE
            </button>
        </div>
    );
}

export default PricingCard;
