class CreateJoinuts < ActiveRecord::Migration[6.1]
  def change
    create_table :joinuts do |t|
      t.integer :user_id
      t.integer :tab_id

      t.timestamps
    end
  end
end
