import CustomSpotlightCard from '@/components/custom/CustomSpotlightCard'
import React from 'react'

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
        <CustomSpotlightCard
            className='text-white'
            children={
                <h1>Hello, Vaibhav</h1>
            }
        />
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
