import { type NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { Header } from "~/components/Header";

const Home: NextPage = () => {
  // const hello = api.example.hello.useQuery({ text: "around the world" });

  return (
    <>
      <Head>
        <title>Welcome</title>
        <meta name="description" content="React jobs, NextJS jobs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
        <Content />
      </main>
    </>
  );
};

export default Home;

const Content: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: topics, refetch: refectTopics } = api.topic.getAll.useQuery(
    undefined, // no input
    {
      enabled: sessionData?.user !== undefined,
    }
  );
  return <div>{JSON.stringify(topics)}</div>;
};
