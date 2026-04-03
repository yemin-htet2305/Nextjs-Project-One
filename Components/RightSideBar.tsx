import { BsFillQuestionOctagonFill } from "react-icons/bs";
import { FaReact, FaLaravel, FaPython, FaNodeJs } from "react-icons/fa";
import { RiVuejsFill } from "react-icons/ri";

export default function RightSideBar() {
  return (
    <div className="w-1/5 p-5 space-y-5">
      <div className="mt-2 space-y-5">
        <h1 className="text-xl font-bold">Popular Questions</h1>
        <div className="flex items-center space-x-3 my-4">
          <span className="text-main">
            <BsFillQuestionOctagonFill />
          </span>
          <span className="line-clamp-2 text-sm">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum
            optio voluptas excepturi facere officiis quam expedita eius
            molestias? Ab voluptatum autem deserunt minima, nemo obcaecati
            exercitationem quo architecto in nihil!
          </span>
        </div>
        <div className="flex items-center space-x-3 my-4">
          <span className="text-main">
            <BsFillQuestionOctagonFill />
          </span>
          <span className="line-clamp-2 text-sm">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum
            optio voluptas excepturi facere officiis quam expedita eius
            molestias? Ab voluptatum autem deserunt minima, nemo obcaecati
            exercitationem quo architecto in nihil!
          </span>
        </div>
        <div className="flex items-center space-x-3 my-4">
          <span className="text-main">
            <BsFillQuestionOctagonFill />
          </span>
          <span className="line-clamp-2 text-sm">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum
            optio voluptas excepturi facere officiis quam expedita eius
            molestias? Ab voluptatum autem deserunt minima, nemo obcaecati
            exercitationem quo architecto in nihil!
          </span>
        </div>
        <div className="flex items-center space-x-3 my-4">
          <span className="text-main">
            <BsFillQuestionOctagonFill />
          </span>
          <span className="line-clamp-2 text-sm">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum
            optio voluptas excepturi facere officiis quam expedita eius
            molestias? Ab voluptatum autem deserunt minima, nemo obcaecati
            exercitationem quo architecto in nihil!
          </span>
        </div>
        <div className="flex items-center space-x-3 my-4">
          <span className="text-main">
            <BsFillQuestionOctagonFill />
          </span>
          <span className="line-clamp-2 text-sm">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum
            optio voluptas excepturi facere officiis quam expedita eius
            molestias? Ab voluptatum autem deserunt minima, nemo obcaecati
            exercitationem quo architecto in nihil!
          </span>
        </div>
      </div>
      <div className="mt-5 space-y-5">
        <h1 className="text-xl font-bold">Popular Tags</h1>
        <div className="flex items-center space-x-3 my-5">
          <span className="text-xl" style={{ color: "#61DAFB" }}>
            <FaReact />
          </span>
          <span className="text-md">React</span>
        </div>
        <div className="flex items-center space-x-3 my-5">
          <span className="text-xl" style={{ color: "#4FC08D" }}>
            <RiVuejsFill />
          </span>
          <span className="text-md">Vue</span>
        </div>
        <div className="flex items-center space-x-3 my-5">
          <span className="text-xl" style={{ color: "#FF2D20" }}>
            <FaLaravel />
          </span>
          <span className="text-md">Laravel</span>
        </div>
        <div className="flex items-center space-x-3 my-5">
          <span className="text-xl" style={{ color: "#3776AB" }}>
            <FaPython />
          </span>
          <span className="text-md">Python</span>
        </div>
        <div className="flex items-center space-x-3 my-5">
          <span className="text-xl" style={{ color: "#339933" }}>
            <FaNodeJs />
          </span>
          <span className="text-md">Node.js</span>
        </div>
      </div>
    </div>
  );
}
