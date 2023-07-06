// import { withIronSession } from 'next-iron-session';

export const sessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD, // Replace with a strong and secure password
  cookieName: 'FOOD-HUNGER', // Replace with a unique cookie name
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production', // Set secure to true in production
	maxAge: 60 * 60 // 1 hour
  },
};
// export default function withSession(handler) {
//   return withIronSession(handler, sessionOptions);
// }



// This is where we specify the typings of req.session.*
// declare module 'iron-session' {
// 	interface IronSessionData {
// 		user?: User,
// 		// dashboard?: any
// 	}
// }