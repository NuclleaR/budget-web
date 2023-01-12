import { FC, SyntheticEvent } from "react";

export type BottomNavBarProps = {
  activeTab?: Tab;
  handleClick?: (tab: Tab) => void;
};

export const BottomNavBar: FC<BottomNavBarProps> = ({ activeTab, handleClick }) => {
  const handleClickInner = handleClick
    ? (e: SyntheticEvent<HTMLButtonElement, MouseEvent>) => {
        const tab = e.currentTarget.getAttribute("data-button") as Tab | null;
        if (tab == null) {
          return;
        }
        handleClick(tab);
      }
    : undefined;
  console.log("render");

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t-2 border-gray-500 bg-slate-200 dark:bg-zinc-800">
      <div className="flex justify-evenly py-2">
        <button
          className="flex flex-col items-center justify-center"
          onClick={handleClickInner}
          data-button="0"
        >
          <svg
            className="fill-black dark:fill-stone-200"
            width="24"
            height="24"
            viewBox="0 0 32 32"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>credit-card-front</title>
            <path d="M28 5.25h-24c-1.518 0.002-2.748 1.232-2.75 2.75v16c0.002 1.518 1.232 2.748 2.75 2.75h24c1.518-0.002 2.748-1.232 2.75-2.75v-16c-0.002-1.518-1.232-2.748-2.75-2.75h-0zM29.25 24c-0.001 0.69-0.56 1.249-1.25 1.25h-24c-0.69-0.001-1.249-0.56-1.25-1.25v-16c0.001-0.69 0.56-1.249 1.25-1.25h24c0.69 0.001 1.249 0.56 1.25 1.25v0zM10 21.25h-4c-0.414 0-0.75 0.336-0.75 0.75s0.336 0.75 0.75 0.75v0h4c0.414 0 0.75-0.336 0.75-0.75s-0.336-0.75-0.75-0.75v0zM20 21.25h-6c-0.414 0-0.75 0.336-0.75 0.75s0.336 0.75 0.75 0.75v0h6c0.414 0 0.75-0.336 0.75-0.75s-0.336-0.75-0.75-0.75v0zM24 17.25h-18c-0.414 0-0.75 0.336-0.75 0.75s0.336 0.75 0.75 0.75v0h18c0.414 0 0.75-0.336 0.75-0.75s-0.336-0.75-0.75-0.75v0zM26 9.25h-6c-0.414 0-0.75 0.336-0.75 0.75v0 4c0 0.414 0.336 0.75 0.75 0.75h6c0.414-0 0.75-0.336 0.75-0.75v0-4c-0-0.414-0.336-0.75-0.75-0.75v0zM25.25 13.25h-4.5v-2.5h4.5z"></path>
          </svg>
          <span className="text-black dark:text-stone-200">Home</span>
        </button>
        <button
          className="flex flex-col items-center justify-center"
          onClick={handleClickInner}
          data-button="1"
        >
          <svg
            className="fill-black dark:fill-stone-200"
            height="24"
            width="24"
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 480 480"
            xmlSpace="preserve"
          >
            <g id="XMLID_1525_">
              <g>
                <g>
                  <path
                    d="M243.718,95c0-30.327-24.673-55-55-55C178.2,40,168.364,42.967,160,48.108C151.636,42.967,141.8,40,131.282,40
				c-30.327,0-55,24.673-55,55c0,30.327,24.673,55,55,55c10.518,0,20.354-2.967,28.718-8.108c8.364,5.142,18.2,8.108,28.718,8.108
				C219.045,150,243.718,125.327,243.718,95z M144.35,127.47c-4.039,1.632-8.45,2.53-13.067,2.53c-19.299,0-35-15.701-35-35
				s15.701-35,35-35c4.617,0,9.028,0.898,13.067,2.53c-6.683,9.106-10.632,20.334-10.632,32.47S137.667,118.363,144.35,127.47z
				 M160,114.987c-3.958-5.671-6.282-12.563-6.282-19.987s2.324-14.316,6.282-19.987c3.958,5.671,6.282,12.563,6.282,19.987
				S163.958,109.316,160,114.987z M175.65,127.47c6.683-9.106,10.632-20.334,10.632-32.47s-3.949-23.363-10.632-32.47
				c4.039-1.632,8.45-2.53,13.067-2.53c19.299,0,35,15.701,35,35s-15.701,35-35,35C184.1,130,179.689,129.102,175.65,127.47z"
                  />
                  <path
                    d="M160,190H70c-5.522,0-10,4.478-10,10c0,5.522,4.478,10,10,10h90c5.522,0,10-4.478,10-10C170,194.478,165.522,190,160,190
				z"
                  />
                  <path
                    d="M310,410c-5.522,0-10,4.478-10,10v10c0,5.522,4.478,10,10,10c5.522,0,10-4.478,10-10v-10
				C320,414.478,315.522,410,310,410z"
                  />
                  <path d="M70,370c-5.522,0-10,4.478-10,10c0,5.522,4.478,10,10,10h30c5.522,0,10-4.478,10-10c0-5.522-4.478-10-10-10H70z" />
                  <path
                    d="M170,320c0-5.522-4.478-10-10-10H70c-5.522,0-10,4.478-10,10c0,5.522,4.478,10,10,10h90C165.522,330,170,325.522,170,320
				z"
                  />
                  <path d="M70,270h30c5.522,0,10-4.478,10-10c0-5.522-4.478-10-10-10H70c-5.522,0-10,4.478-10,10C60,265.522,64.478,270,70,270z" />
                  <path
                    d="M365,360c-5.522,0-10,4.478-10,10v10c0,5.522,4.478,10,10,10c5.522,0,10-4.478,10-10v-10
				C375,364.478,370.522,360,365,360z"
                  />
                  <path
                    d="M420,360c-5.522,0-10,4.478-10,10v10c0,5.522,4.478,10,10,10c5.522,0,10-4.478,10-10v-10
				C430,364.478,425.522,360,420,360z"
                  />
                  <path
                    d="M410,220h-90c-16.542,0-30,13.458-30,30s13.458,30,30,30h90c16.542,0,30-13.458,30-30S426.542,220,410,220z M410,260h-90
				c-5.514,0-10-4.486-10-10c0-5.514,4.486-10,10-10h90c5.514,0,10,4.486,10,10C420,255.514,415.514,260,410,260z"
                  />
                  <path
                    d="M420,310c-5.522,0-10,4.478-10,10v10c0,5.522,4.478,10,10,10c5.522,0,10-4.478,10-10v-10
				C430,314.478,425.522,310,420,310z"
                  />
                  <path
                    d="M310,360c-5.522,0-10,4.478-10,10v10c0,5.522,4.478,10,10,10c5.522,0,10-4.478,10-10v-10
				C320,364.478,315.522,360,310,360z"
                  />
                  <path
                    d="M450,180H320V30c0-16.542-13.458-30-30-30H30C13.458,0,0,13.458,0,30v390c0,16.542,13.458,30,30,30h190
				c5.522,0,10-4.478,10-10c0-5.522-4.478-10-10-10H30c-5.514,0-10-4.486-10-10V30c0-5.514,4.486-10,10-10h260
				c5.514,0,10,4.486,10,10v150h-20c-16.542,0-30,13.458-30,30v240c0,16.542,13.458,30,30,30h170c16.542,0,30-13.458,30-30V210
				C480,193.458,466.542,180,450,180z M460,450c0,5.514-4.486,10-10,10H280c-5.514,0-10-4.486-10-10V210c0-5.514,4.486-10,10-10h170
				c5.514,0,10,4.486,10,10V450z"
                  />
                  <path
                    d="M310,310c-5.522,0-10,4.478-10,10v10c0,5.522,4.478,10,10,10c5.522,0,10-4.478,10-10v-10
				C320,314.478,315.522,310,310,310z"
                  />
                  <path
                    d="M365,410c-5.522,0-10,4.478-10,10v10c0,5.522,4.478,10,10,10c5.522,0,10-4.478,10-10v-10
				C375,414.478,370.522,410,365,410z"
                  />
                  <path
                    d="M365,310c-5.522,0-10,4.478-10,10v10c0,5.522,4.478,10,10,10c5.522,0,10-4.478,10-10v-10
				C375,314.478,370.522,310,365,310z"
                  />
                  <path
                    d="M420,410c-5.522,0-10,4.478-10,10v10c0,5.522,4.478,10,10,10c5.522,0,10-4.478,10-10v-10
				C430,414.478,425.522,410,420,410z"
                  />
                </g>
              </g>
            </g>
          </svg>
          <span className="text-black dark:text-stone-200">Budgets</span>
        </button>
      </div>
    </div>
  );
};
