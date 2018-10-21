# RabbitWerks Tasker App
## Worklog
-----------------------------------------
## 10/14/18

### styling for details cmp 
- added some RW colors

### added add-addtl-details cmp starter
- plus expander
- button added

### livestreamed session 
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

## 10/19/18

### Important Steps property
- each steps important property is registering and sending to the task list corrently
- stuck on the toggle color for svg


[ ] debug important step event.
[ ] change contact to resources?
[ ] additional details - card flush list
[ ] Steps list inputs
[x] Set curser to pointer on hover for details
[x] add details area for add task cmp
[x] style details cmp
[ ] add completed signification
[.] style app with RabbitWerks colors?
    - brightGreen: #00D6A4
    - darkTurq: #006473
    - accTeal: #03D8CB
    - mainTurq: #03A9AC
    - backgroundGrey: #212121
    - navbarBlack: #0a0a0a
    - fontColor: #f7f7f7
    
### Progress: ||||||



# todo

- validation for add steps blank ---> done
- global counters
- give tasks an id ---> done
- action btns
- alert msg function and markup ---> done

