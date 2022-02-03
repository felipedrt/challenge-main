export interface ChallengeHttpResponse<t> {
    hasError: boolean;
    msgError: '';
    items?: Array<t>;
}
