class PaymentsController < ApplicationController
    def update
        payment = Payment.find(params[:id])
        payment.update(params_payment)
        update_debts
        render json: payment, status: :accepted
    end

    def create
        payment = Payment.create(description: params[:description], category: 
        params[:category], amount: params[:amount], user_id: params[:user_id], 
        tab_id: params[:tab_id])
        create_debts(payment.id)
        render json: payment, status: :created
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


end
