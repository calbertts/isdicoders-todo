import {TaskNotFound} from '../../src/domain/TaskNotFound';

describe('TaskNotFound', () => {
  it('should construct a task not found exception', () => {
    const exception = new TaskNotFound('fake-id');
    const expectedMessage = 'Task "fake-id" not found';

    expect(exception.toString()).toBe(expectedMessage);
  });
});
