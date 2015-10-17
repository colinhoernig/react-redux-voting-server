import { List, Map } from 'immutable';

export const INITIAL_STATE = Map();

export function setEntries(state, entries) {
  return state.set('entries', List(entries));
}

/**
 * Get the winning entry from the vote Map
 */
function getWinners(vote) {
  if (!vote) return [];

  const [a, b] = vote.get('pair');
  const aVotes = vote.getIn(['tally', a], 0);
  const bVotes = vote.getIn(['tally', b], 0);

  if      (aVotes > bVotes) return [a];
  else if (aVotes < bVotes) return [b];
  else                      return [a, b];
}

/**
 * Merge an update, putting first two entries in one List, and the rest in
 * a new version of entries
 */
export function next(state) {
  const winner = getWinners(state.get('vote'));
  const entries = state.get('entries').concat(winner);

  if (entries.size === 1) {
    return state.remove('vote')
                .remove('entries')
                .set('winner', entries.first());
  } else {
    return state.merge({
      vote: Map({
        pair: entries.take(2)
      }),
      entries: entries.skip(2)
    });
  }
}

/**
 * Dig into nested Map structure vote.tally.{entry}, and apply this function there.
 * If there are keys missing along the path, create new Maps in their place.
 * If the value at the end is missing, initialize it with 0.
 */
export function vote(voteState, entry) {
  return voteState.updateIn(
    ['tally', entry],
    0,
    tally => tally + 1
  );
}
