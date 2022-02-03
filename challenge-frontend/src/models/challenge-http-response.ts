export interface ChallengeHttpResponse<t> {
    hasError: boolean;
    msgError: string;
    items?: Array<t> | t;
}
