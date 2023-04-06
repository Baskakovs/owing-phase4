class TabsController < ApplicationController
    def index
        user = User.find(session[:user_id])
        render json: user.tabs, include: { payments: { include: [:user, :users, :debts] }, users: {} }
    end

    def create
        tab = Tab.create(name: params[:name])
        joinut = Joinut.create(user_id: session[:user_id], tab_id: tab.id)
        create_users(tab.id)
        if tab.valid? && joinut.valid? && create_users(tab.id)
            render json: tab, include: { payments: { include: [:user, :users, 
            :debts] }, users: {} }, status: :created
        else
            render json: { errors: tab.errors.full_messages }, status: 
            :not_acceptable
        end
    end
      
    private
      
    def create_users(tab_id)
        params_without_desc = params.except(:name, :controller, :action, 
        :tab)
        params_without_desc.values.each do |value|
            if value.length > 0
                user = AUser.create(email: value)
                joinaut = Joinaut.create(a_user_id: user.id, tab_id: tab_id)
            end
        end
    end
end