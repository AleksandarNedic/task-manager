import categories from "../Utils/Categories"

const TaskItem = ({
                      item,
                      onEdit,
                      onDelete,
                      isEditing,
                      editingText,
                      setEditingText,
                      editingCategory,
                      setEditingCategory,
                      saveEdit,
                      cancelEdit,

                  }: any) => {
    return (
        <li className="list-group-item p-3 rounded-3 shadow-sm">
            {isEditing ? (
                <div>
                    <input
                        type="text"
                        className="form-control mb-2"
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                    />
                    <select
                        className="form-select mb-2"
                        value={editingCategory}
                        onChange={(e) => setEditingCategory(e.target.value)}
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
                    <div className="d-flex gap-2">
                        <button
                            onClick={() => saveEdit(item.id)}
                            className="btn btn-sm btn-success">
                            Save
                        </button>

                        <button
                            onClick={() => cancelEdit(item.id)}
                            className="btn btn-sm btn-secondary">
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <div className="fw-semibold fs-5">
                            {item.task}
                        </div>

                        <span className="badge bg-secondary mt-1">
                    {item.category}
                </span>
                    </div>

                    <div className="d-flex gap-2">
                        <button
                            onClick={() => onEdit(item.id)}
                            className="btn btn-sm btn-outline-primary"
                        >
                            Edit
                        </button>

                        <button
                            onClick={() => onDelete(item.id)}
                            className="btn btn-sm btn-outline-danger"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            )}
        </li>
    );
};

export default TaskItem;