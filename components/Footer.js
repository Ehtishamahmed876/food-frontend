const Footer = () => {
    return (
        <footer className="bg-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-white text-xl mb-2">Contact Us</h3>
              <p className="text-gray-300">BlueArea, Islamabad</p>
              <p className="text-gray-300">Phone: (+92) 3175044240</p>
              <p className="text-gray-300">Email: hunger@gamil.com</p>
            </div>
            <div>
              <h3 className="text-white text-xl mb-2">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white">
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 17l5-5-5-5m0 10h8" />
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-center text-gray-300">&copy; 2023 FENOM DEVELOPERS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
};
export default Footer;