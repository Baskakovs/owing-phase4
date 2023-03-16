class PaymentsController < ApplicationController
    def update
        payment = Payment.find(params[:id])
        payment.update(params_payment)
        render json: payment, status: :accepted
    end

    private

    def params_payment
        params.require(:payment).permit(:id, :user_id, :created_at, :amount, 
        :descriptio, :category)
    end
end
