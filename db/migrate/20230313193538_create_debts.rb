class CreateDebts < ActiveRecord::Migration[6.1]
  def change
    create_table :debts do |t|
      t.integer :payment_id
      t.integer :user_id

      t.timestamps
    end
  end
end
