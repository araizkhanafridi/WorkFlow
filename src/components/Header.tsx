type HeaderProps = {
  searchTerm: string
  onSearchChange: (value: string) => void
  statusFilter: string
  onStatusFilterChange: (value: string) => void
}

function Header({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
}: HeaderProps) {
  return (
    <header className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

      {/* Left Side */}
      <div>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Dashboard
        </h1>

        <p className="text-sm sm:text-base text-gray-500 mt-1">
          Welcome back! Here's what's happening with your tasks.
        </p>

      </div>


      {/* Right Side */}
      <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">

        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(event) =>
            onSearchChange(event.target.value)
          }
          className="w-full sm:flex-1 lg:flex-none lg:w-75 px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-gray-400 bg-white" />


        <select
          value={statusFilter}
          onChange={(event) =>
            onStatusFilterChange(event.target.value)
          }
          className="w-full sm:w-auto px-4 py-2.5 border border-gray-200 rounded-lg outline-none bg-white cursor-pointer"
        >

          <option value="All">
            All Status
          </option>

          <option value="Pending">
            Pending
          </option>

          <option value="In Progress">
            In Progress
          </option>

          <option value="Completed">
            Completed
          </option>

          <option value="Overdue">
            Overdue
          </option>

        </select>

      </div>

    </header>
  )
}

export default Header