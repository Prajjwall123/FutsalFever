import React from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../assets/hero.jpg';


const HeroSection: React.FC = () => {
    const navigate = useNavigate();
    const handleclick=() =>{
        navigate("/login")
        window.location.reload();
    }
    return (
        <section className="bg-white">
            <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                <div className="mr-auto place-self-center lg:col-span-7">
                    <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-gray-900">FUTSAL FEVER</h1>
                    <p className="max-w-2xl mb-6 font-light text-gray-700 lg:mb-8 md:text-lg lg:text-xl">Enjoy the beautiful game with convenient online booking and reservations! </p>
                    <button className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-gray-900 border border-transparent rounded-lg hover:bg-gray-700 focus:ring-4 focus:ring-blue-300" onClick={handleclick}>
                        Login
                    </button>
                </div>
                <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                    <img src={Hero} alt="mockup" />
                </div>
            </div>
            <section className="bg-white py-12">
            <div className="container mx-auto text-center">
                <h2 className="text-3xl font-extrabold text-gray-900">Explore All the Best Futsals</h2>
                <p className="mt-4 text-lg text-gray-700">Explore and book from a wide range of  futsal venues.</p>
            </div>
            </section>
        </section>
        
    );
};

export default HeroSection;
