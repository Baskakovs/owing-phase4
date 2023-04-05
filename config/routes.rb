Rails.application.routes.draw do
  
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

  resources :users, only: [:create, :show, :index]
  resources :tabs, only: [:show, :index, :create]
  resources :payments, only: [:update, :create, :destroy]
  post '/login', to: 'sessions#create'
  get '/auth', to: 'users#show'
  delete '/logout', to: 'sessions#destroy'  
end
