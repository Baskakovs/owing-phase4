README - Owing
==============

![Image](./GIF.gif)

Description
-----------

This project is inspired by the Splitser app. The central idea is to have payment tabs through which users can note who has paid for what. In turn, this facilitates an easier way of making group payments as debts can be settled at a later stage (when the tab is closed). Such apps are a perfect solution when travelling with a large group of friends and wanting to avoid unnecessary time calculating expenses.

Technical Description
---------------------

The front end of the application is built using React.js. React makes CRUD actions, including getting the user API and updating payment information, to a Rails local server (see information below on how to set up). When a fetch request is made *application_controller.rb* uses models that are relationally mapped to the ActiveRecord tables to carry out requested actions.

Dependencies
------------

### System Requirements
- **Ruby**: 3.2.2
- **Node.js**: 20.x LTS
- **PostgreSQL**: Required for database

### Ruby Dependencies (Backend)

#### Core Framework
- **Rails**: ~> 7.1.0 (7.1.6)
- **Ruby**: 3.2.2

#### Database & Server
- **pg**: ~> 1.5 (1.6.2) - PostgreSQL adapter
- **puma**: ~> 6.0 (6.6.1) - Web server

#### Authentication & Security
- **bcrypt**: ~> 3.1.20 (3.1.20) - Password hashing

#### API & Serialization
- **active_model_serializers**: ~> 0.10.13 (0.10.15) - JSON serialization
- **rack-cors**: 3.0.0 - Cross-Origin Resource Sharing

#### Development Tools
- **bootsnap**: >= 1.18.0 (1.19.0) - Application boot time optimization
- **foreman**: 0.90.0 - Process management
- **listen**: ~> 3.8 (3.9.0) - File system monitoring
- **spring**: 2.1.1 - Application preloader
- **byebug**: 11.1.3 - Debugger

#### Testing
- **rspec-rails**: ~> 6.0 (6.1.5) - Testing framework
- **rspec-json_expectations**: 2.2.0 - JSON testing helpers
- **shoulda-matchers**: ~> 6.0 (6.5.0) - Matchers for common Rails functionality
- **faker**: ~> 3.0 (3.5.2) - Fake data generation

### Node.js Dependencies (Frontend)

#### Core Framework
- **Node.js**: 20.x LTS
- **react**: ^18.2.0 - UI library
- **react-dom**: ^18.2.0 - React DOM renderer
- **react-scripts**: 5.0.1 - Create React App scripts

#### Routing & Navigation
- **react-router-dom**: ^6.20.1 - Client-side routing

#### Currency Handling
- **react-currency-input-field**: ^3.10.0 - Currency input component
- **react-intl-currency-input**: ^0.2.6 - Internationalized currency input

#### Testing
- **@testing-library/jest-dom**: ^6.1.5 - DOM testing utilities
- **@testing-library/react**: ^14.1.2 - React testing utilities
- **@testing-library/user-event**: ^14.5.1 - User interaction simulation

#### Utilities
- **react-uuid**: ^2.0.0 - UUID generation
- **web-vitals**: ^3.5.0 - Web performance metrics

Setting-up
----------

### Prerequisites
1. Install Ruby 3.2.2 (using rbenv, rvm, or asdf)
2. Install Node.js 20.x LTS
3. Install PostgreSQL
4. Install system dependencies for nokogiri (on macOS: `brew install libxml2 libxslt`)

### Backend Setup
In the terminal, navigate to the repository root, and:
1. `bundle install` - Install Ruby dependencies
2. `bundle exec rake db:create` - Create database (if needed)
3. `bundle exec rake db:migrate` - Run database migrations
4. `bundle exec rake server` - Start both Rails API and React client

### Frontend Setup (Alternative)
If you prefer to run the frontend separately:
1. Navigate to the `client` directory
2. `npm install` - Install Node.js dependencies
3. `npm start` - Start React development server (runs on port 4000)

### Running the Application
- **Rails API**: http://localhost:3000
- **React Client**: http://localhost:4000

The `bundle exec rake server` command uses Foreman to run both servers simultaneously.