class PaymentsController < ApplicationController
rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

def create
    payment = Payment.create(params_payment)
    #check if debts add up
    if payment.debts_add_up?(params[:amount], params[:debts]) && payment.valid?
        create_debts(payment)
        tab = Tab.find(params[:tab_id])
        render json: tab, include: { payments: { include: [:user, :users, 
        :debts] }, users: {} }, status: :created
    else
        payment.destroy
        unprocessable_entity(payment)
    end
end

def update
    payment = Payment.find(params[:id])
    payment.update(params_payment)
    if payment.debts_add_up?(params[:amount], params[:debts]) && payment.valid?
        debts_update(payment)
        tab = Tab.find(params[:tab_id])
        render json: tab, include: { payments: { include: [:user, :users, 
        :debts] }, users: {} }, status: :accepted
    else
        unprocessable_entity(payment)
    end
end

def destroy
    payment = Payment.find(params[:id])
    payment.debts.destroy_all
    payment.destroy
    head :no_content
end

    private 

    def debts_add_up?(amount, debts)
        if amount.to_f.floor != debts.map{|debt| debt[:amount].to_f}.sum.floor
            self.errors.add(:amount, "the debts need to add up to the total")
            false
        else
            true
        end
    end

    def params_payment
        params.require(:payment).permit(:id, :user_id, :created_at, :amount, 
        :description, :category, :tab_id)
    end

    def create_debts(payment)
        debts = params[:debts]
        debts.each do |debt_to_create|
            Debt.create(payment_id: payment.id, user_id: 
            debt_to_create[:user_id], 
            amount: debt_to_create[:amount], )
        end
    end

    def debts_update(payment)
        debts = params[:debts]
        debts.each do |debt_to_update|
            unless debt_to_update[:id] == nil
                debt = Debt.find(debt_to_update[:id])
                debt.update(amount: debt_to_update[:amount])
            end
        end
    end

    def unprocessable_entity(payment)
        render json: { errors: payment.errors.full_messages }, status: 
        :unprocessable_entity
    end
end