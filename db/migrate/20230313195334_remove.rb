class Remove < ActiveRecord::Migration[6.1]
  def change
    remove_column :payments, :paid_for_1, :integer
    remove_column :payments, :paid_for_2, :integer
    remove_column :payments, :paid_for_3, :integer
    remove_column :payments, :paid_for_5, :integer
    remove_column :payments, :paid_for_6, :integer
  end
end
