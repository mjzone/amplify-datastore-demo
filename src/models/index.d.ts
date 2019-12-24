import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum TodoStatus {
  COMPLETED = "COMPLETED",
  INPROGRESS = "INPROGRESS"
}

export declare class Todo {
  readonly id: string;
  readonly task: string;
  readonly status: TodoStatus | keyof typeof TodoStatus;
  constructor(init: ModelInit<Todo>);
  static copyOf(source: Todo, mutator: (draft: MutableModel<Todo>) => MutableModel<Todo> | void): Todo;
}