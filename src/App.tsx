import { useEffect, useState } from "react"

import Sidebar from "./components/Sidebar"
import Header from "./components/Header"
import StatsCard from "./components/StatsCards"
import TaskCard from "./components/TaskCard"
import AddTaskForm from "./components/AddTaskForm"
import EditTaskForm from "./components/EditTaskForm"
import AddProjectForm from "./components/AddProjectForm"
import ProjectCard from "./components/ProjectCard"
import EditProjectForm from "./components/EditProjectForm"


type Task = {
  id: number
  title: string
  dueDate: string
  status: string
  priority: string
  projectId?: number | null
}


type Project = {
  id: number
  name: string
  description: string
  status: string
}


function App() {



  const [tasks, setTasks] = useState<Task[]>(() => {

    const savedTasks = localStorage.getItem("tasks")

    if (savedTasks) {
      try {
        return JSON.parse(savedTasks)
      } catch {
        return []
      }
    }

    return []
  })




  const [showForm, setShowForm] =
    useState(false)

  const [searchTerm, setSearchTerm] =
    useState("")

  const [statusFilter, setStatusFilter] =
    useState("All")

  const [editingTask, setEditingTask] =
    useState<Task | null>(null)

  const [taskToDelete, setTaskToDelete] =
    useState<Task | null>(null)
  const [projectFilter, setProjectFilter] =
    useState("All")
  const [showClearCompletedConfirm, setShowClearCompletedConfirm] =
    useState(false)
  const [showResetConfirm, setShowResetConfirm] =
    useState(false)


  const [activePage, setActivePage] =
    useState("Dashboard")



  const [projects, setProjects] =
    useState<Project[]>(() => {

      const savedProjects =
        localStorage.getItem("projects")

      if (savedProjects) {
        try {
          return JSON.parse(savedProjects)
        } catch {
          return []
        }
      }

      return []
    })


  const [showProjectForm, setShowProjectForm] =
    useState(false)
  const [selectedProject, setSelectedProject] =
    useState<Project | null>(null)
  const [projectToDelete, setProjectToDelete] =
    useState<Project | null>(null)
  const [editingProject, setEditingProject] =
    useState<Project | null>(null)




  const getTaskStatus = (task: Task) => {

    const cleanDate =
      task.dueDate.replace("Due ", "")

    const datePattern =
      /^\d{4}-\d{2}-\d{2}$/

    if (
      !datePattern.test(cleanDate) ||
      task.status === "Completed"
    ) {
      return task.status
    }

    const dueDate =
      new Date(`${cleanDate}T00:00:00`)

    const today = new Date()

    today.setHours(0, 0, 0, 0)

    if (dueDate < today) {
      return "Overdue"
    }

    return task.status
  }


  

  useEffect(() => {

    localStorage.setItem(
      "tasks",
      JSON.stringify(tasks)
    )

  }, [tasks])


  useEffect(() => {

    localStorage.setItem(
      "projects",
      JSON.stringify(projects)
    )

  }, [projects])


  
  const handleAddTask = (
    title: string,
    dueDate: string,
    status: string,
    priority: string,
    projectId: number | null
  ) => {

    const newTask: Task = {
      id: Date.now(),
      title: title,
      dueDate: `Due ${dueDate}`,
      status: status,
      priority: priority,
      projectId: projectId,
    }

    setTasks((currentTasks) => [
      ...currentTasks,
      newTask,
    ])

    setShowForm(false)
  }


  const handleDeleteTask = (
    task: Task
  ) => {

    setTaskToDelete(task)

  }


  const confirmDeleteTask = () => {

    if (!taskToDelete) return

    setTasks((currentTasks) =>
      currentTasks.filter(
        (task) =>
          task.id !== taskToDelete.id
      )
    )

    if (
      editingTask?.id === taskToDelete.id
    ) {
      setEditingTask(null)
    }

    setTaskToDelete(null)
  }


  const handleStatusChange = (
    id: number,
    newStatus: string
  ) => {

    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? {
            ...task,
            status: newStatus,
          }
          : task
      )
    )
  }


  const handleEditTask = (
    task: Task
  ) => {

    setEditingTask(task)

    setShowForm(false)
  }


  const handleUpdateTask = (
    title: string,
    dueDate: string,
    status: string,
    priority: string,
    projectId: number | null
  ) => {

    if (!editingTask) return

    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === editingTask.id
          ? {
            ...task,
            title: title,
            dueDate: `Due ${dueDate}`,
            status: status,
            priority: priority,
            projectId: projectId,
          }
          : task
      )
    )

    setEditingTask(null)
  }
  const clearCompletedTasks = () => {

    setTasks((currentTasks) =>
      currentTasks.filter(
        (task) =>
          getTaskStatus(task) !== "Completed"
      )
    )

    setEditingTask(null)
    setTaskToDelete(null)
    setShowClearCompletedConfirm(false)
  }

  const resetWorkspace = () => {

    setTasks([])
    setProjects([])

    setEditingTask(null)
    setTaskToDelete(null)

    setEditingProject(null)
    setProjectToDelete(null)

    setSelectedProject(null)

    setShowForm(false)
    setShowProjectForm(false)

    setSearchTerm("")
    setStatusFilter("All")
    setProjectFilter("All")

    setShowClearCompletedConfirm(false)
    setShowResetConfirm(false)
  }

 

  const handleAddProject = (
    name: string,
    description: string,
    status: string
  ) => {

    const newProject: Project = {
      id: Date.now(),
      name: name,
      description: description,
      status: status,
    }

    setProjects((currentProjects) => [
      ...currentProjects,
      newProject,
    ])

    setShowProjectForm(false)
  }


  const handleEditProject = (
    project: Project
  ) => {

    setEditingProject(project)

    setShowProjectForm(false)
  }


  const handleUpdateProject = (
    name: string,
    description: string,
    status: string
  ) => {

    if (!editingProject) return

    setProjects((currentProjects) =>
      currentProjects.map((project) =>
        project.id === editingProject.id
          ? {
            ...project,
            name: name,
            description: description,
            status: status,
          }
          : project
      )
    )


   
    if (
      selectedProject?.id ===
      editingProject.id
    ) {

      setSelectedProject({
        ...selectedProject,
        name: name,
        description: description,
        status: status,
      })
    }


    setEditingProject(null)
  }


  const handleProjectStatusChange = (
    id: number,
    newStatus: string
  ) => {

    setProjects((currentProjects) =>
      currentProjects.map((project) =>
        project.id === id
          ? {
            ...project,
            status: newStatus,
          }
          : project
      )
    )
  }


  const handleDeleteProject = (
    project: Project
  ) => {

    setProjectToDelete(project)
  }


  const confirmDeleteProject = () => {

    if (!projectToDelete) return

    const projectId = projectToDelete.id

   
    setProjects((currentProjects) =>
      currentProjects.filter(
        (project) =>
          project.id !== projectId
      )
    )

   
    setTasks((currentTasks) =>
      currentTasks.filter(
        (task) =>
          task.projectId !== projectId
      )
    )

    if (selectedProject?.id === projectId) {
      setSelectedProject(null)
    }

    if (editingTask?.projectId === projectId) {
      setEditingTask(null)
    }

    if (editingProject?.id === projectId) {
      setEditingProject(null)
    }

    if (projectFilter === String(projectId)) {
      setProjectFilter("All")
    }

    setProjectToDelete(null)
  }




  const totalTasks =
    tasks.length


  const completedTasks =
    tasks.filter(
      (task) =>
        getTaskStatus(task) === "Completed"
    ).length


  const inProgressTasks =
    tasks.filter(
      (task) =>
        getTaskStatus(task) === "In Progress"
    ).length


  const overdueTasks =
    tasks.filter(
      (task) =>
        getTaskStatus(task) === "Overdue"
    ).length


  const pendingTasks =
    tasks.filter(
      (task) =>
        getTaskStatus(task) === "Pending"
    ).length


  const completionRate =
    totalTasks === 0
      ? 0
      : Math.round(
        (completedTasks / totalTasks) * 100
      )




  const filteredTasks = tasks
    .filter((task) =>
      task.title
        .toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        )
    )
    .filter((task) =>
      statusFilter === "All" ||
      getTaskStatus(task) === statusFilter
    )


  const taskPageFilteredTasks =
    filteredTasks.filter((task) => {

      if (projectFilter === "All") {
        return true
      }

      if (projectFilter === "No Project") {
        return !task.projectId
      }

      return (
        task.projectId === Number(projectFilter)
      )
    })

 

  const recentTasks =
    filteredTasks
      .slice(-3)
      .reverse()


  return (

    <div className="min-h-screen bg-gray-100 flex">



      <Sidebar
        activePage={activePage}
        onPageChange={setActivePage}
      />



      <main className="flex-1 min-w-0 px-4 pb-6 pt-20 lg:p-8">



        {activePage === "Dashboard" && (

          <>

            <Header
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
            />



            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

              <StatsCard
                title="Total Tasks"
                value={totalTasks}
              />

              <StatsCard
                title="Completed"
                value={completedTasks}
              />

              <StatsCard
                title="In Progress"
                value={inProgressTasks}
              />

              <StatsCard
                title="Overdue"
                value={overdueTasks}
              />

            </section>



            <section className="mt-8 bg-white rounded-xl border border-gray-200 p-4 sm:p-6">


              <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">

                <div>

                  <h3 className="text-xl font-semibold text-gray-900">
                    Recent Tasks
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Keep track of your latest tasks.
                  </p>

                </div>


                <button
                  onClick={() => {
                    setEditingTask(null)
                    setShowForm(!showForm)
                  }}
                  className="w-full sm:w-auto px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700"
                >
                  {showForm
                    ? "Cancel"
                    : "Add Task"}
                </button>

              </div>



              {showForm && (

                <AddTaskForm
                  onAddTask={handleAddTask}
                  projects={projects}
                />

              )}



              {editingTask && (

                <EditTaskForm
                  key={editingTask.id}
                  task={editingTask}
                  projects={projects}
                  onUpdateTask={handleUpdateTask}
                  onCancel={() =>
                    setEditingTask(null)
                  }
                />

              )}



              <div className="mt-4">

                {recentTasks.length === 0 ? (

                  <div className="py-12 text-center">

                    <h4 className="text-lg font-semibold text-gray-700">
                      {tasks.length === 0
                        ? "No tasks yet"
                        : "No tasks found"}
                    </h4>

                    <p className="text-sm text-gray-500 mt-1">
                      {tasks.length === 0
                        ? "Add your first task to get started."
                        : "Try changing your search or filters."}
                    </p>

                  </div>

                ) : (

                  recentTasks.map((task) => (

                    <TaskCard
                      key={task.id}
                      title={task.title}
                      dueDate={task.dueDate}
                      status={
                        getTaskStatus(task)
                      }
                      priority={task.priority}
                      projectName={
                        projects.find(
                          (project) =>
                            project.id === task.projectId
                        )?.name || "No Project"
                      }
                      onEdit={() =>
                        handleEditTask(task)
                      }
                      onDelete={() =>
                        handleDeleteTask(task)
                      }
                      onStatusChange={(newStatus) =>
                        handleStatusChange(
                          task.id,
                          newStatus
                        )
                      }
                    />

                  ))

                )}

              </div>

            </section>

          </>

        )}


        {activePage === "Tasks" && (

          <div className="min-w-0">



            <div className="flex flex-col gap-5 mb-8 min-w-0 lg:flex-row lg:items-center lg:justify-between">

              <div className="min-w-0 lg:flex-none">

                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Tasks
                </h1>

                <p className="text-sm sm:text-base text-gray-500 mt-1">
                  Manage all your tasks in one place.
                </p>

              </div>


              <div className="flex flex-col sm:flex-row gap-3 w-full min-w-0 lg:w-auto lg:flex-1 lg:justify-end">



                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(event) =>
                    setSearchTerm(
                      event.target.value
                    )
                  }
                  className="w-full sm:flex-1 lg:flex-none lg:w-70 px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-gray-400 bg-white" />



                <select
                  value={statusFilter}
                  onChange={(event) =>
                    setStatusFilter(
                      event.target.value
                    )
                  }
                  className="w-full sm:w-40 min-w-0 px-4 py-2.5 border border-gray-200 rounded-lg outline-none bg-white cursor-pointer"
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



                <select
                  value={projectFilter}
                  onChange={(event) =>
                    setProjectFilter(
                      event.target.value
                    )
                  }
                  className="w-full sm:w-44 lg:w-52 min-w-0 px-4 py-2.5 border border-gray-200 rounded-lg outline-none bg-white cursor-pointer"
                >

                  <option value="All">
                    All Projects
                  </option>

                  <option value="No Project">
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



            <section className="min-w-0 bg-white border border-gray-200 rounded-xl p-4 sm:p-6">


              <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">

                <div>

                  <h2 className="text-xl font-semibold text-gray-900">
                    All Tasks
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    View and manage all your tasks.
                  </p>

                </div>


                <button
                  onClick={() => {
                    setEditingTask(null)
                    setShowForm(!showForm)
                  }}
                  className="w-full sm:w-auto px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700"
                >
                  {showForm
                    ? "Cancel"
                    : "Add Task"}
                </button>

              </div>



              {showForm && (

                <AddTaskForm
                  onAddTask={handleAddTask}
                  projects={projects}
                />

              )}



              {editingTask && (

                <EditTaskForm
                  key={editingTask.id}
                  task={editingTask}
                  projects={projects}
                  onUpdateTask={handleUpdateTask}
                  onCancel={() =>
                    setEditingTask(null)
                  }
                />

              )}



              <div className="mt-4">

                {taskPageFilteredTasks.length === 0 ? (

                  <div className="py-12 text-center">

                    <h4 className="text-lg font-semibold text-gray-700">
                      {tasks.length === 0
                        ? "No tasks yet"
                        : "No tasks found"}
                    </h4>

                    <p className="text-sm text-gray-500 mt-1">
                      {tasks.length === 0
                        ? "Add your first task to get started."
                        : "Try changing your search or filters."}
                    </p>

                  </div>

                ) : (

                  taskPageFilteredTasks.map((task) => (

                    <TaskCard
                      key={task.id}
                      title={task.title}
                      dueDate={task.dueDate}
                      status={
                        getTaskStatus(task)
                      }
                      priority={task.priority}
                      projectName={
                        projects.find(
                          (project) =>
                            project.id === task.projectId
                        )?.name || "No Project"
                      }
                      onEdit={() =>
                        handleEditTask(task)
                      }
                      onDelete={() =>
                        handleDeleteTask(task)
                      }
                      onStatusChange={(newStatus) =>
                        handleStatusChange(
                          task.id,
                          newStatus
                        )
                      }
                    />

                  ))

                )}

              </div>

            </section>

          </div>

        )}



        {activePage === "Projects" && (

          <div>



            <div className="flex flex-col gap-4 mb-8 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Projects
                </h1>

                <p className="text-gray-500 mt-1">
                  Organize and manage your projects.
                </p>

              </div>


              <button
                onClick={() => {
                  setEditingProject(null)

                  setShowProjectForm(
                    !showProjectForm
                  )
                }}
                className="w-full sm:w-auto px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700"
              >
                {showProjectForm
                  ? "Cancel"
                  : "Add Project"}
              </button>

            </div>



            {showProjectForm && (

              <AddProjectForm
                onAddProject={
                  handleAddProject
                }
              />

            )}

            {editingProject && (

              <EditProjectForm
                key={editingProject.id}
                project={editingProject}
                onUpdateProject={handleUpdateProject}
                onCancel={() =>
                  setEditingProject(null)
                }
              />

            )}



            <section className="mt-6 bg-white border border-gray-200 rounded-xl p-4 sm:p-6">


              <div className="mb-6">

                <h2 className="text-xl font-semibold text-gray-900">
                  All Projects
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  You have {projects.length} projects.
                </p>

              </div>


              {projects.length === 0 ? (

                <div className="py-12 text-center">

                  <h3 className="text-lg font-semibold text-gray-700">
                    No projects yet
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Create your first project to get started.
                  </p>

                </div>

              ) : (

                <div className="space-y-4">

                  {projects.map((project) => (

                    <ProjectCard
                      key={project.id}
                      name={project.name}
                      description={
                        project.description
                      }
                      onEdit={() =>
                        handleEditProject(project)
                      }
                      status={project.status}
                      totalTasks={
                        tasks.filter(
                          (task) =>
                            task.projectId === project.id
                        ).length
                      }

                      completedTasks={
                        tasks.filter(
                          (task) =>
                            task.projectId === project.id &&
                            getTaskStatus(task) === "Completed"
                        ).length
                      }
                      onViewTasks={() =>
                        setSelectedProject(project)
                      }
                      onStatusChange={(newStatus) =>
                        handleProjectStatusChange(
                          project.id,
                          newStatus
                        )
                      }
                      onDelete={() =>
                        handleDeleteProject(
                          project
                        )
                      }
                    />

                  ))}

                </div>

              )}

            </section>



            {selectedProject && (

              <section className="mt-6 bg-white border border-gray-200 rounded-xl p-4 sm:p-6">


                <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">

                  <div>

                    <h2 className="text-xl font-semibold text-gray-900">
                      {selectedProject.name} Tasks
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                      Tasks assigned to this project.
                    </p>

                  </div>


                  <button
                    onClick={() => {
                      setSelectedProject(null)
                      setEditingTask(null)
                    }}
                    className="w-full sm:w-auto px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Close
                  </button>

                </div>



                {editingTask &&
                  editingTask.projectId === selectedProject.id && (

                    <EditTaskForm
                      key={editingTask.id}
                      task={editingTask}
                      projects={projects}
                      onUpdateTask={handleUpdateTask}
                      onCancel={() =>
                        setEditingTask(null)
                      }
                    />

                  )}


                {tasks.filter(
                  (task) =>
                    task.projectId === selectedProject.id
                ).length === 0 ? (

                  <div className="py-10 text-center">

                    <h3 className="text-lg font-semibold text-gray-700">
                      No tasks in this project
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      Assign tasks to this project from the Tasks page.
                    </p>

                  </div>

                ) : (

                  <div>

                    {tasks
                      .filter(
                        (task) =>
                          task.projectId === selectedProject.id
                      )
                      .map((task) => (

                        <TaskCard
                          key={task.id}
                          title={task.title}
                          dueDate={task.dueDate}
                          status={getTaskStatus(task)}
                          priority={task.priority}
                          projectName={selectedProject.name}
                          onEdit={() =>
                            handleEditTask(task)
                          }
                          onDelete={() =>
                            handleDeleteTask(task)
                          }
                          onStatusChange={(newStatus) =>
                            handleStatusChange(
                              task.id,
                              newStatus
                            )
                          }
                        />

                      ))}

                  </div>

                )}

              </section>

            )}

          </div>

        )}


       

        {activePage === "Analytics" && (

          <div>


            {/* Analytics Header */}

            <div className="mb-8">

              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Analytics
              </h1>

              <p className="text-sm sm:text-base text-gray-500 mt-1">
                Track your task progress and performance.
              </p>

            </div>



            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

              <StatsCard
                title="Total Tasks"
                value={totalTasks}
              />

              <StatsCard
                title="Completed"
                value={completedTasks}
              />

              <StatsCard
                title="Pending"
                value={pendingTasks}
              />

              <StatsCard
                title="Overdue"
                value={overdueTasks}
              />

            </section>



            <section className="mt-8 bg-white border border-gray-200 rounded-xl p-4 sm:p-6">


              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                <div>

                  <h2 className="text-xl font-semibold text-gray-900">
                    Completion Progress
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Percentage of tasks you have completed.
                  </p>

                </div>


                <span className="text-2xl font-bold text-gray-900">
                  {completionRate}%
                </span>

              </div>


              <div className="w-full h-3 bg-gray-200 rounded-full mt-6 overflow-hidden">

                <div
                  className="h-full bg-gray-900 rounded-full transition-all duration-300"
                  style={{
                    width: `${completionRate}%`,
                  }}
                />

              </div>

            </section>



            <section className="mt-6 bg-white border border-gray-200 rounded-xl p-4 sm:p-6">

              <h2 className="text-xl font-semibold text-gray-900">
                Task Status Overview
              </h2>

              <p className="text-sm text-gray-500 mt-1 mb-6">
                Current distribution of your tasks.
              </p>


              <div className="space-y-5">



                <div>

                  <div className="flex justify-between text-sm mb-2">

                    <span className="text-gray-600">
                      Completed
                    </span>

                    <span className="font-medium text-gray-900">
                      {completedTasks}
                    </span>

                  </div>


                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">

                    <div
                      className="h-full bg-green-500 rounded-full"
                      style={{
                        width:
                          totalTasks === 0
                            ? "0%"
                            : `${(completedTasks / totalTasks) * 100}%`,
                      }}
                    />

                  </div>

                </div>



                <div>

                  <div className="flex justify-between text-sm mb-2">

                    <span className="text-gray-600">
                      In Progress
                    </span>

                    <span className="font-medium text-gray-900">
                      {inProgressTasks}
                    </span>

                  </div>


                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">

                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{
                        width:
                          totalTasks === 0
                            ? "0%"
                            : `${(inProgressTasks / totalTasks) * 100}%`,
                      }}
                    />

                  </div>

                </div>



                <div>

                  <div className="flex justify-between text-sm mb-2">

                    <span className="text-gray-600">
                      Pending
                    </span>

                    <span className="font-medium text-gray-900">
                      {pendingTasks}
                    </span>

                  </div>


                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">

                    <div
                      className="h-full bg-yellow-500 rounded-full"
                      style={{
                        width:
                          totalTasks === 0
                            ? "0%"
                            : `${(pendingTasks / totalTasks) * 100}%`,
                      }}
                    />

                  </div>

                </div>



                <div>

                  <div className="flex justify-between text-sm mb-2">

                    <span className="text-gray-600">
                      Overdue
                    </span>

                    <span className="font-medium text-gray-900">
                      {overdueTasks}
                    </span>

                  </div>


                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">

                    <div
                      className="h-full bg-red-500 rounded-full"
                      style={{
                        width:
                          totalTasks === 0
                            ? "0%"
                            : `${(overdueTasks / totalTasks) * 100}%`,
                      }}
                    />

                  </div>

                </div>


              </div>

            </section>

          </div>

        )}


        {activePage === "Settings" && (

          <div>

            <div className="mb-8">

              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Settings
              </h1>

              <p className="text-sm sm:text-base text-gray-500 mt-1">
                Manage your workspace settings and data.
              </p>

            </div>


            <section className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6">

              <h2 className="text-xl font-semibold text-gray-900">
                Data Management
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Manage and clean up your workspace data.
              </p>


              <div className="mt-6 flex flex-col gap-4 border-t border-gray-100 pt-6 sm:flex-row sm:items-center sm:justify-between">

                <div>

                  <h3 className="font-medium text-gray-900">
                    Clear Completed Tasks
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Remove all tasks that have been marked as completed.
                  </p>

                </div>


                <button
                  onClick={() =>
                    setShowClearCompletedConfirm(true)
                  }
                  disabled={completedTasks === 0}
                  className={`w-full sm:w-auto px-4 py-2 rounded-lg text-sm font-medium ${completedTasks === 0
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-red-600 text-white hover:bg-red-700"
                    }`}
                >
                  Clear Completed
                </button>

              </div>


              <div className="mt-6 flex flex-col gap-4 border-t border-gray-100 pt-6 sm:flex-row sm:items-center sm:justify-between">

                <div>

                  <h3 className="font-medium text-gray-900">
                    Reset Workspace
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Permanently delete all tasks and projects from your workspace.
                  </p>

                </div>


                <button
                  onClick={() =>
                    setShowResetConfirm(true)
                  }
                  disabled={
                    tasks.length === 0 &&
                    projects.length === 0
                  }
                  className={`w-full sm:w-auto px-4 py-2 rounded-lg text-sm font-medium ${tasks.length === 0 &&
                    projects.length === 0
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-red-600 text-white hover:bg-red-700"
                    }`}
                >
                  Reset Workspace
                </button>

              </div>

            </section>

          </div>

        )}


      </main>


  

      {taskToDelete && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">


          <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-4 sm:p-6">


            <h3 className="text-xl font-semibold text-gray-900">
              Delete Task
            </h3>


            <p className="text-gray-500 mt-2">

              Are you sure you want to delete

              <span className="font-medium text-gray-900">
                {" "}
                {taskToDelete.title}
              </span>

              ?

            </p>




            <div className="flex flex-col-reverse gap-3 mt-6 sm:flex-row sm:justify-end">


              <button
                onClick={() =>
                  setTaskToDelete(null)
                }
                className="w-full sm:w-auto px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>


              <button
                onClick={confirmDeleteTask}
                className="w-full sm:w-auto px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>


            </div>


          </div>

        </div>

      )}




      {projectToDelete && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">


          <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-4 sm:p-6">


            <h3 className="text-xl font-semibold text-gray-900">
              Delete Project
            </h3>


            <p className="text-gray-500 mt-2">

              Are you sure you want to delete

              <span className="font-medium text-gray-900">
                {" "}
                {projectToDelete.name}
              </span>

              ?

            </p>


            <p className="text-sm text-red-600 mt-3">
              This will also permanently delete all tasks assigned to this project.
            </p>




            <div className="flex flex-col-reverse gap-3 mt-6 sm:flex-row sm:justify-end">


              <button
                onClick={() =>
                  setProjectToDelete(null)
                }
                className="w-full sm:w-auto px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>


              <button
                onClick={confirmDeleteProject}
                className="w-full sm:w-auto px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete Project
              </button>


            </div>


          </div>

        </div>

      )}


    

      {showClearCompletedConfirm && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

          <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-4 sm:p-6">

            <h3 className="text-xl font-semibold text-gray-900">
              Clear Completed Tasks
            </h3>


            <p className="text-gray-500 mt-2">
              Are you sure you want to delete all completed tasks?
            </p>


            <p className="text-sm text-red-600 mt-3">
              This will permanently delete{" "}
              {completedTasks} completed{" "}
              {completedTasks === 1 ? "task" : "tasks"}.
            </p>





            <div className="flex flex-col-reverse gap-3 mt-6 sm:flex-row sm:justify-end">

              <button
                onClick={() =>
                  setShowClearCompletedConfirm(false)
                }
                className="w-full sm:w-auto px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>


              <button
                onClick={clearCompletedTasks}
                className="w-full sm:w-auto px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Clear Tasks
              </button>

            </div>

          </div>

        </div>

      )}


   

      {showResetConfirm && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

          <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-4 sm:p-6">

            <h3 className="text-xl font-semibold text-gray-900">
              Reset Workspace
            </h3>


            <p className="text-gray-500 mt-2">
              Are you sure you want to reset your entire workspace?
            </p>


            <p className="text-sm text-red-600 mt-3">
              This will permanently delete{" "}
              {tasks.length}{" "}
              {tasks.length === 1 ? "task" : "tasks"} and{" "}
              {projects.length}{" "}
              {projects.length === 1 ? "project" : "projects"}.
            </p>




            <div className="flex flex-col-reverse gap-3 mt-6 sm:flex-row sm:justify-end">

              <button
                onClick={() =>
                  setShowResetConfirm(false)
                }
                className="w-full sm:w-auto px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>


              <button
                onClick={resetWorkspace}
                className="w-full sm:w-auto px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Reset Everything
              </button>

            </div>

          </div>

        </div>

      )}


    </div>

  )
}


export default App