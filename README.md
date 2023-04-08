README - Owing
==============

![Image](./GIF.gif)

Description
-----------

This project is inspired by the Splitser app. The central idea is to have payment tabs through which users can note who has paid for what. In turn, this facilitates an easier way of making group payments as debts can be settled at a later stage (when the tab is closed). Such apps are a perfect solution when travelling with a large group of friends and wanting to avoid unnecessary time calculating expenses.

Technical Description
---------------------

The front end of the application is built using React.js. React makes CRUD actions, including getting the user API and updating payment information, to a Rails local server (see information below on how to set up). When a fetch request is made *application_controller.rb* uses models that are relationally mapped to the ActiveRecord tables to carry out requested actions.

Setting-up
----------

In the terminal, navigate to the *owing-server* repository, and:
1. bundle install
2. bundle exec rake server
3. bundle exec rake db:migrate

Then launch the React app by navigating to the *owing-client* repository, and:
1. npm install
2. npm start