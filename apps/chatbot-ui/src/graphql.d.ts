// types/graphql.d.ts
declare module "*.graphql" {
    import { DocumentNode } from 'graphql';
    const value: DocumentNode;
    export = value;
}
