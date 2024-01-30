import { Dialog, Transition } from "@headlessui/react";
import { FaNetworkWired, FaCode, FaAws } from "react-icons/fa";
import { GiLaurelCrown } from "react-icons/gi";
import { GoTriangleDown } from "react-icons/go";
import { MdOutlineSportsGymnastics, MdSchool } from "react-icons/md";
import { GiIdea } from "react-icons/gi";
import { motion } from "framer-motion";
import { Fragment, useState } from "react";
import datas from "../data/CertificateData.json";

export default function Projects() {
  const [filter, setFilter] = useState("all");
  const [project, setProject] = useState(true);

  function generateIcon(value) {
    const iconMapping = {
      Programing: <FaCode />,
      Networking: <FaNetworkWired />,
      CloudComputing: <FaAws />,
      BusinessIdeas: <GiIdea />,
      Sports: <MdOutlineSportsGymnastics />,
      school: <MdSchool />,
    };

    if (Array.isArray(value)) {
      // Jika teknologi adalah array, ambil ikon dari elemen pertama (misalnya, "Networking" -> FaNetworkWired)
      return iconMapping[value[0]] || null;
    } else {
      // Jika teknologi adalah string tunggal, ambil ikon berdasarkan string tersebut
      return iconMapping[value] || null;
    }
  }

  return (
    <motion.div
      className="h-full relative"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -50, opacity: 0 }}
    >
      <div className="grid grid-cols-12">
        <button
          className="md:col-span-3 lg:col-span-2 col-span-full md:border-r border-b border-[#1E2D3D] text-white flex gap-2.5 items-center py-2.5 pl-4"
          onClick={() => setProject(!project)}
        >
          <GoTriangleDown
            className={`${project ? "" : "-rotate-90"} transition-all`}
          />
          <span>Certificates</span>
        </button>
        <div className="lg:col-span-10 md:col-span-9 col-span-full border-b border-[#1E2D3D] flex items-center justify-center text-white row-start-1 md:row-start-auto py-2.5 lg-py-0">
          {filter === "all"
            ? `All Certificates (${datas.length})`
            : `${filter} Certificates (${
                datas.filter((data) => data.technology.includes(filter)).length
              })`}
        </div>
      </div>

      <div className="grid grid-cols-12 h-full ">
        <div className="lg:col-span-2 col-span-full md:col-span-3 md:border-r border-[#1E2D3D] px-0 md:px-5 md:py-4 py-0 flex flex-col gap-4 overflow-hidden">
          <Transition
            show={project}
            enter="transition ease-in duration-200"
            enterFrom="opacity-0 -translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-out duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 -translate-y-1"
            className="flex flex-col gap-4 overflow-hidden absolute md:static z-10 top-[6rem] md:top-0 py-2.5 md:py-0 px-4 md:px-0 w-full md:w-auto left-0 bg-[#011627] md:bg-transparent"
          >
            <div className="flex items-center gap-6 ">
              <button
                className={`flex items-center gap-2.5 cursor-pointer transition-colors hover:text-white w-full text-left ${
                  filter === "all" ? "text-white" : "text-[#607B96]"
                }`}
                onClick={() => setFilter("all")}
              >
                <GiLaurelCrown />
                <span>All Certificates</span>
              </button>
            </div>
            <div className="flex items-center gap-6 ">
              <button
                className={`flex items-center gap-2.5 cursor-pointer transition-colors hover:text-white w-full ${
                  filter === "Networking" ? "text-white" : "text-[#607B96]"
                }`}
                onClick={() => setFilter("Networking")}
              >
                {generateIcon("Networking")}
                <span>Networking</span>
              </button>
            </div>
            <div className="flex items-center gap-6">
              <button
                className={`flex items-center gap-2.5 cursor-pointer transition-colors hover:text-white w-full ${
                  filter === "Programing" ? "text-white" : "text-[#607B96]"
                }`}
                onClick={() => setFilter("Programing")}
              >
                {generateIcon("Programing")}
                <span>Programing</span>
              </button>
            </div>

            <div className="flex items-center gap-6">
              <button
                className={`flex items-center gap-2.5 cursor-pointer transition-colors hover:text-white w-full ${
                  filter === "school" ? "text-white" : "text-[#607B96]"
                }`}
                onClick={() => setFilter("school")}
              >
                {generateIcon("school")}
                <span>School</span>
              </button>
            </div>

            <div className="flex items-center gap-6">
              <button
                className={`flex items-center gap-2.5 cursor-pointer transition-colors hover:text-white w-full ${
                  filter === "CloudComputing" ? "text-white" : "text-[#607B96]"
                }`}
                onClick={() => setFilter("CloudComputing")}
              >
                {generateIcon("CloudComputing")}
                <span>Cloud Computing</span>
              </button>
            </div>

            <div className="flex items-center gap-6">
              <button
                className={`flex items-center gap-2.5 cursor-pointer transition-colors hover:text-white w-full ${
                  filter === "BusinessIdeas" ? "text-white" : "text-[#607B96]"
                }`}
                onClick={() => setFilter("BusinessIdeas")}
              >
                {generateIcon("BusinessIdeas")}
                <span>Business Ideas</span>
              </button>
            </div>
            <div className="flex items-center gap-6">
              <button
                className={`flex items-center gap-2.5 cursor-pointer transition-colors hover:text-white w-full ${
                  filter === "Sports" ? "text-white" : "text-[#607B96]"
                }`}
                onClick={() => setFilter("Sports")}
              >
                {generateIcon("Sports")}
                <span>Sports</span>
              </button>
            </div>
          </Transition>
        </div>

        <div className="lg:col-span-10 md:col-span-9 col-span-full flex items-start justify-center lg:p-16 md:p-8 p-4 overflow-y-auto scrollbar-none">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-10 h-max w-full">
            {filter === "all" ? (
              datas.map((data, index) => <Card data={data} key={index} />)
            ) : datas.filter((tech) => tech.technology.includes(filter))
                .length === 0 ? (
              <div className="w-full flex items-center justify-center col-span-4 h-full text-white">
                Not yet, comeback again later!
              </div>
            ) : (
              datas
                .filter((tech) => tech.technology.includes(filter))
                .map((data, index) => <Card data={data} key={index} />)
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const Card = ({ data }) => {
  // Handling untuk Certificate Type dalam bentuk string tunggal
  const technology = data.technology.includes(", ")
    ? data.technology.split(", ")
    : [data.technology];
  const [isOpen, setIsOpen] = useState(false);

  function generateIcon(value) {
    if (value.includes("Programing")) {
      return <FaCode />;
    }
    if (value.includes("Networking")) {
      return <FaNetworkWired />;
    }
    if (value.includes("CloudComputing")) {
      return <FaAws />;
    }
    if (value.includes("BusinessIdeas")) {
      return <GiIdea />;
    }
    if (value.includes("Sports")) {
      return <MdOutlineSportsGymnastics />;
    }
    if (value.includes("school")) {
      return <MdSchool />;
    }
  }

  return (
    <>
      <motion.div
        className="rounded-2xl border border-[#1E2D3D] bg-[#001221]/50 flex items-center flex-col overflow-hidden hover:shadow-sm hover:shadow-[#607B96] transition-colors h-[400px]"
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <div className="overflow-hidden h-[80%] w-full relative ">
          <img
            src={data.image}
            alt={data.title}
            className="object-cover h-full w-full"
          />
          <div>
            <div className="absolute top-5 right-5 flex">
              {technology.map((tech, index) => (
                <div
                  className="bg-[#86E1F9] p-1 rounded-md"
                  key={index}
                  style={{
                    marginRight: index < technology.length - 1 ? "4px" : "0",
                  }}
                >
                  {generateIcon(tech)}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="py-6 px-8 text-[#607B96] w-full flex flex-col justify-between h-[80%]">
          <div>
            <h6 className="mb-2.5 text-white">{data.title}</h6>
            <p className="mb-5 line-clamp-2">{data.description}</p>
          </div>
          <motion.button
            className="bg-[#1b2b3a] text-white py-2.5 px-3.5 rounded-lg  w-max"
            onClick={() => setIsOpen(true)}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            view-certificate
          </motion.button>
        </div>
      </motion.div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-20"
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 backdrop-blur-0"
            enterTo="opacity-100 backdrop-blur-sm"
            leave="ease-in duration-300"
            leaveFrom="opacity-100 backdrop-blur-sm"
            leaveTo="opacity-0 backdrop-blur-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-40" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-[#1d2a3a] text-left align-middle shadow-xl transition-all">
                  <div className="h-96">
                    <img
                      src={data.image}
                      alt={data.title}
                      className="object-cover w-full h-full"
                    />
                  </div>

                  <article className="p-5 ">
                    <Dialog.Title
                      as="h3"
                      className="text-xl font-semibold leading-6 mb-2.5 text-white"
                    >
                      {data.title}
                    </Dialog.Title>
                    <p className="mb-2.5 text-white/80">{data.description}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center">
                          <a
                            href={`https://omtegar.me/certificate/${data.link}`}
                            target="_blank"
                            className="text-white/80"
                            rel="noreferrer"
                          >
                            View In New Tab
                          </a>
                        </div>
                      </div>
                      <p className="text-white/80">
                        Certificate Type : {data.technology.join(", ")}
                      </p>
                    </div>
                  </article>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
