import Link from "next/link";
import DarkModeToggleButton from "../components/dark-mode-toggle-button";

export default function Header() {
  return (
    <div>
      <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <Link
            href="/"
            className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-3 text-xl">Tailblocks</span>
          </Link>

          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <Link href="/" className="mr-5 hover:text-gray-900">
              Home
            </Link>

            <Link href="/about" className="mr-5 hover:text-gray-900">
              About
            </Link>


            <Link href="/editor" className="mr-5 hover:text-gray-900">
            editor
            </Link>

            <Link href="/editor2" className="mr-5 hover:text-gray-900">
            editor2
            </Link>

            <Link href="/editorFabric" className="mr-5 hover:text-gray-900">
            editorFabric
            </Link>

            <Link href="/editorThree" className="mr-5 hover:text-gray-900">
            editorThree
            </Link>


            <Link href="/index.html" className="mr-5 hover:text-gray-900">
              svgDownloa
            </Link>
            

            <Link href="/layoutTest" className="mr-5 hover:text-gray-900">
              layoutTest
            </Link>
            
            <Link href="/MyFabricPage" className="mr-5 hover:text-gray-900">
              MyFabricPage
            </Link>

            <Link href="/MyFabricDelete" className="mr-5 hover:text-gray-900">
            MyFabricDelete
            </Link>
            
            <Link href="/MyFabricList" className="mr-5 hover:text-gray-900">
            MyFabricList
            </Link>            

            <Link href="/fabricTest" className="mr-5 hover:text-gray-900">
              fabricTest
            </Link>

            <Link href="/projects" className="mr-5 hover:text-gray-900">
              Projects
            </Link>

            <Link href="/canvas" className="mr-5 hover:text-gray-900">
              canvas
            </Link>

            <Link href="/box01" className="mr-5 hover:text-gray-900">
              Box01
            </Link>
            
            <Link href="/box02" className="mr-5 hover:text-gray-900">
              Box02
            </Link>

            <Link href="/box03" className="mr-5 hover:text-gray-900">
              Box03
            </Link>

            <Link href="/project-bananas" className="mr-5 hover:text-gray-900">
              Banana
            </Link>

            <Link href="/pickcolor" className="mr-5 hover:text-gray-900">
              Picker
            </Link>

            <Link href="/notice" className="mr-5 hover:text-gray-900">
              Notice
            </Link>
            <Link href="/faq" className="mr-5 hover:text-gray-900">
              FAQ
            </Link>
            <Link href="/shop" className="mr-5 hover:text-gray-900">
              Shopping Mall
            </Link>
          </nav>

          {/* // 다크모드 토글 버튼 */}
          <DarkModeToggleButton />
        </div>
      </header>
    </div>
  );
}
