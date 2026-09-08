import categories from "../Utils/Categories";
import {useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {useRecoilState} from "recoil";
import taskState from "../States/taskState";
import userState from "../States/userState";
import TaskItem from "../Components/TaskItem";
import TaskForm from "../Components/TaskForm"

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
                        <TaskForm
                            task={task}
                            setTask={setTask}
                            category={category}
                            setCategory={setCategory}
                            setTaskState={setTaskState}
                        />


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
                                {currentTaskState.array.map((item) => (
                                    <TaskItem
                                        key={item.id}
                                        item={item}
                                        onEdit={editTask}
                                        onDelete={deleteTask}
                                        saveEdit={saveEdit}
                                        isEditing={editingTaskId === item.id}
                                        editingText={editingText}
                                        setEditingText={setEditingText}
                                        editingCategory={editingCategory}
                                        setEditingCategory={setEditingCategory}
                                        cancelEdit={cancelEdit}
                                    />
                                ))}
                            </ul>

                        )}

                    </div>
                </div>
            </section>
        </main>
    );
};

export default Tasks;