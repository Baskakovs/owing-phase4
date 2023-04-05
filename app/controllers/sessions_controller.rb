class SessionsController < ApplicationController
    skip_before_action :authorized, only: :create
    def create
        user = User.find_by(email: params[:email])
        if user &.authenticate(params[:password])
            session[:user_id] = user.id
            render json: user, status: :created
        else
            render json: {error: "Invalid username or password"}, status: 401
        end
    end

    def destroy
        session.delete :user_id
        render json: {message: "Logged out"}
    end

end
