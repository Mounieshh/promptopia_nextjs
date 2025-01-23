'use client'

import Image from 'next/image'
import Link from 'next/link'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
import { useState, useEffect } from 'react'

const Nav = () => {
  const {data: session} = useSession();
  
  const [providers, setProviders] = useState(null);
  const [toggle, setToggle] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await getProviders();
        setProviders(response);
      } catch (err) {
        setError('Failed to load authentication providers');
        console.error('Error fetching providers:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProviders();
  }, []);

  const renderAuthButtons = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center px-4 py-2 bg-gray-100 rounded-md" role="status">
          <div className="w-4 h-4 mr-2 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
          <span>Loading...</span>
        </div>
      );
    }

    if (error) {
      return <div className="text-red-500" role="alert">{error}</div>;
    }
    
    return (
      <>
        {providers &&
          Object.values(providers).map((provider) => (
            <button
              type='button'
              key={provider.name}
              onClick={() => signIn(provider.id)}
              className='black_btn'
              aria-label={`Sign in with ${provider.name}`}
            >
              Sign in
            </button>
          ))}
      </>
    );
  };

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href="/" className='flex gap-2 flex-center'>
        <Image
          src="/assets/images/logo.svg"
          width={30}
          height={30}
          alt='Logo'
          className='object-contain'
        />
        <p className='logo_text'>Promptopia</p>
      </Link>

      <div className='sm:flex hidden'>
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href='/create-prompt' className='black_btn'>
              Create Post
            </Link>

            <button
              type="button"
              onClick={signOut}
              className='outline_btn'
            >
              Sign Out
            </button>

            <Link href='/profile'>
              <Image
                src={session?.user.image}
                alt='profile'
                height={36}
                width={36}
                className='rounded-full'
              />
            </Link>
          </div>
        ) : renderAuthButtons()}
      </div>

      <div className='sm:hidden flex relative'>
        {session?.user ? (
          <div className='flex'>
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              alt='Profile'
              onClick={() => setToggle((prev) => !prev)}
              className='cursor-pointer'
              role="button"
              aria-expanded={toggle}
              aria-label="Toggle navigation menu"
            />

            {toggle && (
              <div className='dropdown' role="menu">
                <Link href='/profile'
                  className='dropdown_link'
                  onClick={() => setToggle(false)}
                  role="menuitem"
                >
                  My Profile
                </Link>
                <Link href='/create-prompt'
                  className='dropdown_link'
                  onClick={() => setToggle(false)}
                  role="menuitem"
                >
                  Create Prompt
                </Link>
                <button type="button"
                  className='black_btn mt-5 w-full'
                  onClick={() => {setToggle(false); signOut();}}
                  role="menuitem"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : renderAuthButtons()}
      </div>
    </nav>
  )
}

export default Nav;