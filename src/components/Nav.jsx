import React from "react";
function Nav() {
  return (
    <>
      <nav class="flex justify-start">
        <ul class="flex flex-wrap items-center font-medium text-sm">
          <li class="p-4 lg:px-8">
            <a class="text-slate-800 hover:text-slate-900" href="#">
              Prospects
            </a>
          </li>
          <li class="p-4 lg:px-8">
            <a class="text-slate-800 hover:text-slate-900" href="#">
              History
            </a>
          </li>
          <li class="p-4 group lg:px-8 group relative items-center space-x-1">
            <a class="text-slate-800 hover:text-slate-900" href="#0">
              Flyout Menu
            </a>
            <button class="shrink-0 p-1">
              <span class="sr-only">Show submenu for "Flyout Menu"</span>
              <svg
                class="w-3 h-3 fill-slate-500"
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
              >
                <path d="M10 2.586 11.414 4 6 9.414.586 4 2 2.586l4 4z" />
              </svg>
            </button>

            {/* <ul class="origin-top-right absolute invisible group-hover:visible top-full left-1/2 -translate-x-1/2 min-w-[980px] bg-white border border-slate-200 p-2 rounded-lg shadow-xl flex flex-row justify-between"> */}
            <ul class="origin-top-right absolute top-full max-w-[980px] min-h-80 bg-white border border-slate-200 p-10 rounded-lg shadow-xl flex flex-row justify-between">
              <li>
                <a
                  class="text-slate-800 hover:bg-slate-50 flex items-center p-2"
                  href="#"
                >
                  <div class="flex items-center justify-center bg-white border border-slate-200 rounded shadow-sm h-7 w-7 shrink-0 mr-3">
                    <svg
                      class="fill-indigo-500"
                      xmlns="http://www.w3.org/2000/svg"
                      width="9"
                      height="12"
                    >
                      <path d="M8.724.053A.5.5 0 0 0 8.2.1L4.333 3H1.5A1.5 1.5 0 0 0 0 4.5v3A1.5 1.5 0 0 0 1.5 9h2.833L8.2 11.9a.5.5 0 0 0 .8-.4V.5a.5.5 0 0 0-.276-.447Z" />
                    </svg>
                  </div>
                  <span class="whitespace-nowrap">Priority Ratings</span>
                </a>
              </li>
              <li class="space-x-4"> 
                <div>
                  <a
                    class="text-slate-800 hover:bg-slate-50 flex items-center p-2"
                    href="#"
                  >
                    <div class="flex items-center justify-center bg-white border border-slate-200 rounded shadow-sm h-7 w-7 shrink-0 mr-3">
                      <svg
                        class="fill-indigo-500"
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                      >
                        <path d="M11.953 4.29a.5.5 0 0 0-.454-.292H6.14L6.984.62A.5.5 0 0 0 6.12.173l-6 7a.5.5 0 0 0 .379.825h5.359l-.844 3.38a.5.5 0 0 0 .864.445l6-7a.5.5 0 0 0 .075-.534Z" />
                      </svg>
                    </div>
                    <span class="whitespace-nowrap">Insights</span>
                  </a>
                  <li>
                    <a
                      class="text-slate-800 hover:bg-slate-50 flex items-center p-2"
                      href="#"
                    >
                      <span class="whitespace-nowrap">Item Mirror</span>
                    </a>
                  </li>
                  <li>
                    <a
                      class="text-slate-800 hover:bg-slate-50 flex items-center p-2"
                      href="#"
                    >
                      <span class="whitespace-nowrap">Item Mirror</span>
                    </a>
                  </li>
                  <li>
                    <a
                      class="text-slate-800 hover:bg-slate-50 flex items-center p-2"
                      href="#"
                    >
                      <span class="whitespace-nowrap">Item Mirror</span>
                    </a>
                  </li>
                  <li>
                    <a
                      class="text-slate-800 hover:bg-slate-50 flex items-center p-2"
                      href="#"
                    >
                      <span class="whitespace-nowrap">Item Mirror</span>
                    </a>
                  </li>
                  <li>
                    <a
                      class="text-slate-800 hover:bg-slate-50 flex items-center p-2"
                      href="#"
                    >
                      <span class="whitespace-nowrap">Item Mirror</span>
                    </a>
                  </li>
                  <li>
                    <a
                      class="text-slate-800 hover:bg-slate-50 flex items-center p-2"
                      href="#"
                    >
                      <span class="whitespace-nowrap">Item Mirror</span>
                    </a>
                  </li>
                  <li>
                    <a
                      class="text-slate-800 hover:bg-slate-50 flex items-center p-2"
                      href="#"
                    >
                      <span class="whitespace-nowrap">Item Mirror</span>
                    </a>
                  </li>
                  <li>
                    <a
                      class="text-slate-800 hover:bg-slate-50 flex items-center p-2"
                      href="#"
                    >
                      <span class="whitespace-nowrap">Item Mirror</span>
                    </a>
                  </li>
                  <li>
                    <a
                      class="text-slate-800 hover:bg-slate-50 flex items-center p-2"
                      href="#"
                    >
                      <span class="whitespace-nowrap">Item Mirror</span>
                    </a>
                  </li>
                  <li>
                    <a
                      class="text-slate-800 hover:bg-slate-50 flex items-center p-2"
                      href="#"
                    >
                      <span class="whitespace-nowrap">Item Mirror</span>
                    </a>
                  </li>
                  <li>
                    <a
                      class="text-slate-800 hover:bg-slate-50 flex items-center p-2"
                      href="#"
                    >
                      <span class="whitespace-nowrap">Item Mirror</span>
                    </a>
                  </li>
                  <li>
                    <a
                      class="text-slate-800 hover:bg-slate-50 flex items-center p-2"
                      href="#"
                    >
                      <span class="whitespace-nowrap">Item Mirror</span>
                    </a>
                  </li>
                  <li>
                    <a
                      class="text-slate-800 hover:bg-slate-50 flex items-center p-2"
                      href="#"
                    >
                      <span class="whitespace-nowrap">Item Mirror</span>
                    </a>
                  </li>
                </div>
              </li>
              <li>
                <a
                  class="text-slate-800 hover:bg-slate-50 flex items-center p-2"
                  href="#"
                >
                  <div class="flex items-center justify-center bg-white border border-slate-200 rounded shadow-sm h-7 w-7 shrink-0 mr-3">
                    <svg
                      class="fill-indigo-500"
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                    >
                      <path d="M6 0a6 6 0 1 0 0 12A6 6 0 0 0 6 0ZM2 6a4 4 0 0 1 4-4v8a4 4 0 0 1-4-4Z" />
                    </svg>
                  </div>
                  <span class="whitespace-nowrap">Item Mirror</span>
                </a>
              </li>
              <li>
                <a
                  class="text-slate-800 hover:bg-slate-50 flex items-center p-2"
                  href="#"
                >
                  <div class="flex items-center justify-center bg-white border border-slate-200 rounded shadow-sm h-7 w-7 shrink-0 mr-3">
                    <svg
                      class="fill-indigo-500"
                      xmlns="http://www.w3.org/2000/svg"
                      width="11"
                      height="11"
                    >
                      <path d="M10.866.134a.458.458 0 0 0-.481-.106L.302 3.695a.458.458 0 0 0-.014.856l4.4 1.76 1.76 4.4c.07.175.24.29.427.29h.007a.458.458 0 0 0 .424-.302L10.973.615a.458.458 0 0 0-.107-.48Z" />
                    </svg>
                  </div>
                  <span class="whitespace-nowrap">Support Center</span>
                </a>
              </li>
            </ul>
          </li>

          <a href="#"></a>

          <li class="p-4 lg:px-8">
            <a class="text-slate-800 hover:text-slate-900" href="#">
              Contacts
            </a>
          </li>
          <li class="p-4 lg:px-8">
            <a class="text-slate-800 hover:text-slate-900" href="#">
              Numbers
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Nav;
