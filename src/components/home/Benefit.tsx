import Image from "next/image";
import { type StaticImageData } from "next/image";

export default function Benefit({
  rtl,
  image,
  title,
  desc,
  bullets,
}: {
  rtl?: boolean;
  image: string | StaticImageData;
  title: string;
  desc: string;
  bullets: {
    title: string;
    desc: string;
    icon: React.ElementType;
  }[];
}) {
  return (
    <>
      <div className="main-container mb-20 flex flex-wrap lg:flex-nowrap lg:gap-10 ">
        <div
          className={`flex w-full items-center justify-center lg:w-1/2 ${
            rtl ? "lg:order-1" : ""
          }`}
        >
          <div>
            <Image
              src={image}
              width="521"
              height="482"
              alt="Benefits"
              layout="intrinsic"
              placeholder="blur"
            />
          </div>
        </div>

        <div
          className={`flex w-full flex-wrap items-center lg:w-1/2 ${
            rtl ? "lg:justify-end" : ""
          }`}
        >
          <div>
            <div className="mt-4 flex w-full flex-col">
              <h3 className="mt-3 max-w-2xl text-3xl font-bold leading-snug tracking-tight text-gray-800 dark:text-white lg:text-4xl lg:leading-tight">
                {title}
              </h3>

              <p className="max-w-2xl py-4 text-lg leading-normal text-gray-500 dark:text-gray-300 lg:text-xl xl:text-xl">
                {desc}
              </p>
            </div>

            <div className="mt-5 w-full">
              {bullets.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div className="mt-8 flex items-start space-x-3" key={index}>
                    <div className="mt-1 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-md bg-indigo-500 ">
                      <Icon className="h-7 w-7 text-indigo-50" />
                    </div>
                    <div>
                      <h4 className="text-xl font-medium text-gray-800 dark:text-gray-200">
                        {item.title}
                      </h4>
                      <p className="mt-1 text-gray-500 dark:text-gray-400">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
