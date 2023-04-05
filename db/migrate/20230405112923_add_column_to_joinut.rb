class AddColumnToJoinut < ActiveRecord::Migration[6.1]
  def change
    add_column :joinuts, :a_user_id, :integer
  end
end
