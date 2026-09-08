import {useState} from "react";
import "../Stylesheet/commentStylesheet.css"

const TaskCommentInput = ({comment, setComment}: any) => {

    const [isOpen, setIsOpen] = useState(false);


    const setCommentHandler = (e: any) => {
        e.preventDefault();

        setComment(e.target.elements.comment.value);
        setIsOpen(false);
    }


    return (


        <div className="mt-2">
            {!isOpen ? (
                <button
                    type="button"
                    onClick={() => setIsOpen(true)}
                    className="btn btn-sm btn-light border text-muted"
                >
                    💬 {comment || "Comment"}
                </button>
            ) : (
                <form
                    onSubmit={setCommentHandler}
                    className="d-flex align-items-center gap-2"
                >
                    <input
                        name="comment"
                        type="text"
                        defaultValue={comment}
                        placeholder="Write a comment..."
                        className="form-control form-control-sm"
                        autoFocus
                    />

                    <button
                        type="submit"
                        className="btn btn-sm btn-dark"
                    >
                        {comment ? "Save" : "Send"}
                    </button>

                    <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="btn btn-sm btn-outline-secondary"
                    >
                        Cancel
                    </button>
                </form>
            )}
        </div>


    )
}

export default TaskCommentInput;