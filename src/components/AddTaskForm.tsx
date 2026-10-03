import { useState } from "react"

type ProjectOption = {
  id: number
  name: string
}

type AddTaskFormProps = {
  projects: ProjectOption[]

  onAddTask: (
    title: string,
    dueDate: string,
    status: string,
    priority: string,
    projectId: number | null
  ) => void
}

function AddTaskForm({
  onAddTask,
  projects,
}: AddTaskFormProps) {

  const [error, setError] = useState("")

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {

    event.preventDefault()

    const form = event.currentTarget

    const title = (
      form.elements.namedItem("title") as HTMLInputElement
    ).value

    const dueDate = (
      form.elements.namedItem("dueDate") as HTMLInputElement
    ).value

    const status = (
      form.elements.namedItem("status") as HTMLSelectElement
    ).value

    const priority = (
      form.elements.namedItem("priority") as HTMLSelectElement
    ).value

    const projectIdValue = (
      form.elements.namedItem("projectId") as HTMLSelectElement
    ).value

    const projectId =
      projectIdValue
        ? Number(projectIdValue)
        : null


    if (!title.trim() && !dueDate) {
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

    if (!dueDate) {
      setError(
        "Please select a due date."
      )
      return
    }

    setError("")

    onAddTask(
      title,
      dueDate,
      status,
      priority,
      projectId
    )

    form.reset()
  }


  return (

    <form
      onSubmit={handleSubmit}
      className="mt-6 p-4 sm:p-5 border border-gray-200 rounded-xl bg-gray-50"
    >

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
        
        <div className="sm:col-span-2 xl:col-span-1">

          <label className="block text-sm font-medium text-gray-700 mb-1">
            Task Title
          </label>

          <input
            name="title"
            type="text"
            placeholder="Enter task title"
            className="w-full min-w-0 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300 bg-white"
          />

        </div>



        <div>

          <label className="block text-sm font-medium text-gray-700 mb-1">
            Due Date
          </label>

          <input
            name="dueDate"
            type="date"
            className="w-full min-w-0 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300 bg-white"
          />

        </div>



        <div>

          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>

          <select
            name="status"
            defaultValue="In Progress"
            className="w-full min-w-0 border border-gray-300 rounded-lg px-4 py-2 bg-white"
          >

            <option value="In Progress">
              In Progress
            </option>

            <option value="Completed">
              Completed
            </option>

            <option value="Pending">
              Pending
            </option>

          </select>

        </div>



        <div>

          <label className="block text-sm font-medium text-gray-700 mb-1">
            Priority
          </label>

          <select
            name="priority"
            defaultValue="Medium"
            className="w-full min-w-0 border border-gray-300 rounded-lg px-4 py-2 bg-white"
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
            name="projectId"
            defaultValue=""
            className="w-full min-w-0 border border-gray-300 rounded-lg px-4 py-2 bg-white"
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

        <p className="text-sm text-red-600 mt-4">
          {error}
        </p>

      )}



      <div className="mt-4">

        <button
          type="submit"
          className="w-full sm:w-auto px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700"
        >
          Add Task
        </button>

      </div>

    </form>
  )
}

export default AddTaskForm