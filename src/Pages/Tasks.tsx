import categories from "../Utils/Categories";
import {type FormEvent, useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {useRecoilState} from "recoil";
import taskState from "../States/taskState";
import userState from "../States/userState";

const Tasks = () => {
    const [currentTaskState, setTaskState] = useRecoilState(taskState);
    const [currentUserState, setUserState] = useRecoilState(userState);

    const [task, setTask] = useState("");
    const [category, setCategory] = useState(categories[0]);
    const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
    const [editingText, setEditingText] = useState("");
    const [editingCategory, setEditingCategory] = useState(categories[0]);


    const cancelEdit = () => {
        setEditingTaskId(null);
    }


    const saveEdit = () => {

        if (editingTaskId === null || !editingText.trim()) {
            return;
        }

        setTaskState((currentTaskState) => (
            {
                array: currentTaskState.array.map((task) =>
                    task.id === editingTaskId ? {
                    ...task,
                        task:editingText,
                        category:editingCategory,

                    } : task



                )
            }
        ))
        setEditingTaskId(null);

    }

    const editTask = (taskId: number) => {
             const taskToEdit = currentTaskState.array.find(
                 (task) => task.id === taskId
             )
        if (!taskToEdit) {
            return;
        }
        setEditingTaskId(taskId);
        setEditingText(taskToEdit.task);
        setEditingCategory(taskToEdit.category);
    };

    const deleteTask = (taskId: number) => {
        setTaskState((currentState) => ({
            array: currentState.array.filter(
                (task) => task.id !== taskId
            ),
        }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const taskText = task.trim();

        if (!taskText) {
            return;
        }

        const newTask = {
            id: Date.now(),
            task: taskText,
            category: category,
        };

        setTaskState((currentState) => ({
            array: [...currentState.array, newTask],
        }));

        setTask("");
    };

    const logOut = () => {
        setUserState({loggedIn: false});
    };

    if (!currentUserState.loggedIn) {
        return null;
    }

    const taskCount = currentTaskState.array.length;

    return (
        <main className="container py-4 py-md-5">
            <section
                className="mx-auto"
                style={{maxWidth: "920px"}}
            >
                <div className="card border-0 shadow-lg overflow-hidden rounded-4">


                    <div
                        className="p-4 p-md-5 text-white"
                        style={{
                            background:
                                "linear-gradient(135deg, #0d6efd, #6610f2, #d63384)",
                        }}
                    >
                        <div
                            className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-4">

                            <div>
                            <span className="badge bg-white text-primary rounded-pill px-3 py-2 mb-3">
                                TASK MANAGER
                            </span>

                                <h1 className="display-5 fw-bold mb-2">
                                    Get things done.
                                </h1>

                                <p className="lead mb-0 text-white-50">
                                    Keep track of what matters and stay productive.
                                </p>
                            </div>

                            <div className="d-flex align-items-center gap-3">

                                <div
                                    className="bg-white text-dark rounded-4 shadow d-flex align-items-center justify-content-center flex-shrink-0"
                                    style={{
                                        width: "95px",
                                        height: "95px",
                                    }}
                                >
                                    <div className="text-center">

                                    <span className="d-block display-6 fw-bold text-primary">
                                        {taskCount}
                                    </span>

                                        <span className="small fw-bold text-secondary">
                                        TASKS
                                    </span>

                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={logOut}
                                    className="btn btn-light rounded-pill px-3 fw-semibold shadow-sm"
                                >
                                    Logout
                                </button>

                            </div>
                        </div>
                    </div>


                    <div className="card-body p-4 p-md-5 bg-body-tertiary">


                        <form
                            onSubmit={handleSubmit}
                            className="mb-5"
                        >

                            <label
                                htmlFor="new-task"
                                className="form-label fw-semibold"
                            >
                                Add a new task
                            </label>

                            <div className="row g-2">


                                <div className="col-12 col-md-6">

                                <input
                                    id="new-task"
                                    type="text"
                                    className="form-control form-control-lg shadow-sm"
                                    placeholder="What needs to be done?"
                                    value={task}
                                    onChange={(e) =>
                                        setTask(e.target.value)
                                    }
                                />

                                </div>


                                <div className="col-12 col-md-3">

                                    <select
                                        className="form-select form-select-lg shadow-sm"
                                        value={category}
                                        onChange={(e) =>
                                            setCategory(e.target.value)
                                        }
                                    >
                                        {categories.map((category) => (
                                            <option
                                                key={category}
                                                value={category}
                                            >
                                                {category}
                                            </option>
                                        ))}
                                    </select>

                                </div>


                                <div className="col-12 col-md-3">

                                <button
                                    type="submit"
                                    className="btn btn-primary btn-lg w-100 fw-semibold shadow-sm"
                                >
                                    Add Task
                                </button>

                            </div>

                            </div>

                        </form>


                        <div className="d-flex align-items-center justify-content-between mb-3">

                            <h2 className="h4 fw-bold mb-0">
                                Your tasks
                            </h2>

                            <span className="badge rounded-pill text-bg-primary px-3 py-2">
                            {taskCount}{" "}
                                {taskCount === 1
                                    ? "task"
                                    : "tasks"}
                        </span>

                        </div>


                        {taskCount === 0 ? (

                            <div className="bg-white border rounded-4 p-5 text-center shadow-sm">

                                <div className="display-4 mb-3">
                                    ✨
                                </div>

                                <h3 className="h5 fw-bold">
                                    Nothing here yet
                                </h3>

                                <p className="text-secondary mb-0">
                                    Add your first task and start getting things done.
                                </p>

                            </div>

                        ) : (


                            <ul className="list-group gap-2">

                                {currentTaskState.array.map(
                                    (item, index) => (

                                    <li
                                        key={item.id}
                                        className="list-group-item border rounded-3 px-3 py-3 d-flex align-items-center gap-3 shadow-sm bg-white"
                                    >


                                        <span className="badge rounded-circle text-bg-primary p-2">
                                            {index + 1}
                                        </span>

                                        {editingTaskId === item.id ? (
                                            <>
                                                <div className="flex-grow-1">
                                                    <input
                                                        type="text"
                                                        className="form-control mb-2"
                                                        value={editingText}
                                                        onChange={(e) => setEditingText(e.target.value)}
                                                    />

                                                    <select
                                                        className="form-select"
                                                        value={editingCategory}
                                                        onChange={(e) =>
                                                            setEditingCategory(e.target.value)
                                                        }
                                                    >
                                                        {categories.map((category) => (
                                                            <option key={category} value={category}>
                                                                {category}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>

                                                <button
                                                    onClick={saveEdit}
                                                    type="button"
                                                    className="btn btn-success btn-sm rounded-pill px-3"
                                                >
                                                    Save
                                                </button>

                                                <button
                                                    onClick={cancelEdit}
                                                    type="button"
                                                    className="btn btn-secondary btn-sm rounded-pill px-3"
                                                >
                                                    Cancel
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <div className="flex-grow-1">

                                                    <div className="fw-semibold text-break">
                                                        {item.task}
                                                    </div>

                                                    <span className="badge text-bg-secondary rounded-pill mt-1 px-3 py-2">
                {item.category}
            </span>

                                                </div>


                                            </>
                                        )}

                                        <button
                                            type="button"
                                            onClick={() =>
                                                deleteTask(item.id)
                                            }
                                            className="btn btn-outline-danger btn-sm rounded-pill px-3"
                                            aria-label={`Delete task: ${item.task}`}
                                        >
                                            Delete
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                editTask(item.id)
                                            }
                                            className="btn btn-outline-primary btn-sm rounded-pill px-3"
                                            aria-label={`Edit task: ${item.task}`}
                                        >
                                            Edit
                                        </button>

                                    </li>

                                    )
                                )}

                            </ul>

                        )}

                    </div>
                </div>
            </section>
        </main>
    );
}


export default Tasks;
