const express = require('express');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With,' +
    'Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE, OPTIONS')
  next()
});

app.use('/api/taskList', (req, res, next) => {
  const tasks = [
    {taskName: 'Coding', category: 'Work', date: 'Dec 4, 2023',
      priority: 'Moderate' , description: 'This is a coding task'
    },
    {taskName: 'Buy food', category: 'Personal', date: 'Feb 12, 2023',
      priority: 'Normal' , description: 'Go shopping'
    }
  ];
  res.status(200).json({
    message: 'Tasks fetched successfully!',
    tasks: tasks
  });
});

module.exports = app;
