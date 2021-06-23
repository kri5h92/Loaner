# kreditpay

Kreditpay is a minimal loan management system build using MERN stack. It's an online platform where you as a customer can take a loan with ease.

## Demo

https://kreditpay.netlify.app/


## Description

From developer perspective this project is build using 3 tier structure that allow you to easily deploy frontend and backend code on different platform. For example the current *demo* project frontend is served on netlify and backend api is served by heroku server.

Following are the design patterns used in this project to make code modular.

1. 3 tier structure - Decouple your frontend and backend code.
2. Router config array - Seperate module for creating and adding routes.
3. RBAC(Role Based Access Control) - To limit the resource access for each type of user which are `[admin,customer,agent]`

## Todo

1. - [x] List,view and edit users.
1. - [ ] Create a loan request on behalf of the user -  This can only be done by "agent" role. Inputs would be tenure selected (in months) and interest to be charged every month. Loan can have 3 states - "NEW", "REJECTED", "APPROVED".
1. - [ ] Approval of loan request - This can only be done by an "admin" role.
1. - [ ] Edit a loan (but not after it has been approved) -  This can be done only by "agent" role. But cannot be done if loan is in "Approved" state. IMPORTANT: Can we save previous history ? In an extreme situation, can we "rollback" the changes ? Hint: the best designs here use "double safety" - logic in the code as well as database constraints.
 
1. - [ ] Ability to list and view loans (approved) or loan requests based on the filter applied -  By "filter" we mean - select by date of creation, date of update, state of loan (NEW, REJECTED, APPROVED), etc. This action can be done by all : "customer", "agent" and "admin" roles. HOWEVER - "customer" can only see his own loans...while "agent" and "admin" can see everyone's loans. The way we design our data model above will allow us to do this. Make sure there are no security loopholes here.

5. - [ ] Writing the test cases.

## TechStack

Using  MERN stack i.e.

* Frontend: React, Tailwind CSS.
* Backend: Nodejs, Express, MongoDB.

## Requirement

* VSCode: If you want to take advantage of dev plugins.
* Node v12.x.x

> To prevent bugs project is locked to run only on Node v10.0+.
>
> Recommended to use [NVM](https://github.com/creationix/nvm)