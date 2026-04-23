import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CartProvider from '@/components/cart/CartProvider'

export const metadata = {
  title: 'The Spices Zone — Premium Organic Spices',
  description: 'Discover handpicked, farm-to-table organic spices from the finest regions of the world. Elevate your cooking with The Spices Zone.',
  keywords: 'organic spices, premium spices, turmeric, saffron, cardamom, natural spices',
  openGraph: {
    title: 'The Spices Zone — Premium Organic Spices',
    description: 'Handpicked, farm-to-table organic spices from the finest regions of the world.',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}
