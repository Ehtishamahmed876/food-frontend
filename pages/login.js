import NavbarCom from "@/components/Navbar";
import fetcher from "@/lib/fetchJson";
import useUser from "@/lib/useUser";
import { sessionOptions } from "@/lib/withSession";
import { withIronSessionSsr } from "iron-session/next";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";


const LoginPage = () => {
  const router = useRouter();

  // const { mutateUser } = useUser({
	// 	redirectTo: "/login",
	// 	redirectIfFound: true,
	// })


  const [email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
	const onSubmit = async (e) => {
		e.preventDefault()

		const body = {
			email: email,
			password: Password,
		}
		console.log(body)
		try {
			const res = await fetcher('/api/Login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body),
			})
			console.log("response1", res);
			// mutateUser(res);
			if(res.status == 403){
        toast.error(res.message)
				throw new Error('User not found');
			}
			if(res.user){
        toast.success(res.message)
				router.replace('/dashboard')
			}
		} catch (error) {
      toast.error("user not found")
			console.error('An unexpected error happened:', error)
			// setErrorMsg(error.data.message)
		}
	}
  return (
    <div className='flex min-h-screen flex-col'>
    <NavbarCom />
    <div className=" p-5 md:p-10 xl:p-20  bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="w-full px-3 py-2 border text-black border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <div className="flex items-center justify-between">
            {/* <Link href="/dashboard"> */}
            <button
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Login
            </button>
            {/* </Link> */}
         
          </div>
        </form>
      </div>
    </div>
  
    </div>
  );
};

export default LoginPage;

export const getServerSideProps = withIronSessionSsr(function ({
	req,
	res,
}) {

	const user = req.session.user


	if (user === undefined) {
		return {
			props: {
				user: { isLoggedIn: false, email: '', username: '', password: '' } ,
			},
		}
	}
	else {
		return {
			redirect: {
				destination: "/dashboard",
				permanent: false,
			},
			props: { user: req.session.user }
		}


	}
},
	sessionOptions)