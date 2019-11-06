# ConsiliumQ frontend implementation and design doc

> ConsiliumQ is a Kanban based project tasks management platform for customers to manage the tasks for achieving the success of a project. This is the frontend implementation of the project.

## Current Project Status

Done:

1. Make a dummy kanban board page

Doing:

1. Adding basic Drag and Drop interaction without triggering any data exchange to backend.

To do:

1. _Mijeong this is for you lol_

## Description of features

### Gerneral project CRUD

1. Authenticated users can create projects on the ConsiliumQ.
2. Authenticated users can create tasks in each project to define the work pieces that lead to the finish of a project.

### Kanban board

1. Authenticated users can change the status of a task by dragging and dropping the task card component on the kanban board UI.
2. Authenticated users can define the task state by adding the state columns on the kanban board UI. - This should be the only way to add columns.

## UI design

> See detailed documentation at [ConsiliumQ doc repo](https://github.com/consiliumQ/docs)

### Theme color

By leveraging [the customizable CSS API of Material UI](https://material-ui.com/customization/palette/), we defined the primary and secondary color with following setting.

```js
palette: {
        primary: {
            main: '#282C34',
            contrastText: '#D7DAE0',
        },
        secondary: {
            main: '#4834d4',
        },
    },
```

### Mock and UX flow - to be added
