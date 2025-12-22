import { GiftIcon } from 'lucide-react';
import React, { use } from 'react';
import useAxios from '../../hooks/useAxios';
import { AuthContext } from '../../contexts/AuthContext';

const Funding = () => {

    const axiosInstancce = useAxios()
    const { user } = use(AuthContext)

    const handleCheckout = (e) => {
        e.preventDefault();
        const donateAmount = e.target.donateAmount.value;
        const donorEmail = user?.email;
        const donorName = user.displayName;

        const formData = {
            donateAmount,
            donorEmail,
            donorName
        }



        axiosInstancce.post('create-payment-checkout', formData)
            .then(res => {
                // console.log(res.data)
                window.location.href = res.data.url
            })
    }

    return (
        <div>
            <form onSubmit={handleCheckout} className='flex justify-center mt-30 items-center'>
                <div className="flex flex-col items-center justify-center gap-8 py-20">
                    <h1 className="text-4xl md:text-6xl font-black text-red-600">Funding Details</h1>

                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <input
                            type="text"
                            name='donateAmount'
                            placeholder="Amount"
                            className="input input-bordered input-lg w-64 bg-white border-gray-300 text-gray-800 rounded-full text-center text-xl font-medium"
                        />
                        <button className="btn btn-lg rounded-full font-bold text-xl px-10 shadow-lg">
                            <GiftIcon /><span className="text-3xl"> Give</span>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Funding;