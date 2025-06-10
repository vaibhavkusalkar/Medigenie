import CustomSpotlightCard from '@/components/custom/CustomSpotlightCard'
import React from 'react'
import { Brain } from 'lucide-react'

const TestPage = () => {
  return (
    <div 
        className='flex flex-col items-center justify-center h-screen bg-black'
        style={{
            backgroundImage: "url('/assets/images/background.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
        }}
    >
        <CustomSpotlightCard className="col-span-2 row-span-2 group">
  <div className="flex flex-col h-full">
    <div className="mb-6">
      <Brain className="w-12 h-12 text-blue-400 animate-pulse" />
    </div>
    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-glow">
      AI-Powered Disease Prediction
    </h3>
    <p className="text-gray-300 mb-6">
      Harness the power of advanced AI algorithms to predict potential diseases and provide early interventions, improving patient outcomes.
    </p>
    <div className="mt-auto">
      <div className="w-full h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl opacity-20 group-hover:opacity-30 transition-opacity" />
    </div>
  </div>
</CustomSpotlightCard>

    </div>
  )
}

export default TestPage

/*
<Image
			src="/assets/images/background.png"
			layout="fill"
			objectFit="cover"
			alt="MediGenie Interface"
			priority
			className="transition-all duration-300"
		/>
*/
