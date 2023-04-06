class TabsController < ApplicationController
    def index
        user = User.find(session[:user_id])
        render json: user.tabs, include: { payments: { include: [:user, :users, :debts] }, users: {} }
    end

    def create
        @tab = Tab.create(name: params[:name])
        joinut = Joinut.create(user_id: session[:user_id], tab_id: @tab.id)
        if @tab.valid? && joinut.valid? && create_users(@tab.id) == true
            render json: @tab, include: { payments: { include: [:user, :users, 
            :debts] }, users: {} }, status: :created
        else
            render json: { errors: @tab.errors.full_messages }, status: 
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
                if !user.valid? || !joinaut.valid?
                    error = @tab.errors.add(:base, "All emails must be valid")
                    return false
                end
            end
        end
        true
    end
end