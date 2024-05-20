import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-2">Download Our App</h3>
            <p>Download App for Android and IOS mobile phone</p>
            <div className="app-logo mt-4">
              <img src="images/play-store.png" className="w-32 mb-2" alt="Play Store" />
              <img src="images/app-store.png" className="w-32" alt="App Store" />
            </div>
          </div>
          <div>
            <img src="images/logo-white.png" className="w-32 mb-4" alt="Logo" />
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industry's</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Useful Links</h3>
            <ul className="space-y-2">
              <li>Coupons</li>
              <li>Blog Posts</li>
              <li>Return Policy</li>
              <li>Join Affiliate</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Follow Us</h3>
            <ul className="space-y-2">
              <li>Facebook</li>
              <li>Twitter</li>
              <li>Instagram</li>
              <li>Youtube</li>
            </ul>
          </div>
        </div>
        <hr className="mt-8 mb-4" />
        <p className="text-center">Copyright 2023 - @Amazon</p>
      </footer>
  )
}

export default Footer