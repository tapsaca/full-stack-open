# Exercises 1.1.-1.2.

## 1.1: Course Information, step 1

*The application that we will start working on in this exercise will be further developed in a few of the following exercises. In this and other upcoming exercise sets in this course, it is enough to only submit the final state of the application. If desired, you may also create a commit for each exercise of the series, but this is entirely optional.*

Use Vite to initialize a new application. Modify *main.jsx* to match the following

```js
import ReactDOM from 'react-dom/client'

import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
```

and *App.jsx* to match the following

```js
const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <h1>{course}</h1>
      <p>
        {part1} {exercises1}
      </p>
      <p>
        {part2} {exercises2}
      </p>
      <p>
        {part3} {exercises3}
      </p>
      <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
    </div>
  )
}

export default App
```

and remove the extra files *App.css* and *index.css*, also remove the directory *assets*.

Unfortunately, the entire application is in the same component. Refactor the code so that it consists of three new components: *Header*, *Content*, and *Total*. All data still resides in the *App* component, which passes the necessary data to each component using *props*. *Header* takes care of rendering the name of the course, *Content* renders the parts and their number of exercises and *Total* renders the total number of exercises.

Define the new components in the file *App.jsx*.

The *App* component's body will approximately be as follows:

```js
const App = () => {
  // const-definitions

  return (
    <div>
      <Header course={course} />
      <Content ... />
      <Total ... />
    </div>
  )
}
```

**WARNING** Don't try to program all the components concurrently, because that will almost certainly break down the whole app. Proceed in small steps, first make e.g. the component *Header* and only when it works for sure, you could proceed to the next component.

Careful, small-step progress may seem slow, but it is actually * by far the fastest* way to progress. Famous software developer Robert "Uncle Bob" Martin has stated

> *"The only way to go fast, is to go well"*

that is, according to Martin, careful progress with small steps is even the only way to be fast.

## 1.2: Course Information, step 2

Refactor the *Content* component so that it does not render any names of parts or their number of exercises by itself. Instead, it only renders three *Part* components of which each renders the name and number of exercises of one part.

```js
const Content = ... {
  return (
    <div>
      <Part .../>
      <Part .../>
      <Part .../>
    </div>
  )
}
```

Our application passes on information in quite a primitive way at the moment, since it is based on individual variables. We shall fix that in [part 2](https://fullstackopen.com/en/part2), but before that, let's go to part1b to learn about JavaScript.

# Exercises 1.3.-1.5.

## 1.3: Course Information step 3

Let's move forward to using objects in our application. Modify the variable definitions of the *App* component as follows and also refactor the application so that it still works:

```js
const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      ...
    </div>
  )
}
```

## 1.4: Course Information step 4

Place the objects into an array. Modify the variable definitions of *App* into the following form and modify the other parts of the application accordingly:

```js
const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      ...
    </div>
  )
}
```

**NB** at this point *you can assume that there are always three items*, so there is no need to go through the arrays using loops. We will come back to the topic of rendering components based on items in arrays with a more thorough exploration in the [next part of the course](https://fullstackopen.com/en/part2).

However, do not pass different objects as separate props from the *App* component to the components *Content* and *Total*. Instead, pass them directly as an array:

```js
const App = () => {
  // const definitions

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}
```

## 1.5: Course Information step 5

Let's take the changes one step further. Change the course and its parts into a single JavaScript object. Fix everything that breaks.

```js
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      ...
    </div>
  )
}
```

# Exercises 1.6.-1.14.

## 1.6: unicafe step 1

Like most companies, the student restaurant of the University of Helsinki [Unicafe](https://www.unicafe.fi) collects feedback from its customers. Your task is to implement a web application for collecting customer feedback. There are only three options for feedback: *good*, *neutral*, and *bad*.

The application must display the total number of collected feedback for each category.

Note that your application needs to work only during a single browser session. Once you refresh the page, the collected feedback is allowed to disappear.

It is advisable to use the same structure that is used in the material and previous exercise. File *main.jsx* is as follows:

```js
import ReactDOM from 'react-dom/client'

import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
```

You can use the code below as a starting point for the *App.jsx* file:

```js
import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      code here
    </div>
  )
}

export default App
```

## 1.7: unicafe step 2

Expand your application so that it shows more statistics about the gathered feedback: the total number of collected feedback, the average score (the feedback values are: good 1, neutral 0, bad -1) and the percentage of positive feedback.

## 1.8: unicafe step 3

Refactor your application so that displaying the statistics is extracted into its own *Statistics* component. The state of the application should remain in the *App* root component.

Remember that components should not be defined inside other components:

```js
// a proper place to define a component
const Statistics = (props) => {
  // ...
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // do not define a component within another component
  const Statistics = (props) => {
    // ...
  }

  return (
    // ...
  )
}
```

## 1.9: unicafe step 4

Change your application to display statistics only once feedback has been gathered.

## 1.10: unicafe step 5

Let's continue refactoring the application. Extract the following two components:

- *Button* handles the functionality of each feedback submission button.

- *StatisticLine* for displaying a single statistic, e.g. the average score.

To be clear: the *StatisticLine* component always displays a single statistic, meaning that the application uses multiple components for rendering all of the statistics:

```js
const Statistics = (props) => {
  /// ...
  return(
    <div>
      <StatisticLine text="good" value={...} />
      <StatisticLine text="neutral" value={...} />
      <StatisticLine text="bad" value={...} />
      // ...
    </div>
  )
}

```

The application's state should still be kept in the root *App* component.

## 1.11*: unicafe step 6

Display the statistics in an HTML [table](https://developer.mozilla.org/en-US/docs/Learn/HTML/Tables/Basics).

**Make sure that from now on you don't see any warnings in your console!**

## 1.12*: anecdotes step 1

The world of software engineering is filled with [anecdotes](http://www.comp.nus.edu.sg/~damithch/pages/SE-quotes.htm) that distill timeless truths from our field into short one-liners.

Expand the following application by adding a button that can be clicked to display a *random* anecdote from the field of software engineering:

```js
import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)

  return (
    <div>
      {anecdotes[selected]}
    </div>
  )
}

export default App
```

Content of the file *main.jsx* is the same as in previous exercises.

Find out how to generate random numbers in JavaScript, eg. via a search engine or on [Mozilla Developer Network](https://developer.mozilla.org). Remember that you can test generating random numbers e.g. straight in the console of your browser.

## 1.13*: anecdotes step 2

Expand your application so that you can vote for the displayed anecdote.

**NB** store the votes of each anecdote into an array or object in the component's state. Remember that the correct way of updating state stored in complex data structures like objects and arrays is to make a copy of the state.

You can create a copy of an object like this:

```js
const votes = { 0: 1, 1: 3, 2: 4, 3: 2 }

const copy = { ...votes }
// increment the property 2 value by one
copy[2] += 1     
```

OR a copy of an array like this:

```js
const votes = [1, 4, 6, 3]

const copy = [...votes]
// increment the value in position 2 by one
copy[2] += 1     
```

Using an array might be the simpler choice in this case. Searching the Internet will provide you with lots of hints on how to [create a zero-filled array of the desired length](https://stackoverflow.com/questions/20222501/how-to-create-a-zero-filled-javascript-array-of-arbitrary-length/22209781).

## 1.14*: anecdotes step 3

Now implement the final version of the application that displays the anecdote with the largest number of votes.

If multiple anecdotes are tied for first place it is sufficient to just show one of them.
