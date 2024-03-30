export const getVoteAverageClass = (voteAverage: number) => {
    if (voteAverage > 8) {
        return 'text-green-500';
    } else if (voteAverage > 5) {
        return 'text-fourth';
    } else {
        return 'text-red-500';
    }
};
