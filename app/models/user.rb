class User < ActiveRecord::Base
  attr_accessible :username, :password, :friendship_id
  attr_reader :password

  validates :password_digest, :presence => { :message => "Password can't be blank" }
  validates :password, :length => { :minimum => 6, :allow_nil => true }
  validates :session_token, :presence => true
  validates :username, :presence => true

  # has_many :friendships, :class_name => "Friendship", :primary_key => :id, :foreign_key => :friender_id
  # belongs_to :friendship, :class_name => "Friendship", :primary_key => :id, :foreign_key => :friendship_id
  # has_many :friends, :through => :friendships, :source => :friend

  has_many :photos, :class_name => "Photo", :primary_key => :id, :foreign_key => :user_id

  has_many :tags, :class_name => "Tag", :primary_key => :id, :foreign_key => :user_id
  has_many :tagged_photos, :through => :tags, :source => :photos
  after_initialize :ensure_session_token

  def self.find_by_credentials(username, password)
    user = User.find_by_username(username)

    return nil if user.nil?

    user.is_password?(password) ? user : nil
  end

  def self.generate_session_token
    SecureRandom::urlsafe_base64(16)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def reset_session_token!
    self.session_token = self.class.generate_session_token
    self.save!
  end

  private
  def ensure_session_token
    self.session_token ||= self.class.generate_session_token
  end
end
