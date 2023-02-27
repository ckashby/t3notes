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
  const { data: sessionData } = useSession(); // is this used?

  const { data: topics, refetch: refectTopics } = api.topic.getAll.useQuery(
    // is this used?
    undefined, // no input
    {
      enabled: sessionData?.user !== undefined, // is this used?
    }
  );

  const createTopic = api.topic.create.useMutation({});

  return (
    <div className="mx-5 mt-5 grid grid-cols-4 gap-2">
      <div className="px-2">
        <ul className="menu rounded-box w-56 bg-base-100 p-2">
          {topics?.map((topic) => (
            <li key={topic.id}>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                {topic.title}
              </a>
            </li>
          ))}
        </ul>
        <div className="divider"></div>
        <input
          type="text"
          placeholder="New Topic"
          className="input-bordered input input-sm w-full"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              createTopic.mutate({
                title: e.currentTarget.value,
              });
              e.currentTarget.value = "";
            }
          }}
        />
      </div>
      <div className="col-span-3"></div>
    </div>
  );
};

// <div>{JSON.stringify(topics)}</div>;    // is this used?
