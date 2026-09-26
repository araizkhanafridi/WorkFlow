import { useState } from "react"

type EditProjectFormProps = {
  project: {
    name: string
    description: string
    status: string
  }

  onUpdateProject: (
    name: string,
    description: string,
    status: string
  ) => void

  onCancel: () => void
}

function EditProjectForm({
  project,
  onUpdateProject,
  onCancel,
}: EditProjectFormProps) {

  const [name, setName] =
    useState(project.name)

  const [description, setDescription] =
    useState(project.description)

  const [status, setStatus] =
    useState(project.status)

  const [error, setError] =
    useState("")


  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {

    event.preventDefault()

    if (!name.trim()) {
      setError("Please enter a project name.")
      return
    }

    setError("")

    onUpdateProject(
      name,
      description,
      status
    )
  }


  return (

    <form
      onSubmit={handleSubmit}
      className="mt-6 p-4 sm:p-5 border border-gray-200 rounded-xl bg-gray-50"
    >

      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Edit Project
      </h3>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

        {/* Project Name */}

        <div>

          <label className="block text-sm font-medium text-gray-700 mb-1">
            Project Name
          </label>

          <input
            type="text"
            value={name}
            onChange={(event) =>
              setName(event.target.value)
            }
            className="w-full min-w-0 border border-gray-300 rounded-lg px-4 py-2 outline-none bg-white"
          />

        </div>


        {/* Description */}

        <div className="sm:col-span-2 lg:col-span-1">

          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>

          <input
            type="text"
            value={description}
            onChange={(event) =>
              setDescription(event.target.value)
            }
            className="w-full min-w-0 border border-gray-300 rounded-lg px-4 py-2 outline-none bg-white"
          />

        </div>


        {/* Status */}

        <div>

          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>

          <select
            value={status}
            onChange={(event) =>
              setStatus(event.target.value)
            }
            className="w-full min-w-0 border border-gray-300 rounded-lg px-4 py-2 bg-white"
          >

            <option value="Active">
              Active
            </option>

            <option value="Completed">
              Completed
            </option>

          </select>

        </div>

      </div>


      {/* Error */}

      {error && (

        <p className="text-sm text-red-600 mt-3">
          {error}
        </p>

      )}


      {/* Buttons */}

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
          Update Project
        </button>

      </div>

    </form>

  )
}

export default EditProjectForm