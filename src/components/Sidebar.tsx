import { useState } from "react"

type SidebarProps = {
  activePage: string
  onPageChange: (page: string) => void
}

function Sidebar({
  activePage,
  onPageChange,
}: SidebarProps) {

  const [isSidebarOpen, setIsSidebarOpen] =
    useState(false)


  const handlePageChange = (page: string) => {
    onPageChange(page)

    // Mobile par page select hone ke baad
    // sidebar automatically close ho jayega
    setIsSidebarOpen(false)
  }


  const navigationItems = [
    "Dashboard",
    "Tasks",
    "Projects",
    "Analytics",
    "Settings",
  ]


  return (
    <>

      {/* =========================
          MOBILE HEADER
      ========================= */}

      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 z-40">

        <h1 className="text-xl font-bold text-gray-900">
          WorkFlow
        </h1>

        <button
          type="button"
          onClick={() =>
            setIsSidebarOpen(true)
          }
          className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-100"
          aria-label="Open menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </button>

      </div>


      {/* =========================
          MOBILE OVERLAY
      ========================= */}

      {isSidebarOpen && (

        <div
          onClick={() =>
            setIsSidebarOpen(false)
          }
          className="lg:hidden fixed inset-0 bg-black/40 z-40"
        />

      )}


      {/* =========================
          SIDEBAR
      ========================= */}

      <aside
        className={`
          fixed lg:sticky
          top-0 left-0
          h-screen
          w-64
          bg-white
          border-r border-gray-200
          p-6
          z-50
          shrink-0
          transition-transform
          duration-300

          ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }

          lg:translate-x-0
        `}
      >

        {/* Logo + Close Button */}

        <div className="flex items-start justify-between mb-8">

          <div>

            <h1 className="text-2xl font-bold text-gray-900">
              WorkFlow
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Stay organized. Get things done.
            </p>

          </div>


          {/* Mobile Close Button */}

          <button
            type="button"
            onClick={() =>
              setIsSidebarOpen(false)
            }
            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100"
            aria-label="Close menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>

        </div>


        {/* Navigation */}

        <nav className="space-y-2">

          {navigationItems.map((page) => (

            <button
              key={page}
              type="button"
              onClick={() =>
                handlePageChange(page)
              }
              className={`w-full px-4 py-3 rounded-lg text-left transition-colors ${
                activePage === page
                  ? "bg-gray-100 text-gray-900 font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>

          ))}

        </nav>

      </aside>

    </>
  )
}

export default Sidebar