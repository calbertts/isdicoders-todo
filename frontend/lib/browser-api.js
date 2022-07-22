export async function getTaskList() {
  console.log(process.env.NEXT_PUBLIC_FRONTEND_API_HOST)
  const res = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_API_HOST}/api/todo`);
  const json = await res.json();

  return json;
}

export async function createTask(task) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_API_HOST}/api/todo`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });

  return await res.json();
}

export async function updateTask(task) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_API_HOST}/api/todo/${task.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });

  return await res.json();
}

export async function deleteTask(task) {
  await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_API_HOST}/api/todo/${task.id}`, {
    method: 'DELETE',
  });
}
