import React, { useState } from "react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";

const ApprovalModal = ({ request, onApprove, onReject }) => {
  const [note, setNote] = useState("");

  return (
    <div className="wp-action-card">
      <div className="wp-card-body">
        <p className="wp-action-prompt">
          Thực hiện hành động phê duyệt hoặc từ chối yêu cầu cho{" "}
          <strong>{request.customer_name}</strong>.
        </p>
        <textarea
          className="wp-note-textarea"
          placeholder="Thêm ghi chú (tùy chọn)..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        ></textarea>
        <div className="wp-action-buttons">
          <button
            className="wp-approve-action-button"
            onClick={() => onApprove(note)}
          >
            <CheckCircleIcon className="wp-icon" />
            Phê duyệt
          </button>
          <button
            className="wp-reject-action-button"
            onClick={() => onReject(note)}
          >
            <XCircleIcon className="wp-icon" />
            Từ chối
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApprovalModal; 