type TaskCardProps = {
  title: string
  dueDate: string
  status: string
  priority: string
  projectName: string
  onDelete: () => void
  onEdit: () => void
  onStatusChange: (status: string) => void
}


function TaskCard({
  title,
  dueDate,
  status,
  priority,
  projectName,
  onDelete,
  onEdit,
  onStatusChange,
}: TaskCardProps) {


  const formatDueDate = (
    dueDate: string
  ) => {

    const cleanDate =
      dueDate.replace("Due ", "")

    const datePattern =
      /^\d{4}-\d{2}-\d{2}$/

    if (!datePattern.test(cleanDate)) {
      return dueDate
    }


    const date =
      new Date(
        `${cleanDate}T00:00:00`
      )


    const formattedDate =
      date.toLocaleDateString(
        "en-US",
        {
          month: "short",
          day: "numeric",
          year: "numeric",
        }
      )


    return `Due ${formattedDate}`
  }


  return (

    <div className="py-4 border-t border-gray-100 min-w-0">


      <div className="flex flex-col gap-4 min-w-0 lg:flex-row lg:items-center lg:justify-between">



        <div className="min-w-0 flex-1 overflow-hidden">

          <p className="font-medium text-gray-900 wrap-anywhere line-clamp-2">
            {title}
          </p>


          <p className="text-sm text-gray-500 mt-1">
            {formatDueDate(dueDate)}
          </p>


          <p className="text-xs text-gray-400 mt-1 wrap-anywhere line-clamp-1">
            Project: {projectName}
          </p>

        </div>



        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center lg:flex-none lg:justify-end">


          <div className="flex items-center gap-2">

            <span className="text-xs font-medium text-gray-500">
              Priority:
            </span>


            <span
              className={`px-3 py-1 text-sm rounded-full ${
                priority === "High"
                  ? "bg-red-100 text-red-700"
                  : priority === "Medium"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-700"
              }`}
            >
              {priority}
            </span>

          </div>


          <div className="flex items-center gap-2">

            <span className="text-xs font-medium text-gray-500">
              Status:
            </span>


            <select
              value={status}
              onChange={(event) =>
                onStatusChange(
                  event.target.value
                )
              }
              className={`px-3 py-1 text-sm rounded-full border-none outline-none cursor-pointer ${
                status === "Completed"
                  ? "bg-green-100 text-green-700"
                  : status === "In Progress"
                    ? "bg-blue-100 text-blue-700"
                    : status === "Overdue"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-700"
              }`}
            >

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


          <div className="flex items-center gap-2 w-full sm:w-auto">

            <button
              type="button"
              onClick={onEdit}
              className="flex-1 sm:flex-none px-3 py-1.5 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              Edit
            </button>


            <button
              type="button"
              onClick={onDelete}
              className="flex-1 sm:flex-none px-3 py-1.5 text-sm font-medium text-red-600 border border-gray-200 rounded-lg hover:bg-red-50"
            >
              Delete
            </button>

          </div>


        </div>


      </div>


    </div>
  )
}

export default TaskCard