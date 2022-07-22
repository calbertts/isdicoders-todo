export default async function handler(req, res) {
  if (req.method === 'GET') {
    const taskList = await getTaskList();
    res.json(taskList);
  } else if (req.method === 'POST') {
    const createdTask = await createTask(req.body);
    res.statusCode = 201;
    res.json(createdTask);
  }
}


async function getTaskList() {
  const res = await fetch(`${process.env.BACKEND_HOST}/todo`);
  const json = await res.json();

  return json;
}

async function createTask(task) {
  const response = await fetch(`${process.env.BACKEND_HOST}/todo`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(task)
  });

  return await response.json();
}

