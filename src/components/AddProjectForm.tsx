import { useState } from "react"

type AddProjectFormProps = {
  onAddProject: (
    name: string,
    description: string,
    status: string
  ) => void
}

function AddProjectForm({
  onAddProject,
}: AddProjectFormProps) {

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState("Active")
  const [error, setError] = useState("")

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {

    event.preventDefault()

    if (!name.trim()) {
      setError("Please enter a project name.")
      return
    }

    setError("")

    onAddProject(
      name,
      description,
      status
    )

    setName("")
    setDescription("")
    setStatus("Active")
  }

  return (

    <form
      onSubmit={handleSubmit}
      className="mt-6 p-4 sm:p-5 border border-gray-200 rounded-xl bg-gray-50"
    >

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">


        

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
            placeholder="Enter project name"
            className="w-full min-w-0 border border-gray-300 rounded-lg px-4 py-2 outline-none bg-white"
          />

        </div>


        

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
            placeholder="Enter project description"
            className="w-full min-w-0 border border-gray-300 rounded-lg px-4 py-2 outline-none bg-white"
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
          Add Project
        </button>

      </div>

    </form>
  )
}

export default AddProjectForm