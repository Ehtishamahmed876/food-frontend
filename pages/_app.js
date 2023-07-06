import '@/styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';

import { toast } from 'react-toastify';

toast.configure({})

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
