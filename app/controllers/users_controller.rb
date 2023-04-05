class UsersController < ApplicationController

    skip_before_action :authorized, only: :create
    def show
        user = User.find_by(id: session[:user_id])
        render json: user
    end
    
    def create 
        user = User.create(user_params)
        if user.valid?
            session[:user_id] = user.id
            a_user = AUser.find_by(email: params[:email])
            if a_user != nil
                a_user.tabs.each do |tab|
                    joinut = Joinut.create(user_id: user.id, tab_id: tab.id)
                end
                a_user.joinauts.destroy
                a_user.destroy 
            end
            render json: user, status: :created
        else
            render json: {errors: user.errors.full_messages}, status: 
            :unprocessable_entity
        end
    end

    private
    
    def redner_unprocessable_entity(invalid)
        render json: {errors: invalid.record.errors}, status: 
        :unprocessable_entity
    end

    def user_params
        params.permit(:name, :email, :password)
    end
end