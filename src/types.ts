export type VideoItem = {
    id: number;
    title: string;
    author: string;
    canBeDownloaded: boolean;
    minAgeRestriction: number | null;
    createdAt: string;
    publicationDate: string;
    availableResolutions: string[];
};

export type RequestBody = {
  title: string;
  author: string;
  availableResolutions: string[];
};

export type RequestPutBody = {
  title: string;
  author: string;
  availableResolutions: string[];
  minAgeRestriction: number | null;
  canBeDownloaded: boolean;
  publicationDate: string;
};