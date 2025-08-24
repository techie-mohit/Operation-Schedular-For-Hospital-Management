import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="font-sans text-gray-800">

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white">
        <div className="max-w-7xl mx-auto px-4 py-20 text-center md:text-left md:flex md:items-center md:justify-between">
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold">Effortless Operation Scheduling</h1>
            <p className="text-lg md:text-xl text-gray-100">
              Schedule and manage surgeries, operation theatres, and staff with ease. 
              Optimized for hospitals of all sizes.
            </p>
            
          </div>
          <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
            <img
              src="https://img.freepik.com/free-vector/medical-team-hospital-cartoon_52683-46065.jpg"
              alt="Medical illustration"
              className="w-full max-w-md rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12 text-teal-600">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2 text-teal-500">Manage OTs</h3>
              <p>Organize operation theatres efficiently and avoid scheduling conflicts.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2 text-teal-500">Track Surgeries</h3>
              <p>Keep track of all surgeries and manage patient information seamlessly.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2 text-teal-500">User Roles</h3>
              <p>Admins, doctors, and users have role-based access to relevant features.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-teal-600 text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to streamline your hospital operations?</h2>
        <Link 
          to="/register" 
          className="bg-white text-teal-600 font-semibold px-8 py-3 rounded shadow hover:bg-gray-100 transition"
        >
          Get Started Today
        </Link>
      </section>

    </div>
  );
}
