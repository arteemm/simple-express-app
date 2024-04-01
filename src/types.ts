export type VideoItem = {
    id: number;
    title: string;
    author: string;
    canBeDownloaded: boolean;
    minAgeRestriction: null;
    createdAt: string;
    publicationDate: string;
    availableResolutions: string[];
};

export type RequestBody = {
  title: string;
  author: string;
  availableResolutions: string[];
};
