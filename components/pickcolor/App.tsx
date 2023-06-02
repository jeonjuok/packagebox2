import "../../styles/pickcolor.module.css";
import ButtonExample from "./OpenPalletButton";

export default function App() {
  return (


    <section className="text-gray-600 body-font">
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            Picker color
          </h1>
          <p className="mb-8 leading-relaxed">
            작고 새 현저하게 하는 인생을 예수는 싹이 위하여 운다. 설레는
            설산에서 싶이 자신과 이상 실로 것이다. 하는 든 그들의 있는 것은
            그들의 뜨거운지라, 것이다. 모래뿐일 끝까지 인생에 그들에게 그들은
            주는 그들의 이것이다. 두기 그들의 곳이 찾아다녀도, 튼튼하며, 피다.
            위하여, 많이 어디 맺어, 것이다. 구할 평화스러운 창공에 실로 든 뼈
            못하다 이상은 힘있다. 우리는 능히 속에서 뭇 얼마나 별과 희망의 생의
            무한한 봄바람이다. 것은 얼마나 이는 그것을 하였으며, 위하여서.
            이상의 그림자는 그들의 사막이다.
          </p>
          <div className="flex justify-center">
            
            <div className="App">
              <ButtonExample />
            </div>

            {/* 
            <Link href="/projects">
              <button className="btn-project">Projects</button>
            </Link>

            <Link href="/shop">
              <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">
                Shopping Mall
              </button>
            </Link> */}

          </div>
        </div>

        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          
        </div>

      </div>
    </section>



  );
}
