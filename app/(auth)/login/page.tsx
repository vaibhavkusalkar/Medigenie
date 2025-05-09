import AuthForm from '@/components/forms/AuthForm'
import React from 'react'

const Login = () => {
  return (
    <section className='flex-center size-full max-sm:px-6'>
        <AuthForm type='login'/>
    </section>
  )
}

export default Login