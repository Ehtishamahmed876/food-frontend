import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
// import Link from 'next/link';
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect } from 'react'
import React, { useClient, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import fetcher from "@/lib/fetchJson";
import { toast } from "react-toastify";



const Home = () => {
  const [userData, setUserData] = useState(null);

  const fetchData = async () => {
     
    try {
      const response = await fetcher('http://localhost:8081/allupload', {
        method: 'GET',
        // headers: {
        //   'Content-Type': 'application/json'
        // }, 
    
      });
      console.log("helo",response)
      setUserData(response.user);  
      console.log("user",userData )  
    } catch (error) { 
      console.error('Error fetching user data:', error);
      setUserData(null);
    }
  }; 
  useEffect(() => {
           fetchData()
          

    return () => {
      // Cleanup logic here
    };
  }, []); 


  let [isOpen, setIsOpen] = useState(false);
  let [id, setid] = useState("");
  let [emails, setemails] = useState("");
  let [names, setnames] = useState("");


  function closeModal() {
    setIsOpen(false);
  }

  function openModal(id,email,name) {
    console.log(id)
    setid(id);
    setemails(email)
    setnames(name)
    setIsOpen(true);
  }
  const [name, setName] = useState("");
  const [cnic, setCnic] = useState("");
  const [address, setAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [userType, setUserType] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here

		const body = {
      name: name,
      // restuid: id,
      foodid:id,
      restuemail:emails,
      foodname:names,
      cnic: parseInt(cnic),
      address: address,
      contact: parseInt(contactNumber),
      email: email,
      usertype:userType,
      comment: comment
		}
		console.log(body)
  
		try {
			const res = await fetcher('http://localhost:8081/request', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body),
			})
			console.log("response1", res);
		
			if(res.message){
        toast.success(res.message)
        closeModal()
			}
		} catch (error) {
      toast.error("some error")
			console.error('An unexpected error happened:', error)
			// setErrorMsg(error.data.message)
		}
  };

  const teamMembers = [
    {
      name: "Asim Qureshi",
      position: "CEO",
      image: "/images/asimpic.jpg",
    },
    {
      name: "Waseem Iqbal",
      position: "CTO",
      image: "/images/waseempic2.jpg",
    },
    {
      name: "Haziq Waheed",
      position: "Markating Manager",
      image: "/images/haziq.jpeg",
    },
  ];

  const connectedRestaurants = [
    {
      name: "McDonald",
      logo: "/images/mclogo.jpeg",
    },
    {
      name: "KFC",
      logo: "/images/kfclogo.jpeg",
    },
    {
      name: "OPTP",
      logo: "/images/optplogo.jpeg",
    },
    {
      name: "Wrap Lab",
      logo: "/images/wraplablogo.png",
    },
    {
      name: "Dominos Pizza",
      logo: "/images/domino logo.png",
    },
    // Add more restaurants as needed
  ];
  return (
    <main className="flex min-h-screen flex-col">
      <div>
        <Navbar />
      </div>

      {/* slider */}
      <div>
        <Carousel
          showThumbs={false}
          showStatus={false}
          showIndicators={false}
          infiniteLoop={true}
          autoPlay={true}
          interval={3000}
        >
           { userData == null|| userData.length == 0 ? (
           <div className="bg-gray-200">
           <img
             src="/images/breakfast.jpg"
             alt="Slider Image"
             className="object-cover h-64 md:h-80 lg:h-96 w-full"
           />
           <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
             <div className="text-center text-white">
               {/* <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                 McDonald's
               </h2> */}
               <p className="text-lg md:text-xl lg:text-2xl">
                 Burgers and much more
               </p>
               <button
                onClick={openModal}
                 className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
               >
                 Request
               </button>
             
             </div>
           </div>
         </div>
        ) : (
  
            userData.map((item) => ( 

            <div key={item._id} className="bg-gray-200">
            
            <img
              src={item.data}
              alt="Slider Image"
              className="object-cover h-64 md:h-80 lg:h-96 w-full"
            />
            <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
              <div className="text-center text-white">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                   {item.restuname}
                </h2>
                <p className="text-lg md:text-xl lg:text-2xl">
                 {item.name}
                </p>
                <button
                 onClick={()=>openModal(item._id,item.email,item.name)}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Request
                </button>
              
              </div>
            </div>
          </div>
          ))
        
           ) }
          
        
        </Carousel>
      </div>

      {/*  section 3 */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="mt-8 text-black font-serif lg:mt-0 lg:w-1/2 lg:pl-8">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Our Mission
              </h2>
              <p className="text-lg lg:text-xl mb-6">
                Our mission is to bridge the gap between restaurants with
                surplus food and individuals or families in need, while
                collaborating with NGOs to ensure efficient and effective
                distribution.
              </p>
              <p className="text-lg lg:text-xl">
                Our platform provides a seamless connection between restaurants
                and those facing food insecurity. Restaurants can easily log in
                to their dedicated portal and list the available food items they
                are willing to donate. These listings are then displayed on our
                website, allowing individuals and families in need to browse and
                request the specific food items they require.
              </p>
            </div>
            <div className="lg:w-1/2">
              <img
                src="/images/hungrygirl.jpg"
                alt="Section Image"
                className="object-cover h-64 md:h-80 lg:h-96 w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* about us section */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center">
            <div className="lg:w-1/2">
              <img
                src="/images/brothers.jpg"
                alt="About Us Image"
                className="object-cover h-64 md:h-80 lg:h-96 w-full"
              />
            </div>
            <div className="mt-8 text-black font-serif  lg:mt-0 lg:w-1/2 lg:pl-8">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">About Us</h2>
              <p className="text-lg lg:text-xl mb-6">
                we are passionate about fighting hunger and creating a world
                where no one goes to bed hungry. Our platform serves as a
                catalyst for change by connecting restaurants, individuals,
                families, and NGOs to eliminate food waste and address the
                pressing issue of food insecurity
              </p>
              <p className="text-lg lg:text-xl">
                We understand that restaurants often have surplus food that goes
                to waste at the end of the day. Simultaneously, many individuals
                and families struggle to access nutritious meals. Recognizing
                this gap, we have developed a user-friendly platform that allows
                restaurants to seamlessly donate their excess food, transforming
                it into an invaluable resource for those in need.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our team Section */}
      <section className="py-12 text-black font-serif  bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-8">
            Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg overflow-hidden"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="object-cover h-64 w-full"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{member.name}</h3>
                  <p className="text-gray-600">{member.position}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* our resturant section */}
      <section className="py-12 text-black font-serif  bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-center">
            Our Partnered Food Chains
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {connectedRestaurants.map((restaurant, index) => (
              <div key={index} className="flex items-center justify-center">
                <img
                  src={restaurant.logo}
                  alt={restaurant.name}
                  className="h-16 md:h-20"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* footer section */}
      <Footer />

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white  text-left align-middle shadow-xl transition-all">
                  <div className="">
                    <div className="flex items-center justify-center ">
                      <div className="bg-white w-full max-w-xl rounded shadow-lg p-6">
                        <h2 className="text-2xl text-black font-bold mb-6">
                          Registration Form
                        </h2>
                        {/* <h2 className="text-black">{id}</h2> */}
                        <h2 className="text-black">{names}</h2>

                        <form onSubmit={handleSubmit}>
                          <div className="flex gap-5">
                          <div>

                          <div className="mb-4">
                            <label
                              className="block text-gray-700 text-sm font-bold mb-2"
                              htmlFor="name"
                            >
                              Name
                            </label>
                            <input
                              className="w-full text-black px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                              type="text"
                              id="name"
                              placeholder="Enter your name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              required
                            />
                          </div>
                          <div className="mb-4">
                            <label
                              className="block text-gray-700 text-sm font-bold mb-2"
                              htmlFor="cnic"
                            >
                              CNIC
                            </label>
                            <input
                              className="w-full text-black px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                              type="text"
                              id="cnic"
                              placeholder="Enter your CNIC"
                              value={cnic}
                              onChange={(e) => setCnic(e.target.value)}
                              required
                            />
                          </div>
                          <div className="mb-4">
                            <label
                              className="block text-gray-700 text-sm font-bold mb-2"
                              htmlFor="email"
                            >
                              Email
                            </label>
                            <input
                              className="w-full text-black px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                              type="email"
                              id="email"
                              placeholder="Enter your email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                            />
                          </div>
                          </div>
                          <div>
                          <div className="mb-4">
                            <label
                              className="block text-gray-700 text-sm font-bold mb-2"
                              htmlFor="address"
                            >
                              Address
                            </label>
                            <input
                              className="w-full text-black px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                              type="text"
                              id="address"
                              placeholder="Enter your address"
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                              required
                            />
                          </div>
                          <div className="mb-4">
                            <label
                              className="block text-gray-700 text-sm font-bold mb-2"
                              htmlFor="userType"
                            >
                              User Type
                            </label>
                            <select
                              className="w-full text-black px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                              id="userType"
                              value={userType}
                              onChange={(e) => setUserType(e.target.value)}
                              required
                            >
                              <option value="">Select User Type</option>
                              <option value="ngo">NGO</option>
                              <option value="user">User</option>
                            </select>
                          </div>
                          <div className="mb-4">
                            <label
                              className="block  text-gray-700 text-sm font-bold mb-2"
                              htmlFor="contactNumber"
                            >
                              CONTACT
                            </label>
                            <input
                              className="w-full text-black px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                              type="text"
                              id="contactNumber"
                              placeholder="Enter your contactNumber"
                              value={contactNumber}
                              onChange={(e) => setContactNumber(e.target.value)}
                              required
                            />
                          </div>
                   
                          </div>
                          </div>

                          <div className="mb-6">
                            <label
                              className="block text-gray-700 text-sm font-bold mb-2"
                              htmlFor="comment"
                            >
                              Comment
                            </label>
                            <textarea
                              className="w-full text-black px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                              id="comment"
                              placeholder="Enter your comment"
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                              required
                            />
                          </div>

                          <div className="flex items-center justify-end">
                            <button
                              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                              type="submit"
                            >
                              Submit
                            </button>
                            <button
                              className="ml-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                              type="button"
                              onClick={closeModal}
                            >
                              Close
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </main>
  );
};
export default Home;

