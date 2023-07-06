import { sessionOptions } from '/lib/withSession'
import { withIronSessionApiRoute } from 'iron-session/next'

// import { NextApiRequest, NextApiResponse } from 'next'
// import { Router } from 'next/router'
// import { sessionOptions } from '../../lib/withSession'
// import type { User } from './user'

export default withIronSessionApiRoute(logoutRoute, sessionOptions)

function logoutRoute(req, res) {
  
  req.session.destroy()
  res.json({ isLoggedIn: false,   id: '',
  name: '',
  govnumber: '',
  address: '',
  contact: '',
  email: '',})
  
}
