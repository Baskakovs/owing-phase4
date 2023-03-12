class UsersController < ApplicationController

    def show
        user = User.find_by(id: session[:user_id])
        render json: current_user
    end
    
    def create 
        user = User.create(user_params)
        render json: user
    end
    private
    
    def user_params
        params.permit(:name, :email, :password)
    end
end
