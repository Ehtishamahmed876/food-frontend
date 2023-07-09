import fetcher from "@/lib/fetchJson";
import { sessionOptions } from "@/lib/withSession";
import { withIronSessionSsr } from "iron-session/next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";


const DashboardPage = ({ user }) => {
  const router = useRouter();

  const onLogout = async () => {
    const resRaw = await fetch('/api/logout');
    console.log("hel", resRaw)
    const json = await resRaw.json();

    console.log("ee", json.isLoggedIn)
    if (json.isLoggedIn == false) {
      router.replace('/login')
    }
  }


  const [userData, setUserData] = useState(null);
  const [reqData, setReqData] = useState(null);


  const fetchData = async () => {
    const body = {
      email: user.email
    }
    try {
      const response = await fetcher('http://localhost:8081/getupload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      // console.log("helo",response)
      let data = response.user;
      data.reverse();
      setUserData(data);
      // console.log("user",userData )  
    } catch (error) {
      console.error('Error fetching user data:', error);
      setUserData(null);
    }
  };
  const fetchData2 = async () => {
    const body = {
      restuemail: user.email
    }
    try {
      const response = await fetcher('http://localhost:8081/getrequest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      // console.log("helo",response)
      setReqData(response.user);
      // console.log("user",userData )  
    } catch (error) {
      console.error('Error fetching user data:', error);
      setReqData(null);
    }
  };
  useEffect(() => {
    fetchData()
    fetchData2()

    return () => {
      // Cleanup logic here
    };
  }, []); // The second argument [] ensures the effect runs only once, similar to componentDidMount


  const [name, setName] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [base64Image, setBase64Image] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result;
      setBase64Image(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // You can now use the 'name' and 'base64Image' state values as needed (e.g., send them to the API).
    console.log('Name:', name);
    console.log('Base64 Image:', base64Image);
    const body = {
      email: user.email,
      name: name,
      data: base64Image
    }
    console.log(body)
    try {
      const response = await fetcher('http://localhost:8081/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      console.log("helo", response)
      if (response.message) {
        fetchData()
        toast.success("added sucessful")
      }
      else {
        toast.success(toast.error)
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setUserData(null);
    }
  };
   

  const Donated = async ({id,email}) => {
    const body = {
      email: email,

    }
    console.log(body)
    console.log("id",id)
    try {
      const response = await fetcher(`http://localhost:8081/donate/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      console.log("helo", response)
      if (response.message) {
        fetchData2()
        toast.success(response.message)
      }
      else {
        toast.success("Some problem occured")
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      // setUserData(null);
    }
  };

  const NotRecevied = async ({id,email}) => {
    const body = {
      email: email,

    }
    console.log(body)
    console.log("id",id)
    try {
      const response = await fetcher(`http://localhost:8081/notreceived/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      console.log("helo", response)
      if (response.message) {
        fetchData2()
        toast.success(response.message)
      }
      else {
        toast.success("Some problem occured")
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      // setUserData(null);
    }
  };

  const Rejected = async ({id,email}) => {
    const body = {
      email: email,

    }

    try {
      const response = await fetcher(`http://localhost:8081/rejected/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      console.log("helo", response)
      if (response.message) {
        fetchData2()
        toast.success(response.message)
      }
      else {
        toast.success("Some problem occured")
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      // setUserData(null);
    }
  };


  const Received = async ({id,foodid}) => {
    const body = {
      foodid: foodid,
    }
    console.log(id,body)
    try {
      const response = await fetcher(`http://localhost:8081/received/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      console.log("helo", response)
      if (response.message) {
        fetchData2()
        fetchData()
        toast.success(response.message)
      }
      else {
        toast.success("Some problem occured")
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      // setUserData(null);
    }
  };

  return (
    <>
      <div className='bg-green-500 min-h-screen'>
        <div className='flex bg-black justify-between  items-center p-3 '>
          <div className="flex justify-center  items-center   ">
            {/* <img className="w-20 h-14  mr-2" src="/images/mclogo.jpeg" alt="Restaurant Logo" /> */}
            <h1 className="text-3xl font-bold">{user.name}</h1>
          </div>
          {/* <Link href={"/"}> */}
          <button onClick={onLogout} className='cursor-pointer bg-green-300 h-10 mt-1 text-black p-2 rounded-lg'>Logout</button>
          {/* </Link> */}

        </div>
        <div className="flex gap-5">
          <div className="flex flex-1  flex-col md:flex-col p-2 gap-3">

            <div className=" p-4 flex-1 border bg-pink-500 rounded-2xl border-green-950">
              <h2 className="text-lg font-bold mb-4">Add New Food Item</h2>
              <form className="font-serif text-lg flex flex-col justify-center items-start gap-5" onSubmit={handleSubmit}>
                <div className="flex gap-3">
                  <label className="text-2xl" htmlFor="name">Name:</label>
                  <input className="text-black " type="text" id="name" value={name} onChange={handleNameChange} />
                </div>
                <div className="flex gap-3">
                  <label className="text-2xl" htmlFor="image">Image:</label>
                  <input className="text-white " type="file" id="image" onChange={handleImageChange} accept="image/*" />
                </div>
                <button className="bg-green-500 p-2 rounded-lg" type="submit">Submit</button>
              </form>
            </div>
            <div className=" p-4 flex-1 bg-pink-500 rounded-2xl border border-green-950">

              <div>
                <h2 className="text-lg font-bold mb-2">Posted Items</h2>
                {userData == null || userData.length == 0 ? (
                  <p>No items posted yet.</p>
                ) : (
                  <ul className='flex flex-wrap gap-2'>
                    {userData.reverse().map((item) => (
                      <li key={item.id} className="border p-2  mb-2">
                        <img className=" w-48 h-48 mr-2" src={item.data} alt="Food" />
                        <div className="flex  justify-between items-center gap-2 mt-1  w-48  flex-wrap">
                        <span className="text-xl">{item.name}</span>
                        <button
                          className={`ml-2  ${item.status == 1 ? "bg-green-500":"bg-red-500"}  text-white rounded-lg p-2 text-xl `}
                        // onClick={() => handleDeleteItem(item.id)}
                        >
                          {item.status == 1 ? "Donated" : "Not Donted"}
                        </button>
                        </div>
                       
                      </li>

                    ))}
                  </ul>
                )}
              </div>

            </div>



          </div>
          <div className="flex-1">
            <div className="p-2 ">
              <h1 className="text-2xl text-center">All Request</h1>
              {reqData == null || reqData.length == 0 ? (
                <p>No items posted yet.</p>
              ) : (
                <ul className='flex   rounded-xl p-3 flex-wrap gap-2'>
                  {reqData.map((item) => (
                    <li key={item._id} className="mb-2 bg-pink-500 rounded-xl p-5 border">
                      {/* <img className=" w-full mr-2" src={item.data} alt="Food" /> */}

                      <h1 className="text-2xl">FoodName:{item.foodname}</h1>

                      <h1 className="text-xl">Name:{item.name}</h1>
                      <h1 className="text-xl">Email:{item.emailreq}</h1>
                      <h1 className="text-xl">Cnic:{item.cnicreq}</h1>
                      <h1 className="text-xl">Contact:{item.contactreq}</h1>
                      <h1 className="text-xl">UserType:{item.usertypereq}</h1>
                      <h1 className="text-xl">Comment:{item.comment}</h1>

                      {
                        item.status == "requested" ? (
                          <>
                            <button
                              className="ml-2 text-white p-2 rounded-lg bg-green-500 text-xl "
                            onClick={() => Donated({id:item._id,email:item.emailreq})}
                            >
                              Donated
                            </button>
                            <button
                              className="ml-2 text-white p-2 rounded-lg bg-red-500 text-xl "
                              onClick={() => Rejected({id:item._id,email:item.emailreq})}

                            >
                              Rejected
                            </button>
                          </>

                        ) : (
                          <>
                            <button
                              className="ml-2 text-white p-2 rounded-lg bg-green-500 text-xl "
                              onClick={() => Received({id:item._id,foodid:item.foodid})}

                            >
                              Received
                            </button>
                            <button
                              className="ml-2 text-white p-2 rounded-lg bg-red-500 text-xl "
                              onClick={() => NotRecevied({id:item._id,email:item.emailreq})}
                            >
                              Not Received
                            </button>
                          </>

                        )
                      }

                    </li>

                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;

export const getServerSideProps = withIronSessionSsr(function ({
  req,
  res,
}) {
  const user = req.session.user
  console.log(user)


  if (user === undefined) {
    res.setHeader('location', '/login')
    res.statusCode = 302
    res.end()
    return {
      props: {
        user: { isLoggedIn: false, email: '', name: '', }

      },
    }
  }



  return {

    props: { user: user.user, },

  }
},
  sessionOptions)