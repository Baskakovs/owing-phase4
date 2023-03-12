class TabsController < ApplicationController
    def index
        user = User.find(session[:user_id])
        render json: user.tabs
    end
end
