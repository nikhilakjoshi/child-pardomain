import clsx from "clsx";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import Head from "next/head";
import { Rubik } from "next/font/google";

const font = Rubik({
  subsets: ["latin-ext"],
});

export const getServerSideProps = (context: GetServerSidePropsContext) => {
  console.log("server-cookie on child-pardomain: ", context.req.headers.cookie);
  return {
    props: {
      cookie: context.req.headers.cookie,
    },
  };
};
export default function Banking(
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={clsx("flex min-h-screen flex-col", font.className)}>
        <nav className="bg-blue-50 px-20 py-4">
          <div className="text-xl font-semibold text-gray-700">Child App</div>
        </nav>
        <div className="px-20 py-4">
          {props.cookie && (
            <div className="text-xl font-semibold text-gray-700">
              {props.cookie}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
