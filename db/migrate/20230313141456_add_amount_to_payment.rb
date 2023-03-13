class AddAmountToPayment < ActiveRecord::Migration[6.1]
  def change
    add_column :payments, :amount, :decimal, precision: 10, scale: 2
  end
end
