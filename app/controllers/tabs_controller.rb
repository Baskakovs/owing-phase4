class TabsController < ApplicationController
    def index
        user = User.find(session[:user_id])
        render json: user.tabs, include: { payments: { include: [:user, :users, :debts] }, users: {} }
    end

    def create
        tab = Tab.create(name: params[:description])
        create_users(tab.id)
    end
      
    private
      
    def create_users(tab_id)
        params_without_desc = params.except(:description, :controller, :action, 
        :tab)
        params_without_desc.values.each do |value|
            if value != ""
                user = AUser.create(email: value)
                joinaut = Joinaut.create(a_user_id: user.id, tab_id: tab_id)
            end
        end
    end
end