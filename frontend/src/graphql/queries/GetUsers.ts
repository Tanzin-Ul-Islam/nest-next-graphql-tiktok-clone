import { gql } from "@apollo/client";

export const GET_USER = gql`
    query GerUsers {
        getUsers{
            id
            fullname
            email
            image
        }
    }
`