import React, { useState } from "react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";

const ApprovalModal = ({ request, onApprove, onReject }) => {
  const [note, setNote] = useState("");

  return (
    <div className="wp-action-card">
      <div className="wp-card-body">
        <p className="wp-action-prompt">
          Perform an approval or rejection action for the request by{" "}
          <strong>{request.customer_name}</strong>.
        </p>
        <textarea
          className="wp-note-textarea"
          placeholder="Add a note (optional)..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        ></textarea>
        <div className="wp-action-buttons">
          <button
            className="wp-approve-action-button"
            onClick={() => onApprove(note)}
          >
            <CheckCircleIcon className="wp-icon" />
            Approve
          </button>
          <button
            className="wp-reject-action-button"
            onClick={() => onReject(note)}
          >
            <XCircleIcon className="wp-icon" />
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApprovalModal;
