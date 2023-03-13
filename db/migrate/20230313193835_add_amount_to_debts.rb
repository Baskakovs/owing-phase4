class AddAmountToDebts < ActiveRecord::Migration[6.1]
  def change
    add_column :debts, :amount, :decimal, precision: 10, scale: 2
  end
end
