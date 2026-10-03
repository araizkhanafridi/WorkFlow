import {
  useState,
  type FormEvent,
} from "react"

type ProjectOption = {
  id: number
  name: string
}

type EditTaskFormProps = {

  task: {
    title: string
    dueDate: string
    status: string
    priority: string
    projectId?: number | null
  }

  projects: ProjectOption[]

  onUpdateTask: (
    title: string,
    dueDate: string,
    status: string,
    priority: string,
    projectId: number | null
  ) => void

  onCancel: () => void
}


function EditTaskForm({
  task,
  projects,
  onUpdateTask,
  onCancel,
}: EditTaskFormProps) {

  const [title, setTitle] =
    useState(task.title)

  const [dueDate, setDueDate] =
    useState(
      task.dueDate.replace("Due ", "")
    )

  const [status, setStatus] =
    useState(task.status)

  const [priority, setPriority] =
    useState(task.priority)

  const [projectId, setProjectId] =
    useState<number | null>(
      task.projectId ?? null
    )

  const [error, setError] =
    useState("")


  const handleSubmit = (
    event: FormEvent
  ) => {

    event.preventDefault()


    if (
      !title.trim() &&
      !dueDate.trim()
    ) {

      setError(
        "Please enter a task title and due date."
      )

      return
    }


    if (!title.trim()) {

      setError(
        "Please enter a task title."
      )

      return
    }


    if (!dueDate.trim()) {

      setError(
        "Please select a due date."
      )

      return
    }


    setError("")


    onUpdateTask(
      title,
      dueDate,
      status,
      priority,
      projectId
    )
  }


  return (

    <form
      onSubmit={handleSubmit}
      className="mb-6 p-4 sm:p-5 border border-gray-200 rounded-xl bg-gray-50"
    >


      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Edit Task
      </h3>


      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">



        <div className="sm:col-span-2 xl:col-span-1">

          <label className="block text-sm font-medium text-gray-700 mb-1">
            Task Title
          </label>

          <input
            type="text"
            value={title}
            onChange={(event) =>
              setTitle(event.target.value)
            }
            className="w-full min-w-0 px-4 py-2 border border-gray-200 rounded-lg outline-none bg-white"
          />

        </div>



        <div>

          <label className="block text-sm font-medium text-gray-700 mb-1">
            Due Date
          </label>

          <input
            type="date"
            value={dueDate}
            onChange={(event) =>
              setDueDate(event.target.value)
            }
            className="w-full min-w-0 px-4 py-2 border border-gray-200 rounded-lg outline-none bg-white"
          />

        </div>



        <div>

          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>

          <select
            value={status}
            onChange={(event) =>
              setStatus(event.target.value)
            }
            className="w-full min-w-0 px-4 py-2 border border-gray-200 rounded-lg outline-none bg-white"
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



        <div>

          <label className="block text-sm font-medium text-gray-700 mb-1">
            Priority
          </label>

          <select
            value={priority}
            onChange={(event) =>
              setPriority(event.target.value)
            }
            className="w-full min-w-0 px-4 py-2 border border-gray-200 rounded-lg outline-none bg-white"
          >

            <option value="High">
              High
            </option>

            <option value="Medium">
              Medium
            </option>

            <option value="Low">
              Low
            </option>

          </select>

        </div>



        <div>

          <label className="block text-sm font-medium text-gray-700 mb-1">
            Project
          </label>

          <select
            value={projectId ?? ""}
            onChange={(event) =>
              setProjectId(
                event.target.value
                  ? Number(event.target.value)
                  : null
              )
            }
            className="w-full min-w-0 px-4 py-2 border border-gray-200 rounded-lg outline-none bg-white"
          >

            <option value="">
              No Project
            </option>

            {projects.map((project) => (

              <option
                key={project.id}
                value={project.id}
              >
                {project.name}
              </option>

            ))}

          </select>

        </div>


      </div>



      {error && (

        <p className="mt-3 text-sm text-red-600">
          {error}
        </p>

      )}



      <div className="flex flex-col-reverse gap-3 mt-4 sm:flex-row sm:justify-end">

        <button
          type="button"
          onClick={onCancel}
          className="w-full sm:w-auto px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-100"
        >
          Cancel
        </button>


        <button
          type="submit"
          className="w-full sm:w-auto px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700"
        >
          Update Task
        </button>

      </div>


    </form>
  )
}

export default EditTaskForm