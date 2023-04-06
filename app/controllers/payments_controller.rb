class PaymentsController < ApplicationController
rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
    def update
        # byebug
        payment = Payment.find(params[:id])
        payment.update(params_payment)
        if payment.valid? && payment.debts_add_up?
            update_debts
            render json: payment, status: :accepted
        else
            unprocessable_entity(payment)
        end
    end

    def create
        payment = Payment.create(description: params[:description], category: 
        params[:category], amount: params[:amount], user_id: 
        params[:user_id], 
        tab_id: params[:tab_id], created_at: params[:created_at])
        create_debts(payment.id)
        tab = Tab.find(params[:tab_id])
        if payment.debts_add_up?
            if payment.valid?
                render json: tab, include: { payments: { include: [:user, 
                :users, 
                :debts] }, users: {} }, status: :created
            else    
                unprocessable_entity(payment)
            end
        else
            payment.debts.destroy_all
            payment.destroy
            unprocessable_entity(payment)
        end
    end

    def destroy
        payment = Payment.find(params[:id])
        payment.debts.destroy_all
        payment.destroy
        head :no_content, status: :ok
    end

    private

    def update_debts
        debts = params[:debts]
        debts.each do |debt_to_update|
            unless debt_to_update[:id] == nil
                debt = Debt.find(debt_to_update[:id])
                debt.update(amount: debt_to_update[:amount])
            end
        end
    end

    def params_payment
        params.require(:payment).permit(:id, :user_id, :created_at, :amount, 
        :description, :category)
    end

    def create_debts(payment_id)
        debts = params[:debts]
        debts.each do |debt_to_create|
            Debt.create(payment_id: payment_id, user_id:        
            debt_to_create[:user_id], 
            amount: debt_to_create[:amount])
        end
    end

    def unprocessable_entity(payment)
        render json: { errors: payment.errors.full_messages }, status: 
        :unprocessable_entity
    end

    def record_not_found
        render json: { errors: "Record not found" }, status: :not_found
    end

end
