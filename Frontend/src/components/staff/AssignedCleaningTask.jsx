
import React, { useEffect, useState } from 'react';
import './AssignedCleaningTasks.css';
import '../admin/AdminDashboard.css';
import beachImage from '../../assets/bella-beachh.jpg';

import CleaningTaskStatus from './CleaningTaskStatus';

function AssignedCleaningTasks() {

    const [tasks, setTasks] = useState([]);

    // Temporary staff ID
    const staffId = 3;

    // Get assigned cleaning tasks
    useEffect(() => {
        fetch(`http://localhost:3000/api/staff/cleaning-tasks/${staffId}`)
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    setTasks(result.data);
                }
            })
            .catch(error => console.log(error));
    }, []);

    return (
        <div className="admin-layout">

            {/* Sidebar */}
            <aside className="admin-sidebar">
                <h2>Bella Beach</h2>
                <p>STAFF PORTAL</p>

                <nav>
                    <ul>
                        <li>Dashboard</li>
                        <li className="active">
                            Assigned Cleaning Tasks
                        </li>
                        <li>Cleaning Reports</li>
                        <li>Maintenance Reports</li>
                        <li>Notifications</li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="admin-content">

                {/* Welcome Banner */}
                <div
                    className="dashboard-banner"
                    style={{ backgroundImage: `url(${beachImage})` }}
                >
                    <div className="banner-overlay">
                        <p className="banner-subtitle">
                            STAFF PORTAL
                        </p>

                        <h1>Bella Beach Resort</h1>

                        <p className="banner-description">
                            Welcome back, Staff!
                        </p>
                    </div>
                </div>

                <h1>Assigned Cleaning Tasks</h1>

                <p>
                    View your assigned cleaning tasks below.
                </p>

                {/* Summary Cards */}
                <div className="dashboard-cards">

                    <div className="dashboard-card">
                        <h3>Total Tasks</h3>
                        <h2>{tasks.length}</h2>
                    </div>

                    <div className="dashboard-card">
                        <h3>Pending Tasks</h3>
                        <h2>
                            {tasks.filter(task =>
                                task.status?.toLowerCase() === 'pending'
                            ).length}
                        </h2>
                    </div>

                </div>

                {/* Cleaning Task Table */}
                <div className="staff-task-section">

                    <h2>Cleaning Task List</h2>

                    <p>Tasks assigned to you by the Admin.</p>

                    <div className="staff-table-wrapper">

                        <table className="staff-task-table">

                            <thead>
                                <tr>
                                    <th>Task ID</th>
                                    <th>Customer</th>
                                    <th>Reservation ID</th>
                                    <th>Request Date</th>
                                    <th>Task Details</th>
                                    <th>Current Status</th>
                                    <th>Update Status</th>
                                </tr>
                            </thead>

                            <tbody>
                                {tasks.length > 0 ? (
                                    tasks.map(task => (
                                        <tr key={task.cleaning_id}>
                                            <td>{task.cleaning_id}</td>
                                            <td>{task.customer_name}</td>
                                            <td>{task.reservation_id}</td>
                                            <td>{task.request_date}</td>
                                            <td>{task.description}</td>

                                            <CleaningTaskStatus
                                            task ={task}
                                            staffId={staffId}/>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="staff-no-tasks">
                                            No assigned cleaning tasks.
                                        </td>
                                    </tr>
                                )}
                            </tbody>

                        </table>

                    </div>
                </div>

            </main>
        </div>
    );
}

export default AssignedCleaningTasks;
