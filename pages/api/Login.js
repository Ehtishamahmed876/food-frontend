

import { withIronSessionApiRoute } from 'iron-session/next'
// import { sessionOptions } from '../../lib/session'
// import { NextApiRequest, NextApiResponse } from 'next'
// import fetchJson from '../../lib/fetchJson'
// import { LOGIN, ADMIN_LOGIN } from '../../services/ServiceUrl'
const url = "http://localhost:8081"

// import  {FormData} from 'formdata-node'
// import axios from 'axios'
// import fetchJson from '../../lib/fetchJson'
// import { base_url } from '../../constants/pageLinks'
// import { sessionOptions } from '../../lib/withSession'
import { User } from './user'
import { sessionOptions } from '/lib/withSession'
import fetcher from '/lib/fetchJson'


export default withIronSessionApiRoute(loginRoute, sessionOptions)

async function loginRoute(req, res) {
  const req_body = await req.body
  console.log(req_body);
    try {
      console.log("hello2")
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
         const resp = await fetcher( url + `/login`, {
            method: 'POST',
            body: JSON.stringify(req_body),
            headers: myHeaders
          })

    console.log("hey",resp)
    if(resp.user){
      const user = { isLoggedIn: true, ...resp } 
      req.session.user = user
      await req.session.save()
      res.json(user)
    }else{
      res.status(302).json({message: resp.message})
    }

    
  } catch (error) {
    // console.log(error.messsage)
    res.status(500).json({ message: (error).message })
  }
}
