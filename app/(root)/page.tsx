'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import './style.css';
import { Button } from "@/components/ui/button"
import { Brain, Folder, Mic, BarChart3, Users, ArrowRight } from 'lucide-react'

const Home = () => {
  const [scrollY, setScrollY] = useState(0)
  const photoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const calculateWidth = () => {
    if (!photoRef.current) return '65%'

    const rect = photoRef.current.getBoundingClientRect()
    const viewportHeight = window.innerHeight
    const scrollProgress = Math.max(0, Math.min(1, scrollY / (viewportHeight * 0.7)))

    // Calculate width (65% to 100%)
    return `${70 + (scrollProgress * 35)}%`
  }

  const width = calculateWidth()

  return (
    <main className="min-h-[200vh] bg-black overflow-hidden bg-cover bg-center" /*style={{ backgroundImage: "url('/assets/images/screenshot.jpg')" }}*/>
      {/* Gradient Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[40%] left-[20%] w-[800px] h-[800px] rounded-full bg-purple-600/20 blur-[150px]" />
        <div className="absolute top-[20%] -right-[20%] w-[600px] h-[600px] rounded-full bg-violet-500/20 blur-[150px]" />
      </div>

      {/* Navbar with frosted glass effect */}
      <nav className="flex justify-center">
        <div className="flex h-12 w-[92%] top-4 z-30 fixed justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-violet-600/20 flex items-center justify-center backdrop-blur-sm border border-violet-500/20">
                <span className="text-violet-200">MG</span>
              </div>
              <span className="text-lg font-semibold text-white">MediGenie</span>
            </Link>
          </div>
    
          <div className="backdrop-blur-md rounded-full flex items-center justify-between px-3 z-30 border border-white/10 shadow-inner shadow-violet-300/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-12">
                <div className="hidden md:flex items-center space-x-8">
                  <Link href="#product" className="text-gray-300 hover:text-white transition-colors">
                    Product
                  </Link>
                  <Link href="#pricing" className="text-gray-300 hover:text-white transition-colors">
                    Pricing
                  </Link>
                  <Link href="#company" className="text-gray-300 hover:text-white transition-colors">
                    Company
                  </Link>
                  <Link href="#blog" className="text-gray-300 hover:text-white transition-colors">
                    Blog
                  </Link>
                  <Link href="#changelog" className="text-gray-300 hover:text-white transition-colors">
                    Changelog
                  </Link>
                </div>
              </div>
            </div>
          </div>
    
          <div className="flex items-center space-x-2">
            <Button variant="ghost" className="rounded-full text-gray-300 hover:text-white hover:secondary-button-innerglow transition-all">
              Register
            </Button>
            <Button className="backdrop-blur-sm bg-white/2 border border-white/30 shadow-lg shadow-purple-500/10 rounded-2xl px-6 hover:bg-transperent text-white primary-button-innerglow transition-all">
              Login
            </Button>
          </div>
        </div>
      </nav>
      

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 sm:pt-40 sm:pb-32">
        {/* New Feature Banner */}
        <div className="flex justify-center mb-8">
          <div className="px-4 py-1.5 rounded-full backdrop-blur-sm bg-white/5 border border-white/10 shadow-lg shadow-purple-500/10">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full bg-violet-500/20 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
              </div>
              <p className="text-sm text-gray-300">
                New: Our AI Assistance just landed
              </p>
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl items-center mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight text-glow">
            Stay one step ahead with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-300">
              MediGenie
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-12 text-glow">
            Predict health risks and uncover crucial disease indicators. Let AI help guide your medical decisions
          </p>
          <div className="pt-14">

          </div>
          {/* App Screenshot with Parallax Effect */}
          <div 
            ref={photoRef}
            className="relative mx-auto overflow-hidden rounded-2xl shadow-2xl shadow-purple-500/20 transition-all duration-300 ease-out"
            style={{ 
              width: width,
              aspectRatio: '16/9',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-violet-600/30 to-purple-600/30 mix-blend-overlay" />
            <div className="relative w-full h-full">
              <Image
                src="/assets/images/screenshot.jpg"
                layout="fill"
                objectFit="cover"
                alt="MediGenie Interface"
                priority
                className="transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-4 gap-6">
            {/* Large Block: AI-Powered Disease Prediction */}
            <div className="col-span-2 row-span-2 p-8 rounded-3xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-lg transition-all hover:shadow-purple-500/20 hover:border-purple-500/20 group">
              <div className="flex flex-col h-full">
                <div className="mb-6">
                  <Brain className="w-12 h-12 text-blue-400 animate-pulse" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-glow">AI-Powered Disease Prediction</h3>
                <p className="text-gray-300 mb-6">Harness the power of advanced AI algorithms to predict potential diseases and provide early interventions, improving patient outcomes.</p>
                <div className="mt-auto">
                  <div className="w-full h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl opacity-20 group-hover:opacity-30 transition-opacity" />
                </div>
              </div>
            </div>

            {/* Medium Block: Comprehensive Patient Records */}
            <div className="col-span-1 row-span-1 p-6 rounded-3xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-lg transition-all hover:shadow-blue-500/20 hover:border-blue-500/20 group">
              <div className="mb-4">
                <Folder className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-glow">Comprehensive Patient Records</h3>
              <p className="text-sm text-gray-300">Centralized and secure storage for complete patient histories, ensuring seamless care coordination.</p>
            </div>

            {/* Medium Block: Voice-Enabled Documentation */}
            <div className="col-span-1 row-span-1 p-6 rounded-3xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-lg transition-all hover:shadow-purple-500/20 hover:border-purple-500/20 group">
              <div className="mb-4">
                <Mic className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-glow">Voice-Enabled Documentation</h3>
              <p className="text-sm text-gray-300">Effortlessly capture and transcribe patient interactions, saving time and improving accuracy.</p>
            </div>

            {/* Medium Block: Real-Time Analytics */}
            <div className="col-span-1 row-span-1 p-6 rounded-3xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-lg transition-all hover:shadow-green-500/20 hover:border-green-500/20 group">
              <div className="mb-4">
                <BarChart3 className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-glow">Real-Time Analytics</h3>
              <p className="text-sm text-gray-300">Gain actionable insights from patient data to make informed decisions and improve care quality.</p>
            </div>

            {/* Small Block: Patient-Centric Design */}
            <div className="col-span-1 row-span-1 p-6 rounded-3xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-lg transition-all hover:shadow-yellow-500/20 hover:border-yellow-500/20 group">
              <div className="mb-4">
                <Users className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-glow">Patient-Centric Design</h3>
              <p className="text-sm text-gray-300">Intuitive interface prioritizing patient care and engagement.</p>
            </div>

            {/* Large Block: CTA */}
            <div className="col-span-2 row-span-1 p-8 rounded-3xl bg-gradient-to-br from-violet-600/30 to-purple-600/30 backdrop-blur-lg border border-white/10 shadow-lg transition-all hover:shadow-purple-500/30 hover:border-purple-500/30 group">
              <div className="flex flex-col h-full justify-center items-center text-center">
                <h3 className="text-3xl font-bold text-white mb-6 group-hover:text-glow">Revolutionize Healthcare with AI</h3>
                <Button
                  className="text-lg bg-white text-purple-700 hover:bg-purple-100 transition-all button-glow px-8 py-4 rounded-full group-hover:shadow-lg group-hover:shadow-purple-500/50"
                >
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5 animate-pulse" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Home

/*
old tagline 
//Think better with MediGenie - Never miss a note, idea or connection. Your AI-powered medical assistant.

old login button
<Button className="rounded-full px-6 hover:bg-violet-800 text-white button-glow transition-all">
              Login
            </Button>

.button-glow {
    box-shadow: 0 0 10px rgb(139 92 246 / 0.3),
                0 0 30px rgb(139 92 246 / 0.2),
                inset 0 0 1px rgb(139 92 246 / 0.1);
  }

Old Nav Bar
<nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-black/10 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-violet-600/20 flex items-center justify-center backdrop-blur-sm border border-violet-500/20">
                  <span className="text-violet-200">MG</span>
                </div>
                <span className="text-lg font-semibold text-white">MediGenie</span>
              </Link>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#product" className="text-gray-300 hover:text-white transition-colors">
                Product
              </Link>
              <Link href="#pricing" className="text-gray-300 hover:text-white transition-colors">
                Pricing
              </Link>
              <Link href="#company" className="text-gray-300 hover:text-white transition-colors">
                Company
              </Link>
              <Link href="#blog" className="text-gray-300 hover:text-white transition-colors">
                Blog
              </Link>
              <Link href="#changelog" className="text-gray-300 hover:text-white transition-colors">
                Changelog
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-gray-300 hover:text-white hover:button-glow transition-all">
                Login
              </Button>
              <Button className="bg-violet-600 hover:bg-violet-700 text-white button-glow transition-all">
                Start free trial
              </Button>
            </div>
          </div>
        </div>
      </nav>
*/