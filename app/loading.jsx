'use client'

const loading = () => {
  return (
    <div className='w-full flex-center'>
      <div className='flex flex-col gap-4 items-center'>
       
        <div className='animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500'></div>
        <p className='text-lg text-gray-600'>Loading...</p>
      </div>
    </div>
  )
}

export default loading