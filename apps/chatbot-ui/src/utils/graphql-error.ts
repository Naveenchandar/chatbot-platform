import type { ApolloError, ServerError } from "@apollo/client";

export const getGraphQLErrorMessage = (error: ApolloError): string => {
    if (!error) return '';
    if (error.graphQLErrors?.length > 0) {
        return error.graphQLErrors[0]?.message;
    }
    const networkError = error.networkError;
    if (networkError && "result" in networkError) {
        const serverError = networkError as ServerError;
        const result = serverError.result;

        if (result && typeof result === 'object' && 'errors' in result) {
            const resultErrors = result as { errors: Array<{ message: string }> };
            return resultErrors.errors?.[0]?.message ?? serverError.message;
        }
        return typeof result === 'string' ? result : serverError.message;;
    }
    return error.message ?? 'An unknown error occurred.';
};
