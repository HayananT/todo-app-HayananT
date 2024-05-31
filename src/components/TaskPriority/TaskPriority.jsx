import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import "./TaskPriority.css";

const TaskPriority = () => {
  const [taskData, setTaskData] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch("https://6363c8f68a3337d9a2e7d805.mockapi.io/api/to-do");
      const data = await response.json();
      const priorityCounts = countPriorities(data);
      setTaskData(priorityCounts);
      renderChart(priorityCounts);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const countPriorities = (tasks) => {
    const counts = { LOW: 0, MEDIUM: 0, HIGH: 0 };
    tasks.forEach(task => {
      if (counts[task.priority] !== undefined) {
        counts[task.priority]++;
      }
    });
    return counts;
  };

  const renderChart = (priorityCounts) => {
    const ctx = document.getElementById("priorityChart").getContext("2d");
    new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Low", "Medium", "High"],
        datasets: [{
          label: "Task Priority",
          data: [priorityCounts.LOW, priorityCounts.MEDIUM, priorityCounts.HIGH],
          backgroundColor: ["#36a2eb", "#ffcd56", "#ff6384"],
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "70%",
        plugins: {
          title: {
            display: false
          },
          legend: {
            position: 'right',
            align: 'start',
            labels: {
              color: 'black',
              font: {
                weight: 'bold',
                size: 14
              }
            }
          }
        }
      }
    });
  };

  return (
    <div className="priority-chart-container">
      <h2 className="container-heading">Task Priorities</h2>
      <canvas id="priorityChart"></canvas>
    </div>
  );
};

export default TaskPriority;
