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
