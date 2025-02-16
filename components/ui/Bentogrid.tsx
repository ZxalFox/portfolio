"use client";

import { cn } from "@/lib/utils";
import { BackgroundGradientAnimation } from "./GradientBg";
import { useState } from "react";
// import { GlobeDemo } from "./GridGlobe";
import animationData from "@/data/confetti.json";
import Lottie from "react-lottie";
import MagicButton from "./MagicButton";
import { IoCopyOutline } from "react-icons/io5";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-6 lg:grid-cols-5 md:grid-rows-4 lg:gap-8 gap-8 mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  img,
  imgClassName,
  titleClassName,
  spareImg,
  id,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  id: number;
  img?: string;
  imgClassName?: string;
  titleClassName?: string;
  spareImg?: string;
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("ayronsanfra9@gmail.com");
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div
      className={cn(
        "row-span-1 relative text-red-50 overflow-hidden group/bento hover:shadow-xl transition rounded-3xl duration-200 shadow-input dark:shadow-none justify-between flex flex-col space-y-4 ",
        className
      )}
      style={{
        background: "#E03848",
        backgroundColor: "linear-gradient(135deg, #E03848, #F43F8F)",
      }}
      key={id}
    >
      <div className={`${id === 6 && "flex justify-center"} h-full`}>
        <div className="w-full h-full absolute">
          {img && (
            <img
              src={img}
              alt={img}
              className={cn(imgClassName, "object-cover object-center")}
            />
          )}
        </div>
        <div
          className={`absolute right-0 -bottom-5 ${
            id === 5 && "w-full opacity-80"
          } `}
        >
          {spareImg && (
            <img
              src={spareImg}
              alt={spareImg}
              width={220}
              className="object-cover object-center w-full h-full"
            />
          )}
        </div>
        {id === 6 && (
          <BackgroundGradientAnimation gradientBackgroundStart="#E03848" gradientBackgroundEnd="#F43F8F"
          firstColor="#E03848"
          >
            
          </BackgroundGradientAnimation>
        )}
        <div
          className={cn(
            titleClassName,
            "group-hover/bento:translate-x-2 transition duration-200 relative md:h-full min-h-40 flex flex-col px-5 p-5 lg:p-10"
          )}
        >
          <div className="font-sans font-extralight text-red-100 text-sm md:text-xs lg:text-base z-10">
            {description}
          </div>
          <div className="font-sans font-bold text-lg lg:text-3xl max-w-96 z-10">
            {title}
          </div>

          {/* {id === 2 && (
          <GlobeDemo
            
          />
        )} */}

          {id === 3 && (
            <div className="flex gap-1 lg:gap-5 w-fit absolute right-3 lg:-right-2">
              <div className="flex flex-col gap-3 lg:gap-5 ">
                {["Typescript", "Azure DevOps", "Git"].map((item) => (
                  <span
                    key={item}
                    className="py-2 lg:py-3 lg:px-3 px-3 text-xs lg-text-base lg:max-xl:opacity-50 opacity-100 font-bold rounded-lg text-center bg-red-100 text-red-800"
                  >
                    {item}
                  </span>
                ))}
                <span className="py-4  px-3 rounded-lg text-center bg-red-300" />
              </div>
              <div className="flex flex-col gap-3 lg:gap-5">
                {" "}
                <span className="py-4 px-3 rounded-lg text-center bg-red-300" />
                {["React.js", "Next.js", "Cypress"].map((item) => (
                  <span
                    key={item}
                    className="py-2 lg:py-3 lg:px-4 px-3 text-xs lg-text-base lg:max-xl:opacity-50 opacity-100 rounded-lg text-center text-red-800 font-bold bg-red-100"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {id === 6 && (
            <div className="mt-5 relative">
              <div className={`absolute -bottom-5 right-0`}>
                <Lottie
                  options={{
                    loop: copied,
                    autoplay: copied,
                    animationData,
                    rendererSettings: {
                      preserveAspectRatio: "xMidYMid slice",
                    },
                  }}
                />
              </div>

              <MagicButton
                title={copied ? "Email copied!" : "Copy my email"}
                icon={<IoCopyOutline />}
                position="left"
                otherClasses="!text-red-800 hover:!text-white"
                handleClick={handleCopy}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
