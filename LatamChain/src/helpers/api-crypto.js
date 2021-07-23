

export const isDigestAnchored = digest =>
  !!(digest.chaininformation && digest.chaininformation.chaintimestamp);

export const isDigestFound = digest => digest.result === 1 || digest.result === 0;

export const isDigestAnchorPending = digest =>
  isDigestFound(digest) && !isDigestAnchored(digest);

export const isDigestNotAnchored = digest => !isDigestFound(digest);

export const getAnchoredDigests = digests => digests.filter(isDigestAnchored);

export const getPendingDigests = digests =>
  digests.filter(isDigestAnchorPending);

export const getNotAnchoredDigests = data => data.filter(isDigestNotAnchored);