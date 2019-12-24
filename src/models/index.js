// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const TodoStatus = {
  "COMPLETED": "COMPLETED",
  "INPROGRESS": "INPROGRESS"
};

const { Todo } = initSchema(schema);

export {
  Todo,
  TodoStatus
};