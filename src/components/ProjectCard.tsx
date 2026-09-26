type ProjectCardProps = {
  name: string
  description: string
  status: string
  totalTasks: number
  completedTasks: number
  onViewTasks: () => void
  onStatusChange: (status: string) => void
  onDelete: () => void
  onEdit: () => void
}

function ProjectCard({
  name,
  description,
  status,
  totalTasks,
  completedTasks,
  onViewTasks,
  onStatusChange,
  onDelete,
  onEdit,
}: ProjectCardProps) {

  const progress =
    totalTasks === 0
      ? 0
      : Math.round(
        (completedTasks / totalTasks) * 100
      )

  return (

    <div className="border border-gray-200 rounded-xl p-4 sm:p-5">

      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">


        {/* Project Information */}

        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 wrap-break-word line-clamp-2">
            {name}
          </h3>

          <p className="text-sm text-gray-500 mt-1 wrap-break-word line-clamp-3">
            {description || "No description provided."}
          </p>

          {/* Project Stats */}

          <div className="mt-4">

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">

              <p className="text-gray-600">
                Tasks:

                <span className="font-medium text-gray-900 ml-1">
                  {totalTasks}
                </span>
              </p>


              <p className="text-gray-600">
                Completed:

                <span className="font-medium text-gray-900 ml-1">
                  {completedTasks}
                </span>
              </p>


              <p className="text-gray-600">
                Progress:

                <span className="font-medium text-gray-900 ml-1">
                  {progress}%
                </span>
              </p>

            </div>


            {/* Progress Bar */}

            <div className="w-full h-2 bg-gray-100 rounded-full mt-3 overflow-hidden">

              <div
                className="h-full bg-gray-900 rounded-full transition-all duration-300"
                style={{
                  width: `${progress}%`,
                }}
              />

            </div>

          </div>

        </div>


        {/* Project Controls */}

        <div className="grid grid-cols-2 gap-2 w-full sm:flex sm:flex-wrap sm:w-auto sm:items-center lg:justify-end">


          {/* Status */}

          <select
            value={status}
            onChange={(event) =>
              onStatusChange(event.target.value)
            }
            className={`col-span-2 sm:col-span-1 w-full sm:w-auto px-3 py-2 text-sm rounded-lg outline-none cursor-pointer ${status === "Completed"
              ? "bg-green-100 text-green-700"
              : "bg-blue-100 text-blue-700"
              }`}
          >

            <option value="Active">
              Active
            </option>

            <option value="Completed">
              Completed
            </option>

          </select>


          {/* View Tasks */}

          <button
            type="button"
            onClick={onViewTasks}
            className="w-full sm:w-auto px-3 py-2 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            View Tasks
          </button>


          {/* Edit */}

          <button
            type="button"
            onClick={onEdit}
            className="w-full sm:w-auto px-3 py-2 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            Edit
          </button>


          {/* Delete */}

          <button
            type="button"
            onClick={onDelete}
            className="col-span-2 sm:col-span-1 w-full sm:w-auto px-3 py-2 text-sm font-medium text-red-600 border border-gray-200 rounded-lg hover:bg-red-50"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  )
}

export default ProjectCard