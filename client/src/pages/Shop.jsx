import { useState } from 'react';

import ShopPriceCard from '../components/ShopPriceCard';

function Shop() {
    const plans = [
        { type: 'free', name: '1 Pull', price: '$1.99', features: [ 'Guaranteed 1 Random Monster'], image: "/src/assets/toothy.svg" },
        { type: 'pro', name: '3 Pull', price: '$3.99', features: [ 'Guaranteed 3 Random Monsters'], image: "/src/assets/goof.svg" },
        { type: 'enterprise', name: '5 Pull', price: '$5.99', features: ['Guaranteed 5 Random Monsters'], image: "/src/assets/plucky.svg" }
    ];

    // State to keep track of the currently active plan
    const [activePlan, setActivePlan] = useState(plans[0]);

    return (
        <div className="h-[620px] flex my-auto items-center justify-center">
            {/* Rectangle background */}
            <div className="inset-0 bg-blue-200 z-0">
            {/* Main content */}
            <div className="flex flex-col items-center justify-center p-4 relative z-10">
                <div className="flex mb-0.3">
                    {plans.map(plan => (
                        <button
                            key={plan.name}
                            className={`px-4 py-2 text-sm font-semibold rounded-t-md transition-all duration-300 
                                    ${activePlan.name === plan.name ? 'bg-blue-500 text-white transform scaleY-1050' : 'bg-white text-blue-500 border border-blue-500'}`}
                            onClick={() => setActivePlan(plan)}
                        >
                            {plan.name}
                        </button>
                    ))}
                </div>
                <ShopPriceCard plan={activePlan} />
            </div>
        </div>
        </div>
    );
}

export default Shop;
