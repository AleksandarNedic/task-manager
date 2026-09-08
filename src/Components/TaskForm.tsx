import {type FormEvent} from "react";
import categories from "../Utils/Categories"

const TaskForm = ({
                      task,
                      setTask,
                      category,
                      setCategory,
                      setTaskState,

                  }: any) => {

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

        setTaskState((currentState: any) => ({
            array: [...currentState.array, newTask],
        }));

        setTask("");
    };

    return (
        <form onSubmit={handleSubmit} className="mb-5">
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
                        onChange={(e) => setTask(e.target.value)}
                    />
                </div>

                <div className="col-12 col-md-3">
                    <select
                        className="form-select form-select-lg shadow-sm"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
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
    );
};

export default TaskForm;