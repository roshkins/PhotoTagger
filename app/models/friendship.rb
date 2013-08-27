class Friendship < ActiveRecord::Base
  attr_accessible :friend_id, :friender_id

  belongs_to :friender, :class_name => "User", :foreign_key => :friender_id, :primary_key => :id
  belongs_to :friend, :class_name => "User", :foreign_key => :friend_id, :primary_key => :id
end
