# Company Directory

Company Directory is a “mobile first” website demonstrating CRUD functionality, that allows for creation, retrieval and modification of company personnel through interaction with an SQL database.

The single page application displays a list of employees which is dynamically populated with data obtained through PHP / an SQL query to the company directory database. Each row contains the employee’s first name, last name, job title, email address, department and location. These columns can be sorted alphabetically as needed, by toggling the desired column header. Depending on the screen size of the user, some columns may be hidden to allow a better user experience. There is also an add employee button - clicking this displays a form which allows the user to insert a new employee into the database. This entry will only be saved if the user inputs data for all fields as well as checking the confirmation checkbox.

Additionally, there are two icons at the end of each row - edit and delete. Clicking either of these will bring up modals for the appropriate action. The edit modal brings up a similar form as when adding an employee, however here the user can instead update each data field for that particular employee. Again, this form will only be possible to submit once validated. The delete modal displays a warning message before allowing the user to permanently delete that employee from the database.

There are two other buttons above the table - departments and locations. Clicking either of these will bring up the appropriate modal, which also display dynamically populated data - names etc. The user can again click on an edit or delete icon next to the record they would like to perform an action against, bringing up modals and forms that must be validated before submission. There is also an add button for each, allowing the user to add a new department or location into the database as needed.

# Skills used

HTML / CSS\
JavaScript\
jQuery / AJAX\
PHP\
Bootstrap\
DataTables\
MySQL
