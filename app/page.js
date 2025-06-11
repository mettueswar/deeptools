// app/page.js
import HeroSection from '@/components/hero-section'
import ToolsGrid from '@/components/tools-grid'

export default function Home() {
  return (
    <>
      <HeroSection />
      {/* <div className="container mx-auto px-4 py-3"> */}

      <ToolsGrid />
      {/* </div> */}
    </>

  )
}