import dayjs from 'dayjs';

export type Trial = { start: number; end: number; title: string };
type Normalized = {
  yIndex: number;
  hIndex: number;
  start: Date;
  end: Date;
};
export type NormalizedTrial = Omit<Trial, keyof Normalized> & Normalized;

const startDate = dayjs('2000-1-1');
const getDate = (months: number): Date => startDate.add(months, 'month').toDate();

export function normalizeData(data: Trial[]) {
  //sort trials by start time
  data = data.sort((a, b) => (a.start > b.start ? 1 : -1));
  const normalizedData = [] as NormalizedTrial[];
  // will hold the rightest trial in a row
  const stack = [] as Trial[];

  data.forEach(trial => {
    const isRightest = (c, ...rest) => c.end <= trial.start;
    const rowNumber = stack.findIndex(isRightest);
    const yIndex = rowNumber === -1 ? stack.length : rowNumber;
    // unable to compute so just assign 1
    const hIndex = 1;
    // normalize the dates
    const start = getDate(trial.start);
    const end = getDate(trial.end);

    normalizedData.push({
      ...trial,
      yIndex,
      hIndex,
      start,
      end,
    });
    stack[yIndex] = trial;
  });

  // maximise the height of each trail
  return normalizedData.map((tc, i, arr) => {
    const maxHeight = stack.length;
    let hIndex = maxHeight - tc.yIndex;

    for (let x = 0; x < arr.length; x++) {
      if (x === i) continue;

      const isUnder = tc.yIndex < arr[x].yIndex;
      const isLeftward = tc.start < arr[x].end && tc.start >= arr[x].start;
      const isRightward = tc.end > arr[x].start && tc.end < arr[x].end;
      const isCover = tc.start < arr[x].start && tc.end >= arr[x].end;

      if (!isUnder) continue;

      if (isLeftward || isRightward || isCover) {
        hIndex = hIndex - arr[x].yIndex - 1;
        hIndex = hIndex > 0 ? hIndex : 1;
        break;
      }
    }

    return { ...tc, hIndex };
  });
}
