import { BsFillQuestionOctagonFill } from "react-icons/bs";
import { FaReact, FaLaravel, FaPython, FaNodeJs } from "react-icons/fa";
import { RiVuejsFill } from "react-icons/ri";

export default function RightSideBar() {
  return (
    <div className="w-1/5 p-5 space-y-5">
      <div className="mt-2 space-y-5">
        <h1 className="text-xl font-bold">Popular Questions</h1>
        {[
          "How do I handle async/await errors properly in JavaScript?",
          "What is the difference between useEffect and useLayoutEffect in React?",
          "How to implement JWT authentication in a Node.js REST API?",
          "Why is my CSS Flexbox not centering elements vertically?",
          "How do I optimize slow SQL queries with proper indexing?",
        ].map((question) => (
          <div key={question} className="flex items-start space-x-3 my-4">
            <span className="text-main mt-0.5 shrink-0">
              <BsFillQuestionOctagonFill />
            </span>
            <span className="line-clamp-2 text-sm leading-snug">{question}</span>
          </div>
        ))}
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
