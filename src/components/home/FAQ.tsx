import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";

const FAQ = () => {
  return (
    <div className="main-container flex flex-col !p-0 lg:flex-row">
      <div className="mx-auto w-full max-w-2xl rounded-2xl p-2 lg:w-1/2">
        <p className="mb-3 text-center text-sm font-bold uppercase tracking-wider text-indigo-600">
          For Developers
        </p>
        {faqs.developers.map((item) => (
          <div key={item.question} className="mb-5">
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full items-center justify-between rounded-lg bg-gray-50 px-4 py-4 text-left text-lg text-gray-800 focus:outline-none focus-visible:ring focus-visible:ring-indigo-100 focus-visible:ring-opacity-75 dark:bg-gray-800 dark:text-gray-200">
                    <span>{item.question}</span>
                    <ChevronUpIcon
                      className={`${
                        open ? "rotate-180 transform" : ""
                      } h-5 w-5 text-indigo-500`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pb-2 pt-4 text-gray-500 dark:text-gray-300">
                    {item.answer}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </div>
        ))}
      </div>
      <div className="mx-auto w-full max-w-2xl rounded-2xl p-2 lg:w-1/2">
        <p className="mb-3 text-center text-sm font-bold uppercase tracking-wider text-indigo-600">
          For Recruiters
        </p>
        {faqs.recruiters.map((item) => (
          <div key={item.question} className="mb-5">
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full items-center justify-between rounded-lg bg-gray-50 px-4 py-4 text-left text-lg text-gray-800 focus:outline-none focus-visible:ring focus-visible:ring-indigo-100 focus-visible:ring-opacity-75 dark:bg-gray-800 dark:text-gray-200">
                    <span>{item.question}</span>
                    <ChevronUpIcon
                      className={`${
                        open ? "rotate-180 transform" : ""
                      } h-5 w-5 text-indigo-500`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pb-2 pt-4 text-gray-500 dark:text-gray-300">
                    {item.answer}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </div>
        ))}
      </div>
    </div>
  );
};

const faqs = {
  developers: [
    {
      question: "Who can join the platform?",
      answer:
        "Our platform welcomes developers of all experience levels and from any industry. Whether you're a seasoned professional or just starting your career, you can create a profile and explore job opportunities tailored to your expertise.",
    },
    {
      question: "How does the job matching process work?",
      answer:
        "Our advanced algorithms analyze your skills, experience, and preferences to match you with relevant job opportunities. You'll receive personalized recommendations based on your tech stack, ensuring you find roles that align with your expertise and interests.",
    },
    {
      question: "Can I update my availability?",
      answer:
        "Yes! You can easily update your availability status on the platform. By keeping your availability up-to-date, you ensure that recruiters and hiring managers see your current availability for new opportunities.",
    },
  ],
  recruiters: [
    {
      question: "What types of developers can I find on the platform?",
      answer:
        "Our platform caters to a wide range of developers, including front-end, back-end, full-stack, mobile app developers, and more. You can find talent with various programming languages, frameworks, and expertise to suit your specific hiring needs.",
    },
    {
      question:
        "How does the matching process help me find the right candidates?",
      answer:
        "Our smart matching algorithm takes into account your tech requirements, job descriptions, and other preferences to connect you with developers who meet your criteria. This saves you time and effort by presenting you with highly relevant candidates who are a great fit for your organization.",
    },
    {
      question: "Can I communicate directly with developers?",
      answer:
        "Absolutely! Our platform provides seamless communication tools that allow you to interact directly with developers. You can exchange messages, schedule interviews, and discuss job opportunities, making the hiring process smooth and efficient.",
    },
  ],
};

export default FAQ;
