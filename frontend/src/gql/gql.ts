/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\nmutation LoginUser($email: String!, $password: String!) {\n    login(loginInput: {email: $email, password: $password}) {\n        user{\n            email\n            id\n            fullname\n        }\n    }\n}": types.LoginUserDocument,
    "\n  mutation LogoutUser {\n    logout\n  }\n": types.LogoutUserDocument,
    "\nmutation RegisterUser($fullname: String!, $email: String!, $password: String!, $confirmPassword: String!) {\n    register(registerInput: {fullname: $fullname, email: $email, password: $password, confirmPassword: $confirmPassword}) {\n        user{\n            email\n            id\n            fullname\n        }\n    }\n}": types.RegisterUserDocument,
    "\n    query GerUsers {\n        getUsers{\n            id\n            fullname\n            email\n            image\n        }\n    }\n": types.GerUsersDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation LoginUser($email: String!, $password: String!) {\n    login(loginInput: {email: $email, password: $password}) {\n        user{\n            email\n            id\n            fullname\n        }\n    }\n}"): (typeof documents)["\nmutation LoginUser($email: String!, $password: String!) {\n    login(loginInput: {email: $email, password: $password}) {\n        user{\n            email\n            id\n            fullname\n        }\n    }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation LogoutUser {\n    logout\n  }\n"): (typeof documents)["\n  mutation LogoutUser {\n    logout\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation RegisterUser($fullname: String!, $email: String!, $password: String!, $confirmPassword: String!) {\n    register(registerInput: {fullname: $fullname, email: $email, password: $password, confirmPassword: $confirmPassword}) {\n        user{\n            email\n            id\n            fullname\n        }\n    }\n}"): (typeof documents)["\nmutation RegisterUser($fullname: String!, $email: String!, $password: String!, $confirmPassword: String!) {\n    register(registerInput: {fullname: $fullname, email: $email, password: $password, confirmPassword: $confirmPassword}) {\n        user{\n            email\n            id\n            fullname\n        }\n    }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GerUsers {\n        getUsers{\n            id\n            fullname\n            email\n            image\n        }\n    }\n"): (typeof documents)["\n    query GerUsers {\n        getUsers{\n            id\n            fullname\n            email\n            image\n        }\n    }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;