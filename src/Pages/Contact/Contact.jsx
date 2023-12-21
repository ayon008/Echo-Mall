import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment } from '../../GlobalRedux/Features/Counter/counterSlice'

const Contact = () => {
  const count = useSelector((state) => state?.counter?.value)
  const dispatch = useDispatch()
  return (
    <>
      <div className='flex items-center justify-center gap-4 my-10'>
        <button className='bg-purple-500 p-2 text-white font-bold tracking-wider active:bg-indigo-700 cursor-pointer'
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span className='text-2xl font-medium text-slate-700'>{count}</span>
        <button className='bg-purple-500 p-2 text-white font-bold tracking-wider active:bg-indigo-700 cursor-pointer'
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </>
  )
}

export default Contact




