import Feed from "@components/Feed"


const Home = () => {
  return (
   <>
   <section className="w-full flex-center flex-col">
    <h1 className="head_text text-center">
        Discover & Share 
    <br className="max-md:hidden" />
    <span className="orange_gradient text-center">
        AI-Powered Prompts
    </span>
    </h1>
    <p className="desc text-center">
        Promptopia is an open-source <span className="font-semibold">AI prompting tool</span> for modern world to discover, create and share creatiev prompts
    </p>
   </section>

   <Feed/>
   </>
  )
}

export default Home