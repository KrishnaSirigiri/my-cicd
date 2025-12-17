const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Hello CI/CD!' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date() });
});

app.post('/calculate', (req, res) => {
  const { num1, num2, operation } = req.body;
  let result;
  
  switch(operation) {
    case 'add':
      result = num1 + num2;
      break;
    case 'subtract':
      result = num1 - num2;
      break;
    case 'multiply':
      result = num1 * num2;
      break;
    case 'divide':
      result = num2 !== 0 ? num1 / num2 : 'Cannot divide by zero';
      break;
    default:
      return res.status(400).json({ error: 'Invalid operation' });
  }
  
  res.json({ result });
});

module.exports = app;