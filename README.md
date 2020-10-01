# Product Engineering Technical Test

 To start make `yarn && yarn start`
--- 

This test is intended to give us a sense of your coding skills.

## Technical assignment

The goal here is to build a timeline of multiple clinical trials, such as the one below:

<img width="600" alt="trials" src="https://user-images.githubusercontent.com/7806174/34826432-ca38d58e-f6d6-11e7-9a6a-1fbaee72b506.png">


The timeline will have to respect the following constraints :
 1. Trials should always take up the maximum disponible height
 2. In case of overlap between trials, trials cannot be displayed on top of each other
 3. Overlapping trials must have the same height
 
 1. No trials may visually overlap.
 2. If two trials collide in time, they must have the same height.
 3. Trials should always take up the maximum disponible height, but constraint 2) takes precedence over this constraint.
 
Each trial is represented by an object of shape:

```js
/*
 type Trial = { start: number, end: number, title: string };
*/

const exampleTrial = {
  start: 5, // number of months since 01/01/2000
  end: 12,  // number of months since 01/01/2000
  title: 'Study of Bendamustine'
}
```

 * The timeline should render the following trials by default:

```js
const trials = [
  { start: 5, end: 50, title: 'Study of Bendamustine' },
  { start: 55, end: 85, title: 'ASCT With Nivolumab' },
  { start: 70, end: 100, title: 'Study of Stockolm' },
  { start: 90, end: 115, title: 'Bortezomib' },
]
```

 * Your application should be written in React and expose a `renderClinicalTrials` function on the global namespace.
 The rendering algorithm should be made as efficient as possible time-complexity-wise.

```js
function renderClinicalTrials(trials /* : Array<Trial> */) {
  // update the timeline
}
```
