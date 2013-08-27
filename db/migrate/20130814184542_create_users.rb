class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :username, :null => false
      t.string :password_digest, :null => false
      t.integer :friendship_id

      t.timestamps
    end

    add_index :users, :username, :unique => true
  end
end
