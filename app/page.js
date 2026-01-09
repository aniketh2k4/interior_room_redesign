import Image from "next/image";
import Link from 'next/link'

export default function Home() {

  return (
    <>
  <meta charSet="utf-8" />
  <meta content="width=device-width, initial-scale=1" name="viewport" />
  <title>AI Room Design</title>
  <link
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
    rel="stylesheet"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
    rel="stylesheet"
  />
  <style
    dangerouslySetInnerHTML={{
      __html: '\n   body {\n      font-family: "Inter", sans-serif;\n    }\n  '
    }}
  />
  <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
    <div className="flex items-center space-x-3">
      <div className="bg-indigo-600 rounded-lg p-3">
        <img
          alt="Icon showing two linked chain links in white on indigo background"
          className="w-6 h-6"
          height={24}
          src="https://storage.googleapis.com/a1aa/image/880c93cf-9819-4ad8-5170-3d1e12fa2dcf.jpg"
          width={24}
        />
      </div>
      <span className="font-extrabold text-black text-sm leading-5 select-none">
        AI Room Design
      </span>
    </div>
    <a
      className="text-indigo-600 text-xs leading-4 font-normal select-none"
      href="#"
    >
      Buy More Credits
    </a>
    <Link href={'./dashboard'} >
    <button
      className="bg-indigo-600 text-white text-xs font-semibold px-4 py-2 rounded-md select-none"
      type="button"
    >
      -Dashboard-
    </button>
    </Link>
    
  </header>
  <main className="relative overflow-hidden">
    <img
      alt="Hexagonal pattern background in very light purple"
      className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
      height={100}
      src="https://storage.googleapis.com/a1aa/image/773dbeba-6d35-46e9-5de1-5ecee32ac4d1.jpg"
      style={{ opacity: "0.15" }}
      width={100}
    />
    <div className="relative max-w-7xl mx-auto px-6 pt-10 pb-20 text-center">
      <a
        className="inline-flex items-center justify-center space-x-2 border border-gray-300 rounded-full px-4 py-1 text-xs text-gray-700 select-none"
        href="#"
      >
        
        <svg
          aria-hidden="true"
          className="w-3 h-3 text-gray-500"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path d="M9 18l6-6-6-6"></path>
        </svg>
      </a>
      <h1 className="mt-6 font-extrabold text-gray-900 text-4xl sm:text-5xl leading-tight max-w-3xl mx-auto">
        AI Room and Home
        <span className="block text-indigo-600">Interior Design</span>
      </h1>
      <p className="mt-3 text-gray-700 text-sm sm:text-base max-w-xl mx-auto">
        Transform Your Space with AI: Effortless Room &amp; Home Interior Design
        at Your Fingertips!
      </p>
      <Link href={'/dashboard'}>
      <button
        className="mt-6 bg-indigo-500 text-white text-xs font-semibold px-5 py-2 rounded-md inline-flex items-center space-x-2 select-none"
        type="button"
      >
        <span>Get started</span>
        <svg
          aria-hidden="true"
          className="w-3 h-3"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path d="M9 18l6-6-6-6"></path>
        </svg>
      </button>
      </Link>
      <div className="mt-14 flex flex-col sm:flex-row justify-center items-center gap-10 max-w-5xl mx-auto">
        <img
          alt="Photo of a bright living room with a green couch, TV, and windows with blinds"
          className="w-[320px] h-[220px] object-cover rounded-md"
          height={220}
          src="https://storage.googleapis.com/a1aa/image/eae0ea22-e5de-44e7-4c3b-e4a6b87a6dc7.jpg"
          width={320}
        />
        <svg
          aria-hidden="true"
          className="w-16 h-16 text-black"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={6}
          style={{ transform: "rotate(10deg)" }}
          viewBox="0 0 24 24"
        >
          <path d="M3 12h18M15 6l6 6-6 6"></path>
        </svg>
        <img
          alt="Photo of a cozy rustic living room with wooden beams, teal couch, and decorative wall art"
          className="w-[320px] h-[220px] object-cover rounded-md"
          height={220}
          src="https://storage.googleapis.com/a1aa/image/351a6f7a-fac5-4e52-8ab2-c507a642eb11.jpg"
          width={320}
        />
      </div>
      <div className="mt-20 max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-4 gap-y-10 gap-x-8 text-left">
        <div className="flex flex-col items-center text-center sm:text-left sm:items-start">
          <div className="bg-blue-600 text-white p-3 rounded-lg mb-3">
            <i className="fas fa-mobile-alt text-lg"></i>
          </div>
          <h3 className="font-semibold text-sm text-black mb-1 select-none">
            Upload
          </h3>
          <p className="text-xs text-gray-700 mb-1 select-none">
            Upload Your Room Picture
          </p>
          <a
            className="text-blue-600 text-xs font-semibold inline-flex items-center space-x-1 select-none"
            href="#"
          >
            <span>Learn more</span>
            <svg
              aria-hidden="true"
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path d="M9 18l6-6-6-6"></path>
            </svg>
          </a>
        </div>
        <div className="flex flex-col items-center text-center sm:text-left sm:items-start">
          <div className="bg-blue-600 text-white p-3 rounded-lg mb-3">
            <i className="fas fa-sliders-h text-lg"></i>
          </div>
          <h3 className="font-semibold text-sm text-black mb-1 select-none">
            Select Design
          </h3>
          <p className="text-xs text-gray-700 mb-1 select-none">
            Select Design and Room Type
          </p>
          <a
            className="text-blue-600 text-xs font-semibold inline-flex items-center space-x-1 select-none"
            href="#"
          >
            <span>Learn more</span>
            <svg
              aria-hidden="true"
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path d="M9 18l6-6-6-6"></path>
            </svg>
          </a>
        </div>
        <div className="flex flex-col items-center text-center sm:text-left sm:items-start">
          <div className="bg-blue-600 text-white p-3 rounded-lg mb-3">
            <i className="fas fa-book-open text-lg"></i>
          </div>
          <h3 className="font-semibold text-sm text-black mb-1 select-none">
            Ready to Download
          </h3>
          <p className="text-xs text-gray-700 mb-1 select-none">
            Your Room / Home Interior Design is Ready
          </p>
          <a
            className="text-blue-600 text-xs font-semibold inline-flex items-center space-x-1 select-none"
            href="#"
          >
            <span>Learn more</span>
            <svg
              aria-hidden="true"
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path d="M9 18l6-6-6-6"></path>
            </svg>
          </a>
        </div>
        <div className="flex flex-col items-center text-center sm:text-left sm:items-start">
          <div className="bg-blue-600 text-white p-3 rounded-lg mb-3">
            <i className="fas fa-comments text-lg"></i>
          </div>
          <h3 className="font-semibold text-sm text-black mb-1 select-none">
            24/7 Support
          </h3>
          <p className="text-xs text-gray-700 mb-1 select-none">
            Contact us 24 hours a day, 7 days a week
          </p>
          <a
            className="text-blue-600 text-xs font-semibold inline-flex items-center space-x-1 select-none"
            href="#"
          >
            <span>Learn more</span>
            <svg
              aria-hidden="true"
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path d="M9 18l6-6-6-6"></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </main>
</>

  )
}