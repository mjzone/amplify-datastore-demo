// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Task } = initSchema(schema);

export {
  Task
};