import { useState } from 'react';

import ShopPriceCard from '../components/ShopPriceCard';

function Shop() {
    const plans = [
        { type: 'free', name: '1 Pull', price: '$1.99', features: [ 'Gauranteed 1 Random Monster'], image: "/src/assets/toothy.svg" },
        { type: 'pro', name: '3 Pull', price: '$3.99', features: [ 'Gauranteed 3 Random Monsters'], image: "/src/assets/goof.svg" },
        { type: 'enterprise', name: '5 Pull', price: '$6.99', features: ['Gauranteed 5 Random Monsters'], image: "/src/assets/plucky.svg" }
    ];

    // State to keep track of the currently active plan
    const [activePlan, setActivePlan] = useState(plans[0]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="flex mb-4">
                {plans.map(plan => (
                    <button
                        key={plan.name}
                        className={`px-4 py-2 text-sm font-semibold rounded-t-md transition-colors duration-300 
                                    ${activePlan.name === plan.name ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border border-blue-500'}`}
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
