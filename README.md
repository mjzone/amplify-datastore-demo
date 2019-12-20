## Amplify DataStore Demo

![storage-image](https://aws-amplify.github.io/docs/images/sync.png)

(Image Reference - Amplify Documentation)

- Amplify DataStore is an on device persistent repository for interacting with your local data while it synchronizes with the cloud. The core idea is to focus on your data modeling in your application with GraphQL, adding any authorization rules or business logic into your application when needed. Starting with GraphQL schema (with or without an AWS account) a code generation process creates Models which are domain native constructs for a programming platform (TypeScript, Java, Swift classes).

- Once Models have been generated, you can operate on these instances with the DataStore API to save, query, update, delete, or observe changes.

- At runtime models are passed into a Storage Engine that has a Storage Adapter.

- The Storage Engine manages a “Model Repository” of Models which were defined by the developer’s GraphQL schema as well as “System Models” which are used for both metadata (such as settings) and queueing updates over the network when syncing to the cloud.

- Amplify ships with default Storage Adapter implementations, such as SQLite and IndexedDB, however the pattern allows for more in the future for community contributions and is not specific to one technology (e.g. SQL vs NoSQL).

- For more information check Amplify DataStore [Documentation](https://aws-amplify.github.io/docs/js/datastore)

### Steps followed in the Demo

#### 1. Install latest amplify CLI

- npm i -g @aws-amplify/cli@latest

#### 2. Use NPM Script to bootstrap project without AWS

- npx amplify-app@latest

#### 3. Create a GraphQL Type

```
type Todo @model {
  id: ID!
  task: String!
}
```

#### 4. Generate Models

- amplify codegen models

#### 5. Install DataStore Dependencies

- npm i @aws-amplify/core @aws-amplify/datastore

#### 6. Import DataStore Dependencies

```
import Amplify from "@aws-amplify/core";
import { DataStore, Predicates } from "@aws-amplify/datastore";
import { Todo } from "../models";
```

#### 7. Sync with AWS Cloud

- You can use `npm run amplify-push` but it uses API key authorization for AppSync

- In order to use Cognito User Pool for Authorization update API category

- amplify init

- amplify status

- amplify api update

* Finally `amplify push` to create resources in AWS

#### 8. Configure application to use Amplify

- npm i aws-amplify aws-amplify-react

```
import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";
import { withAuthenticator } from "aws-amplify-react";

Amplify.configure(awsconfig);

```
