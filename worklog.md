# RabbitWerks Tasker App
## Worklog

### Hosted Live on Netlify [https://nifty-bassi-fb2c74.netlify.com/]

-----------------------------------------
## 10/14/18

### styling for details cmp 
- added some RW colors

### added add-addtl-details cmp starter
- plus expander
- button added

##### LIVESTREAMED 
- [https://youtu.be/TKI3eUa-VDc]


## 10/15/18

### RabbitWerks Custom Bootstrap Theme 
- version 1.3

### details cmp styling
- grid gap
- paddingLR fix
- updated classname add-details-btn > add-details-expander, adjusted margin for expanded


## 10/17/18

### Add Steps 
- styling with flexbox
- actionBtns group added for important, delete step (dont need edit for adding) ((how about optional instad of edit))
- Add Task btn modify
- v-for list render

### Addtl Details
- adjusted styles for card header and title


## 10/18/18

### Addtl Details
- markup written, and styles added for layout
- v-models added for inputs
- steps add delete methods
- add to tasklist method

### TaskList
- fixed created lifecycle method for listening for newTask custom event and loading data properly
- task_detailsShown prefix
- styles added


## 10/19/18

### add steps validation
- validation for add steps, for empty step list, extra empty steps

### alert-box
- created element for alerting messages
-- need to adjust bootstrap theme for alerts

### taskList
- gave each task an id with fn to set each new task id

### steps btns
- started on important step action btn
- need a way to traverse svg as well as aplly vue click listen to it.
- changes steps array from strings to object with
- - value: string
- - isImportantStep: boolean

## 10/[19-20]/18

### Important Steps property
- each steps important property is registering and sending to the task list corrently
- stuck on the toggle color for svg

##### LIVESTREAMED
[https://youtu.be/UrUeqC25WYY]

[https://youtu.be/DFvKSjZDYxQ]

## 10/21/18

### Fixed isImportantStep bug
- set dynamic styling of svg colors
- independant of eachother

### isOptionalStep feature added
- dynamic styling of svg
- list item bgcolor change for optional

##### LIVESTREAMED

[https://youtu.be/BXF9anyCPq0]

## 10/24/18

### Refactored Add Steps Cmp
- created AddTask cmp folder
- - AddTask.vue
- - AddSteps.vue

##### LIVESTREAMED

[https://youtu.be/rJvHi7Bhau0]


## 10/27/18

### Extracted SVGS to cmps
- module based for reusability

### steps completed / task completed 
- passing steps completed data thru custom event to task data
- methods added
- custom events added

##### LIVESTREAMED

[https://youtu.be/X1rSUFlekKo]


## 10/31/18

### Extracted Additional Details to cmp
- passing data in as props

### steps completed / task completed 
- completed logic for task based on steps
- arr.every for checking

### Editing task steps in taskDetails on DBLClick event
- changes between a displaying div and text input div on click for editing

##### LIVESTREAMED

[https://youtu.be/F9yH8DM7hoA]

## 11/01/18

### Global Styling
- Add Task cmp group
- - Additional Details cmp
- Task List cmp group
- font change

## 11/07/18

### Completed Task List cmp
- basic design finished, all data present
- needs more styling
- needs logic
- major flexbox

### App.vue Secondary Focus Area
- Add Task && Completed Task cmps
- headers are click events for true / false
- flexbox

##### LIVESTREAMED 
[see youtube livestream episode list]


## 11/11/18

### Debugged Progress Bar
- Changed from toggle TF to conditional check

### SVG Transitions
- Broke out expander to own cmp
- rotate condition passed in via props

### Added pointer class to action items

### Local Storage set up
- saves on 
- - add task
- - update step
- - delete task

### EditMode for New Tasks
- fixed, needed editMode property on instanciation

### Delete Task 
- button added with logic


## 11/14/18

### Rearranged app
- addTask on top
- toggle current and completed tasks

### Manage Buttons cmp
- archive task
- edit details
- delete task

### Bug Fixes
- Empty Steps error
- Checked Attr bug
- Delete Task bug


## 11/20/18

### Clear Task Form 
- button added
- custom event emitted to child to clear steps

### Set Current Date of Completion
- formatted dates

### Set Importance Display Word
- checks if important, optional, both, or neither

### Saving Completed Task List to LS
- save on new completed task pushed
- load complete tasks from LS

### Started Global Counter Store
- Vuex principals
- vue instance


## 11/23/18

### Edit Details Feature
- part 1 - trigger editmode from manage buttons cmp CE
- part 2 - edit values with inputs, conditionall show
- part 3 - send updated details to TaskList cmp with source data using CE

### Media Queries
- TaskDetails mobile responsive
- Add Task input mobile responsive

---
### Checklist
* [ ] fine tune styling <-----
* [x] debug important step event.
* [ ] change contact to resources?
* [x] additional details - card flush list
* [x] Steps list inputs
* [x] Set curser to pointer on hover for details
* [x] add details area for add task cmp
* [x] style details cmp
* [x] add completed signification
* [x] Debug progress bar
* [x] show hide details svg transform
* [x] local storage! then db
* [x] delete task button
* [x] completed tasks cmp
* [x] if task complete, archive task btn
* [x] edit additional details
* [x] clear add task form btn
* [x] add day completed property to finished tasks
* [x] set completed date on complete task
* [x] store completed tasks in LS too. 
* [x] display if important or optional or both for completed task steps.
* [x] edit details 



* [ ] style app with RabbitWerks colors?

### RabbitWerks Colors
- brightGreen: #00D6A4  
- darkTurq: #006473  
- accTeal: #03D8CB  
- mainTurq: #03A9AC  
- backgroundGrey: #212121  
- navbarBlack: #0a0a0a  
- fontColor: #f7f7f7  
    
### Progress: ||||||||||||||||||||||||||||||
----
# Livestream Todo

- NavBar?
* [x] Media Queries!
  * [ ] Fix Add step styling
  * [ ] completed task styling
* [ ] styles for if completed on time or late
* [ ] methods for Counter Store
* [ ] delete step to SVG


- Set up mixin for formatDate Fn
- debug date object minus day thing

* [ ] accessibility for action buttons
* [ ] hover tool tips??


-+ svgs into seperate cmps

- SET DATABASE UP!