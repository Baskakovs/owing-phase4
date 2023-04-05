class CreateJoinauts < ActiveRecord::Migration[6.1]
  def change
    create_table :joinauts do |t|
      t.integer :a_user_id
      t.integer :tab_id
      t.timestamps
    end
  end
end
