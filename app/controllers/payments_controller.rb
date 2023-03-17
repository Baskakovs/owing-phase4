class PaymentsController < ApplicationController
    def update
        payment = Payment.find(params[:id])
        payment.update(params_payment)
        update_debts
        render json: payment, status: :accepted
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


end
