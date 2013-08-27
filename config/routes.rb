NewAuthDemo::Application.routes.draw do
  get "photos/index"

  resources :users, :only => [:create, :new, :show]
  resources :photos, :only => [:index, :create, :destroy, :update, :show]
  resource :session, :only => [:create, :destroy, :new]

  root :to => "users#show"

end
