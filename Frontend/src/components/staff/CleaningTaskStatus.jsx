import React, { useState } from 'react';

function CleaningTaskStatus({ task, staffId }) {

    const [status, setStatus] = useState(task.status);
    const [currentStatus, setCurrentStatus] = useState(task.status);

    // Update cleaning task status
    const updateStatus = () => {

        fetch(`http://localhost:3000/api/staff/cleaning-tasks/${task.cleaning_id}/status`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                staffId: staffId,
                status: status
            })
        })
        .then(response => response.json())
        .then(result => {

            if (result.success) {
                setCurrentStatus(status);
                alert('Cleaning task status updated successfully!');
            } else {
                alert(result.message);
            }

        })
        .catch(error => {
            console.log(error);
            alert('Failed to update cleaning task status.');
        });
    };

    return (
        <>
            <td>{currentStatus}</td>

            <td>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>

                <button onClick={updateStatus}>
                    Update
                </button>
            </td>
        </>
    );
}

export default CleaningTaskStatus;
