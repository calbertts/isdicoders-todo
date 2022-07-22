/**
 * Task Type
 */

export type Task = {
  id: string;
  title: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'DONE' | 'CANCELLED';
  description: string;
};
