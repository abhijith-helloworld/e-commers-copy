import Hero from '@/components/home/Hero'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import Features from '@/components/home/Features'
import Categories from '@/components/home/Categories'
import Testimonials from '@/components/home/Testimonials'

export const metadata = {
  title: 'The Spices Zone — Premium Organic Spices | Farm to Kitchen',
  description: 'Discover handpicked, farm-to-table organic spices from the finest regions of the world. Turmeric, saffron, cardamom, and 200+ more. Free shipping on orders above ₹999.',
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <Features />
      <Categories />
      <Testimonials />
    </>
  )
}
