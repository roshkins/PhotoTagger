class Photo < ActiveRecord::Base
  attr_accessible :url, :user_id

  validates :url, :presence => true

  has_many :tags, :class_name => "Tag", :foreign_key => :photo_id,
  :primary_key => :id

  has_many :tagged_users, :through => :tags, :source => :tagged_user

  belongs_to :user, :class_name => "User", :foreign_key => :user_id,
  :primary_key => :id

end
