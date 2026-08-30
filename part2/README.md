# Exercises 2.1.-2.10.

## 2.1: Course information step 6

Let's change the *App* component like so:

```js
const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App
```

Define a component responsible for formatting a single course called *Course*.

The component structure of the application can be, for example, the following:

```
App
  Course
    Header
    Content
      Part
      Part
      ...
```

Hence, the *Course* component contains the components defined in the previous part, which are responsible for rendering the course name and its parts.

You don't need the sum of the exercises yet.

The application must work *regardless of the number of parts a course has*, so make sure the application works if you add or remove parts of a course.

Ensure that the console shows no errors!

## 2.2: Course information step 7

Show also the sum of the exercises of the course.

## 2.3*: Course information step 8

If you haven't done so already, calculate the sum of exercises with the array method [reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce).

**Pro tip:** when your code looks as follows:

```js
const total = 
  parts.reduce((s, p) => someMagicHere)
```
  
and does not work, it's worth it to use *console.log*, which requires the arrow function to be written in its longer form:

```js
const total = parts.reduce((s, p) => {
  console.log('what is happening', s, p)
  return someMagicHere 
})
```

**Not working? :** Use your search engine to look up how _reduce_ is used in an **Object Array**.

## 2.4: Course information step 9

Let's extend our application to allow for an *arbitrary number* of courses:

```js
const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      // ...
    </div>
  )
}
```

## 2.5: Separate module step 10

Declare the *Course* component as a separate module, which is imported by the *App* component. You can include all subcomponents of the course in the same module.

## 2.6: The Phonebook Step 1

Let's create a simple phonebook. ***In this part, we will only be adding names to the phonebook.***

Let us start by implementing the addition of a person to the phonebook.

You can use the code below as a starting point for the *App* component of your application:

```js
import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      ...
    </div>
  )
}

export default App
```

The newName state is meant for controlling the form input element.

Sometimes it can be useful to render state and other variables as text for debugging purposes. You can temporarily add the following element to the rendered component:

```html
<div>debug: {newName}</div>
```

It's also important to put what we learned in the [debugging React applications](https://fullstackopen.com/en/part1/a_more_complex_state_debugging_react_apps) chapter of part one into good use. The [React developer tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) extension is *incredibly* useful for tracking changes that occur in the application's state.

**NB:**

- you can use the person's name as a value of the *key* property
- remember to prevent the default action of submitting HTML forms!

## 2.7: The Phonebook Step 2

Prevent the user from being able to add names that already exist in the phonebook. JavaScript arrays have numerous suitable [methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) for accomplishing this task. Keep in mind [how object equality works](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness) in Javascript.

Issue a warning with the [alert](https://developer.mozilla.org/en-US/docs/Web/API/Window/alert) command when such an action is attempted:

**Hint:** when you are forming strings that contain values from variables, it is recommended to use a [template string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals):

```js
`${newName} is already added to phonebook`
```

If the newName variable holds the value *Arto Hellas*, the template string expression returns the string

```js
`Arto Hellas is already added to phonebook`
```

The same could be done in a more Java-like fashion by using the plus operator:

```js
newName + ' is already added to phonebook'
```

Using template strings is the more idiomatic option and the sign of a true JavaScript professional.

## 2.8: The Phonebook Step 3

Expand your application by allowing users to add phone numbers to the phone book. You will need to add a second *input* element to the form (along with its own event handler):

```js
<form>
  <div>name: <input /></div>
  <div>number: <input /></div>
  <div><button type="submit">add</button></div>
</form>
```

At this point, the application could look something like this. The image also displays the application's state with the help of [React developer tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi):

## 2.9*: The Phonebook Step 4

Implement a search field that can be used to filter the list of people by name.

You can implement the search field as an *input* element that is placed outside the HTML form. The filtering logic shown in the image is *case insensitive*, meaning that the search term *arto* also returns results that contain Arto with an uppercase A.

**NB:** When you are working on new functionality, it's often useful to "hardcode" some dummy data into your application, e.g.

```js
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  // ...
}
```

This saves you from having to manually input data into your application for testing out your new functionality.

## 2.10: The Phonebook Step 5

If you have implemented your application in a single component, refactor it by extracting suitable parts into new components. Maintain the application's state and all event handlers in the *App* root component.

It is sufficient to extract ***three*** components from the application. Good candidates for separate components are, for example, the search filter, the form for adding new people to the phonebook, a component that renders all people from the phonebook, and a component that renders a single person's details.

The application's root component could look similar to this after the refactoring. The refactored root component below only renders titles and lets the extracted components take care of the rest.

```js
const App = () => {
  // ...

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter ... />

      <h3>Add a new</h3>

      <PersonForm 
        ...
      />

      <h3>Numbers</h3>

      <Persons ... />
    </div>
  )
}
```
