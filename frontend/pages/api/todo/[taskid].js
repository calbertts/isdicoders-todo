export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const updatedTask = await updateTask(req.query.taskid, req.body);
    res.statusCode = 200;
    res.json(updatedTask);
  } else if (req.method === 'DELETE') {
    await deleteTask(req.query.taskid);
    res.statusCode = 200;
    res.end();
  }
}

async function updateTask(id, task) {
  const response = await fetch(`${process.env.BACKEND_HOST}/todo/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(task)
  });

  return await response.json();
}

async function deleteTask(id) {
  await fetch(`${process.env.BACKEND_HOST}/todo/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
