class CreatePayments < ActiveRecord::Migration[6.1]
  def change
    create_table :payments do |t|
      t.text :description
      t.string :category
      t.integer :tab_id
      t.integer :user_id
      t.integer :paid_for_1
      t.integer :paid_for_2
      t.integer :paid_for_3
      t.integer :paid_for_5
      t.integer :paid_for_6

      t.timestamps
    end
  end
end
