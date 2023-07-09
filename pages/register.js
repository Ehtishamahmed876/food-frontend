import NavbarCom from "@/components/Navbar";
import fetcher from "@/lib/fetchJson";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";


const RegistrationPage = () => {
  const router = useRouter();

  const [restaurantName, setRestaurantName] = useState('');
  const [restaurantAddress, setRestaurantAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [govRegistrationNumber, setGovRegistrationNumber] = useState('');
  const [email, setEmail] = useState('');
  const [foodType, setFoodType] = useState('');
  const [Password, setPassword] = useState('');
  const [ConPassword, setConPassword] = useState('');
   
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
     if(Password!==ConPassword){
      return toast.success("Password and Conpassword does'nt match")
     }

		const body = {
      name: restaurantName,
      govnumber: govRegistrationNumber,
      address: restaurantAddress,
      contact: parseInt(contactNumber),
      email: email,
      foodtype:foodType,
      password: ConPassword
		}
		console.log(body)
		try {
			const res = await fetcher('http://localhost:8081/signup', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body),
			})
			console.log("response1", res);
			if(res.status == 403){
        toast.error(res.message)
				throw new Error('User not found');
			}
			if(res.message){
        toast.success(res.message)
				router.replace('/login')
			}
		} catch (error) {
      toast.error("user not found")
			console.error('An unexpected error happened:', error)
			// setErrorMsg(error.data.message)
		}
  };

  return (
    <div className='min-h-screen bg-white'>
    <NavbarCom />

    <div className=" p-5 md:p-10 xl:p-20 bg-gray-100 flex  items-center justify-center">
      <div className="max-w-xl w-full p-6  rounded shadow-md">
        <h2 className="text-2xl font-bold mb-6">Registration</h2>
        <form  onSubmit={handleSubmit}>
          <div className='flex gap-5'>
          <div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="restaurantName">
              Restaurant Name
            </label>
            <input
              className="w-full px-3 py-2 text-black border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              type="text"
              id="restaurantName"
              placeholder="Enter restaurant name"
              value={restaurantName}
              onChange={(e) => setRestaurantName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="restaurantAddress">
              Restaurant Address
            </label>
            <input
              className="w-full px-3 py-2 text-black border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              type="text"
              id="restaurantAddress"
              placeholder="Enter restaurant address"
              value={restaurantAddress}
              onChange={(e) => setRestaurantAddress(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contactNumber">
              Contact Number
            </label>
            <input
              className="w-full px-3 text-black py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              type="tel"
              id="contactNumber"
              placeholder="Enter contact number"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="w-full px-3 py-2 border text-black border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              type="password"
              id="password"
              placeholder="Enter your password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          </div>
          <div>
          <div className="mb-4">
            <label className="block  text-gray-700 text-sm font-bold mb-2" htmlFor="govRegistrationNumber">
              Government Registration Number
            </label>
            <input
              className="w-full px-3 text-black py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              type="text"
              id="govRegistrationNumber"
              placeholder="Enter government registration number"
              value={govRegistrationNumber}
              onChange={(e) => setGovRegistrationNumber(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="w-full px-3 text-black py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              type="email"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="foodType">
              Type of Food
            </label>
            <input
              className="w-full px-3 text-black py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              type="text"
              id="foodType"
              placeholder="Enter type of food"
              value={foodType}
              onChange={(e) => setFoodType(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold " htmlFor="conpassword">
             Confirm Password
            </label>
            <input
              className="w-full px-3 py-2  border text-black border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              type="conpassword"
              id="conpassword"
              placeholder="Enter your Confirm password"
              value={ConPassword}
              onChange={(e) => setConPassword(e.target.value)}
              required
            />
          </div>
     
            
          </div>
   
      
        
          </div>
          <div className="flex items-center justify-center ">
            <button
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Register
            </button>
          </div>
         
        </form>
      </div>
    </div>
    </div>
  );
};

export default RegistrationPage;