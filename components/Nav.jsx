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

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await getProviders();
        setProviders(response);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProviders();
  }, []);

  const renderAuthButtons = () => {
    if (isLoading) {
      return <div className="loading">Loading...</div>;
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
            >
              Sign in
            </button>
          ))}
      </>
    );
  };

  return (
    <>
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
              />

              {toggle && (
                <div className='dropdown'>
                  <Link href='/profile'
                    className='dropdown_link'
                    onClick={() => setToggle(false)}
                  >
                    My Profile
                  </Link>
                  <Link href='/create-prompt'
                    className='dropdown_link'
                    onClick={() => setToggle(false)}
                  >
                    Create Prompt
                  </Link>
                  <button type="button"
                    className='black_btn mt-5 w-full'
                    onClick={() => {setToggle(false); signOut();}}
                  >
                    SignOut
                  </button>
                </div>
              )}
            </div>
          ) : renderAuthButtons()}
        </div>
      </nav>
    </>
  )
}

export default Nav;