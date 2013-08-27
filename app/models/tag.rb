class Tag < ActiveRecord::Base
  attr_accessible :photo_id, :user_id

  validates :photo_id, :user_id, :presence => true

  belongs_to :tagged_user, :class_name => "User", :foreign_key => :user_id, :primary_key => :id
  belongs_to :photo, :class_name => "Photo", :foreign_key => :photo_id, :primary_key => :id
end
