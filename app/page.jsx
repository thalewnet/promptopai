import Feed from '@components/Feed';

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover and Share
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center"> AI-Powerd Prompts</span>
      </h1>
      <p className="desc text-center">
        Prompts is an open-source AI prmpting tool for modern world to discover
        create adnd share creative prompts
      </p>
      {/* Feed component */}

      <Feed />
    </section>
  );
};

export default Home;
