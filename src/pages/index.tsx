import { type NextPage } from "next";
import Head from "next/head";
import Benefit from "~/components/home/Benefit";
import Header from "~/components/home/Header";
import Navbar from "~/components/home/Navbar";

import benefitOneImg from "public/img/benefit-one.png";
import benefitTwoImg from "public/img/benefit-two.png";

import {
  FaceSmileIcon,
  ChartBarSquareIcon,
  CursorArrowRaysIcon,
} from "@heroicons/react/24/outline";
import FAQ from "~/components/home/FAQ";
import Footer from "~/components/home/Footer";

const devBenefits = {
  title: "Unlock the Benefits for Developers",
  desc: "Streamline your job search with our platform. Get personalized tech stack recommendations, find the perfect job faster, and stay connected with recruiters effortlessly. Maximize your opportunities and take your career to new heights today.",
  image: benefitOneImg,
  bullets: [
    {
      title: "Seamless Job Matching",
      desc: "Discover job opportunities that perfectly match your skills and preferences",
      icon: () => <FaceSmileIcon />,
    },
    {
      title: "Personalized Tech Stack Recommendations",
      desc: "Receive tailored recommendations based on your tech stack",
      icon: () => <ChartBarSquareIcon />,
    },
    {
      title: "Fast and Efficient Hiring Process",
      desc: "Experience a streamlined hiring process",
      icon: () => <CursorArrowRaysIcon />,
    },
  ],
};

const recruiterBenefits = {
  title:
    "Simplify Your Recruitment Process with Smart Matching and Seamless Communication",
  desc: "Discover top talent efficiently. Our platform offers smart matching and seamless communication to simplify your recruitment process. Connect with skilled developers who meet your tech requirements effortlessly and build a winning team. Streamline your hiring journey today.",
  image: benefitTwoImg,
  bullets: [
    {
      title: "Targeted Candidate Sourcing",
      desc: "Effortlessly find qualified candidates with the right skill set",
      icon: () => <FaceSmileIcon />,
    },
    {
      title: "Efficient Resume Screening",
      desc: "Simplify your recruitment process with efficient resume screening",
      icon: () => <ChartBarSquareIcon />,
    },
    {
      title: "Access to Top Tech Talent",
      desc: "Connect with top tech talent in the industry",
      icon: () => <CursorArrowRaysIcon />,
    },
  ],
};

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Lokerdeveloper</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Header />
      <div className="main-container mt-4 flex w-full flex-col items-center justify-center text-center">
        <p className="mb-3 max-w-2xl text-3xl font-bold leading-snug tracking-tight text-gray-800 dark:text-white lg:text-4xl lg:leading-tight">
          Why should you use Lokerdeveloper
        </p>
        <p className="text-sm font-bold uppercase tracking-wider text-indigo-600">
          For Developers
        </p>
      </div>
      <Benefit {...devBenefits} />
      <div className="main-container flex flex-col items-center justify-center pb-0 text-center text-sm font-bold uppercase tracking-wider text-indigo-600">
        For Recruiters
      </div>
      <Benefit rtl {...recruiterBenefits} />
      <FAQ />
      <Footer />
    </>
  );
};

export default Home;
