import React, { useState, useEffect } from 'react';
import './ClosestDeadline.css';

const ClosestDeadline = () => {
    const [closestDeadline, setClosestDeadline] = useState(null);

    const mockData = [
        { id: 1, task: "Build a landing page", deadline: "2024-10-01" },
        { id: 2, task: "Fix the payment bug", deadline: "2024-09-28" },
        { id: 3, task: "Design a logo", deadline: "2024-09-30" },
        { id: 4, task: "Create marketing emails", deadline: "2024-10-05" }
    ];

    useEffect(() => {
        const closest = mockData.reduce((prev, current) => 
            new Date(prev.deadline) < new Date(current.deadline) ? prev : current
        );
            setClosestDeadline(closest);
    }, []);

    return (
        <div className="closest-deadline">
            {closestDeadline ? (
                <div>
                    <p><strong>Task:</strong> {closestDeadline.task}</p>
                    <p><strong>Deadline:</strong> {new Date(closestDeadline.deadline).toLocaleDateString()}</p>
                </div>
            ) : (
                <p>No tasks available</p>
            )}
        </div>
    );
};

export default ClosestDeadline;
