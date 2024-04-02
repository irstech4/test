export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Customers also purchased
          </h2>

          <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 xl:gap-x-8">
            <div className="group relative border p-2 rounded-lg">
              <div className="aspect-h-1 aspect-w-1 lg:aspect-none w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
                <img
                  src="https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg"
                  alt="Front of men&#039;s Basic Tee in black."
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between p-2">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href="#">
                      <span
                        aria-hidden="true"
                        className="absolute inset-0"
                      ></span>
                      Basic Tee
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">Some Done Thing</p>
                </div>
                <p className="text-sm font-medium text-gray-900">$35</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
