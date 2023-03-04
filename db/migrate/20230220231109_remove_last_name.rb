class RemoveLastName < ActiveRecord::Migration[6.1]
  def change
    remove_column :users, :last_name
  end
end
