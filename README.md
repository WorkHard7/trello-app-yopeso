# fullstack-internship-task-manager

# Frontend Routes

* Signup route: http://localhost:3000/signup
    * API Endpoint: http://localhost:8089/api/signup
    * method allowed: POST
    * parameters:
        * first name (mandatory): string
        * last name (mandatory): string
        * email (mandatory): string
        * password (mandatory, minimum 8 characters): string
        * confirm password: string
    * redirects to login page



* Signin route: http://localhost:3000/signin
    * API Endpoint: http://localhost:8089/api/signin
    * method allowed: POST
    * parameters:
        * email (mandatory): string
        * password (mandatory): string
    * redirects to home page



* Home page: http://localhost:3000/
  * API Endpoint: http://localhost:8089/api/boards
  * method allowed: GET
  * parameters: none
  
* Tasklist:
  * POST localhost:8089/api/boards/{board_id}/lists - create tasklist
  * DELETE localhost:8089/api/boards/{board_id}/lists/{tasklist_id} - delete tasklist
  * PATCH localhost:8089/api/boards/{board_id}/lists/{tasklist_id} - update tasklist
  * GET localhost:8089/api/boards/{board_id}/lists - get tasklists of a board
  
* Taskitem:
    * POST localhost:8089/api/boards/{board_id}/lists/{tasklist_id}/items - create item
    * DELETE localhost:8089/api/boards/{board_id}/lists/{tasklist_id}/items/{item_id} - delete item
    * PATCH localhost:8089/api/boards/{board_id}/lists/{tasklist_id}/items/{item_id} - update item
    * GET localhost:8089/api/boards/{board_id}/lists/{tasklist_id}/items/{item_id} - get item by id 



    
